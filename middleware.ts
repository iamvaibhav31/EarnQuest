// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'  // Adjust path

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createMiddlewareClient(request)
  const { data: { session }, error } = await supabase.auth.getSession()

  console.log('SESSION RESULT:', { 
    hasSession: !!session, 
    userEmail: session?.user?.email, 
    error: error?.message,
    expiresAt: session?.expires_at 
  })

  const protectedRoutes = ["/offers", "/reports", "/users"]
  const publicRoutes = ["/", "/auth/callback"]  

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/') {
      return request.nextUrl.pathname === '/'  
    }
    return request.nextUrl.pathname.startsWith(route)  
  })

  // Redirect unauthenticated from protected
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Redirect authenticated from public (e.g., away from login/home)
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/offers", request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}