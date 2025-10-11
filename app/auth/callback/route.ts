import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'  // Add this import

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  // Build correct origin (handles Render.com proxy)
  let origin = requestUrl.origin
  if (process.env.NODE_ENV !== 'development') {
    const headersList = await headers();
    const forwardedHost = headersList.get('x-forwarded-host') || headersList.get('host') || request.headers.get('x-forwarded-host')
    if (forwardedHost) {
      origin = `https://${forwardedHost}`
    }
  }

  if (code) {
    // Fallback for direct code (if any), though not needed in proper PKCE
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Optional: Handle 'next' param for custom post-login redirect (e.g., ?next=/dashboard)
  let next = requestUrl.searchParams.get('next') ?? '/offers'
  if (!next.startsWith('/')) next = '/offers'

  return redirect(origin + next)
}