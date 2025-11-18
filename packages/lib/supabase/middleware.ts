import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { JwtPayload } from "@supabase/supabase-js";
import { NextURL } from "next/dist/server/web/next-url";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll(): RequestCookie[] {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value }) =>
            response.cookies.set(name, value)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const user: JwtPayload | undefined = data?.claims;

  const url: NextURL = request.nextUrl.clone();
  const path: string = url.pathname;

  if (
    !user &&
    (path.startsWith("/generate") ||
      path.startsWith("/profile") ||
      path.startsWith("/settings") ||
      path.startsWith("/routes"))
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && (path.startsWith("/login") || path.startsWith("/signup"))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}
