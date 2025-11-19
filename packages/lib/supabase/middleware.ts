import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
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

  const path = request.nextUrl.pathname;
  const sbCookies = request.cookies
    .getAll()
    .filter((c) => c.name.startsWith("sb-"));

  // This header will be visible in DevTools Network tab
  supabaseResponse.headers.set(
    "X-Debug",
    `session:${!!session}|cookies:${sbCookies.length}|path:${path}`
  );

  const url = request.nextUrl.clone();

  const isProtected: boolean =
    path.startsWith("/generate") ||
    path.startsWith("/profile") ||
    path.startsWith("/settings") ||
    path.startsWith("/routes");

  if (!session && isProtected) {
    url.pathname = "/login";
    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.headers.set("X-Debug", `REDIRECT:no-session`);
    return redirectResponse;
  }

  if (session && (path.startsWith("/login") || path.startsWith("/signup"))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
