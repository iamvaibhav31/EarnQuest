import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import GoogleSignInButton from '@/components/GoogleSignInButton' // We'll create this client component below

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("Session:", session)

  // If authenticated, redirect to account/dashboard
  if (session) {
    redirect('/offers') // Or '/dashboard' if you create one
  }
  
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <span className="bg-emerald-500 text-black px-3 py-1 rounded-full font-bold text-sm">
          EARN
        </span>
        <span className="text-emerald-500 font-bold text-xl">QUEST</span>
      </div>

      {/* Main Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Get Paid for Testing Apps,
        </h1>
        <h2 className="text-xl md:text-2xl text-emerald-500">
          Games & Surveys
        </h2>
      </div>

      {/* Earn Stats */}
      <div className="text-center mb-8">
        <p className="text-lg mb-1">Earn up to $15 per offer</p>
        <p className="text-green-400 font-semibold">512 offers available now</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-4xl">
        {/* Agoda Card */}
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="bg-white rounded-lg p-2 mx-auto w-12 h-12 mb-2 flex items-center justify-center">
            <span className="text-black font-bold">A</span> {/* Replace with actual Agoda icon/SVG */}
          </div>
          <h3 className="font-semibold mb-1">Agoda</h3>
          <p className="text-sm text-gray-400 mb-2">Book hotels get...</p>
          <p className="text-2xl font-bold text-emerald-500">$10.00</p>
        </div>

        {/* Amazon Card */}
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="bg-yellow-400 rounded-lg p-2 mx-auto w-12 h-12 mb-2 flex items-center justify-center">
            <span className="text-black font-bold">A</span> {/* Amazon icon */}
          </div>
          <h3 className="font-semibold mb-1">Amazon</h3>
          <p className="text-sm text-gray-400 mb-2">Shop and Earn Ca...</p>
          <p className="text-2xl font-bold text-emerald-500">$10.00</p>
        </div>

        {/* Airtel Card */}
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="bg-red-500 rounded-lg p-2 mx-auto w-12 h-12 mb-2 flex items-center justify-center">
            <span className="text-white font-bold">A</span> {/* Airtel icon */}
          </div>
          <h3 className="font-semibold mb-1">Airtel</h3>
          <p className="text-sm text-gray-400 mb-2">Recharge and Earn</p>
          <p className="text-2xl font-bold text-emerald-500">$10.00</p>
        </div>
      </div>

      {/* Sign In Section */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2">Sign In to Earn</h3>
        <p className="text-gray-400">
          Unlock exclusive offers, track your rewards, and cash out instantly.
        </p>
      </div>

      {/* Google Button */}
      <GoogleSignInButton />

      {/* Footer */}
      <div className="text-center mt-6 text-sm text-gray-400">
        <p className="mb-1">We never post to your account or share your data.</p>
        <p>By signing in, you agree to our <a href="/terms" className="text-emerald-500 underline">Terms & Privacy Policy</a></p>
        <p className="text-green-400 mt-2">66085+ Sign ups in the past 24 hours</p>
      </div>
    </main>
  )
}