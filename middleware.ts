import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'  // Adjust path

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createMiddlewareClient(request)
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  console.log('SESSION RESULT:', { 
    hasSession: !!session, 
    userEmail: session?.user?.email, 
    error: sessionError?.message,
    expiresAt: session?.expires_at 
  })

  const protectedAdminRoutes = ["/offers", "/reports"]  // Only ADMINS for these
  const publicRoutes = ["/", "/auth/callback"]  

  const isProtectedAdminRoute = protectedAdminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/') {
      return request.nextUrl.pathname === '/'  
    }
    return request.nextUrl.pathname.startsWith(route)  
  })

  // If no session, redirect from any protected route (keep existing logic)
  if (!session && isProtectedAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // For authenticated users on admin routes: Check role
  if (session && isProtectedAdminRoute) {
    if (!session.user) {
      console.error('Session exists but no user data')
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Fetch user role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    console.log('PROFILE RESULT:', { 
      role: profile?.role, 
      error: profileError?.message 
    })

    if (profileError || profile?.role !== 'ADMIN') {
      console.log('Access denied: Not an admin')
      // Redirect to home or a denied page
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Redirect authenticated from public routes (existing)
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/offers", request.url))  // But only if ADMIN? Wait, no—let non-admins go to /users or adjust
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}