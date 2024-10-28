// app/page.tsx
"use client"
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
export default  function Home() {
  const { userId } = useAuth();
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to Next.js Starter Pack
      </h1>
      {userId ? (
        <div className="text-xl">
          🎉 Congratulations! You're logged in with this gem!
          <br />
         <div className='mt-4 flex justify-center items-center'>
         <SignOutButton>
            <Button>Sign Out</Button>
         </SignOutButton>
         </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      )}
    </main>
  );
}