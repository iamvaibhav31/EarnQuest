'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function GoogleSignInButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error)
      // Add toast/error UI here if needed
    } else {
      // Optional: Redirect manually if needed, but callback handles it
      router.refresh() // Refresh server data post-auth
    }
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-white text-black px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full max-w-sm font-medium hover:bg-gray-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        {/* Google Icon SVG - paste the full path from previous response */}
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        {/* Add other paths as before */}
      </svg>
      Continue with Google
    </button>
  )
}