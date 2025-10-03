import GoogleSignInButton from '@/app/_components/GoogleSignInButton'
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-4 select-none p-4 relative">
      <Image
        src="/Star.png"
        alt="EarnQuest logo"
        width={250}
        height={50}
        className="h-auto object-contain absolute top-0 left-0 hidden md:block z-[-1]" 
        // style={{ zIndex: -1 , top:"-10px", left: "10px"}} 
      />
      {/* Left section: Hero text + image */}
      <div className='flex-1 h-full flex flex-col items-center justify-center gap-4'>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Get Paid for Testing Apps, <br/>  Games & Surveys
          </h1>
        <div className='relative w-full max-w-sm'>
          <div className="absolute left-0 top-0 w-full text-center z-10">
            <p className="text-lg mb-1">Earn up to $15 per offer</p>
            <p className="text-green-400 font-semibold">512 offers available now</p>
          </div>
          <Image
            src="/landingpageoffersgrid.png"
            alt="Offer grid"
            width={1500}
            height={500}
            className="w-full h-auto object-contain" 
          />
        </div>
      </div>
      <div className='flex-1 h-full flex flex-col items-center justify-center gap-4'>
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-4">Sign In to Earn</h3>
          <p className="text-xl">
            Unlock exclusive offers, track your rewards, and <br/> cash out instantly.
          </p>
        </div>
        <GoogleSignInButton />
        <div className="text-center text-sm">
          <p className="mb-1 text-gray-400">We <span className='text-green-400'>never</span> post to your account or share your data.</p>
          <p className='mt-4 font-semibold'>By signing in, you agree to our <a  className="underline">Terms & Privacy Policy</a></p>
          <p className=" mt-8 text-lg tracking-tight font-medium"> <span className='text-green-400'>66085+</span> Sign ups in the past 24 hours</p>
        </div>
      </div>
    </main>
  )
}