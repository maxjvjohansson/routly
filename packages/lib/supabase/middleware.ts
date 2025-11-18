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

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  const url = request.nextUrl.clone();
  const path: string = url.pathname;

  const isProtected: boolean =
    path.startsWith("/generate") ||
    path.startsWith("/profile") ||
    path.startsWith("/settings") ||
    path.startsWith("/routes");

  if (!user && isProtected) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && (path.startsWith("/login") || path.startsWith("/signup"))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
