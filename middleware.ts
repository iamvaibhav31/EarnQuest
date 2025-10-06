import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createMiddlewareClient(request)
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  console.log('SESSION RESULT:', { 
    hasSession: !!session, 
    userEmail: session?.user?.email, 
    error: sessionError?.message,
    expiresAt: session?.expires_at 
  })

  const authenticatedPaths = ["/offers"]  // Auth required, no role check
  const authenticatedProtectedAdminRoutes = ["/users", "/reports"]  // Auth + ADMIN required (assuming /user -> /users)
  const publicRoutes = ["/", "/auth/v1/callback"]  

  const isAuthenticatedPath = authenticatedPaths.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isProtectedAdminRoute = authenticatedProtectedAdminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/') {
      return request.nextUrl.pathname === '/'  
    }
    return request.nextUrl.pathname.startsWith(route)  
  })

  // If no session, redirect from any authenticated or admin-protected route
  if (!session && (isAuthenticatedPath || isProtectedAdminRoute)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // For authenticated users on admin routes: Verify user & check role
  if (session && isProtectedAdminRoute) {
    // Secure: Get verified user data
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('User verification failed:', userError?.message)
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Fetch role using verified user.id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    console.log('PROFILE RESULT:', { 
      role: profile?.role, 
      error: profileError?.message 
    })

    if (profileError || profile?.role !== 'ADMIN') {
      console.log('Access denied: Not an admin')
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Redirect authenticated from public routes
  if (session && isPublicRoute) {
    // Smart redirect: Admins to /reports or /offers; regular users to /offers
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      const redirectPath = profile?.role === 'ADMIN' ? '/reports' : '/offers'
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
    return NextResponse.redirect(new URL("/offers", request.url))  // Fallback
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}