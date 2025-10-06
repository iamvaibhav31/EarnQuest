import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url) 
  console.log('Request URL:', requestUrl)
  const code = requestUrl.searchParams.get('code')
  console.log('Request URL 1:', {requestUrl , code})

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return redirect(requestUrl.origin + '/offers')
}