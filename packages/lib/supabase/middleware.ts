import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  console.log("MIDDLEWARE START", request.nextUrl.pathname);
  console.log(
    "Cookies:",
    request.cookies.getAll().map((c) => c.name)
  );

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
          console.log(
            "Setting cookies:",
            cookiesToSet.map((c) => c.name)
          );
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

  console.log("User found:", !!user);

  const url = request.nextUrl.clone();
  const path: string = url.pathname;

  const isProtected: boolean =
    path.startsWith("/generate") ||
    path.startsWith("/profile") ||
    path.startsWith("/settings") ||
    path.startsWith("/routes");

  if (!user && isProtected) {
    console.log("REDIRECTING TO LOGIN");
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && (path.startsWith("/login") || path.startsWith("/signup"))) {
    console.log("REDIRECTING TO HOME");
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  console.log("ALLOWING THROUGH");
  return supabaseResponse;
}
