import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path: string = url.pathname;

  // CRITICAL: Skip auth checks for RSC requests completely
  // They will be handled by the actual page navigation
  if (url.searchParams.has("_rsc")) {
    return NextResponse.next({ request });
  }

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

  const isProtected: boolean =
    path.startsWith("/test") ||
    path.startsWith("/profile") ||
    path.startsWith("/settings") ||
    path.startsWith("/routes");

  if (!session && isProtected) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (session && (path.startsWith("/login") || path.startsWith("/signup"))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
