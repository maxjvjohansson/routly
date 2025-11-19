import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const timestamp = new Date().toISOString().split("T")[1].slice(0, -1);

  console.log(`\n${"=".repeat(80)}`);
  console.log(`[${timestamp}] 🚀 MIDDLEWARE START`);
  console.log(`📍 Path: ${path}`);
  console.log(`🔗 Method: ${request.method}`);
  console.log(`🌐 Referer: ${request.headers.get("referer") || "none"}`);

  let supabaseResponse = NextResponse.next({
    request,
  });

  const allCookies = request.cookies.getAll();
  const supabaseCookies = allCookies.filter((c) => c.name.startsWith("sb-"));
  console.log(`🍪 Total cookies: ${allCookies.length}`);
  console.log(
    `🍪 Supabase cookies: ${supabaseCookies.map((c) => c.name).join(", ") || "NONE"}`
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          if (cookiesToSet.length > 0) {
            console.log(
              `🍪 Supabase setting ${cookiesToSet.length} cookies:`,
              cookiesToSet.map((c) => c.name).join(", ")
            );
          }
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(`👤 Session exists: ${!!session}`);
  if (session) {
    console.log(`👤 User email: ${session.user?.email}`);
  }

  const url = request.nextUrl.clone();

  const isProtected: boolean =
    path.startsWith("/generate") ||
    path.startsWith("/profile") ||
    path.startsWith("/settings") ||
    path.startsWith("/routes");

  console.log(`🔒 Is protected route: ${isProtected}`);

  if (!session && isProtected) {
    console.log(`❌ REDIRECTING: No session + protected route → /login`);
    url.pathname = "/login";
    console.log(`${"=".repeat(80)}\n`);
    return NextResponse.redirect(url);
  }

  if (session && (path.startsWith("/login") || path.startsWith("/signup"))) {
    console.log(`✅ REDIRECTING: Has session + auth page → /`);
    url.pathname = "/";
    console.log(`${"=".repeat(80)}\n`);
    return NextResponse.redirect(url);
  }

  console.log(`✅ ALLOWING THROUGH`);
  console.log(`${"=".repeat(80)}\n`);
  return supabaseResponse;
}
