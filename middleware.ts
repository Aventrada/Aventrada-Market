import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/auth/signin" ||
    path === "/auth/signup" ||
    path === "/auth/login" ||
    path === "/auth/forgot-password" ||
    path === "/auth/reset-password" ||
    path === "/politica-de-privacidad" ||
    path === "/terminos-y-condiciones" ||
    path === "/por-que-aventrada" ||
    path === "/porque" ||
    path === "/porque-aventrada" ||
    path === "/porqueaventrada" ||
    path === "/eventos" ||
    path === "/vender" ||
    path === "/contacto" ||
    path.startsWith("/api/") ||
    path.includes("_next") ||
    path.includes("static")

  // Get the authentication token from cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Create a Supabase client with the cookies
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
    },
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
    },
  })

  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const isAuthenticated = !!session

  // If the path is not public and there's no session, redirect to signin
  if (!isPublicPath && !isAuthenticated) {
    const redirectUrl = new URL("/auth/signin", request.url)
    // Add the original URL as a query parameter to redirect back after login
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If the path is signin or signup and there's a session, redirect to dashboard
  if ((path === "/auth/signin" || path === "/auth/signup" || path === "/auth/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
