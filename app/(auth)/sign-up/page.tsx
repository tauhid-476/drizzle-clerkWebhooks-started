"use client"
import { useSignUp } from '@clerk/nextjs'
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  //redirecting tthe iser from form to verify page to dashboad
  //keep record states
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();


  if (!isLoaded) {
    return <Progress />
  }

  //signup function 
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    //bezst practice
    if (!isLoaded) {
      return null;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
      })

      setPendingVerification(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error('An unknown error occurred');
        setError('An unknown error occurred');
      }
    }
}

  async function onVerificationSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true)

    if (!isLoaded) {
      return null;
    }
    try {
      const signUpComplete = await signUp.attemptEmailAddressVerification({ code });
      //completed or abondoned or missing fields
      if (signUpComplete.status !== "complete") {
        console.log(JSON.stringify(signUpComplete, null, 2));
      }

      if (signUpComplete.status === "complete") {
        await setActive({ session: signUpComplete.createdSessionId })
        router.push("/");
      }


    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error('An unknown error occurred');
        setError('An unknown error occurred');
      }
      setIsSubmitting(false);
    }
  }




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{pendingVerification ? "Verify Email" : "Sign Up"}</CardTitle>
        <CardDescription>
          {pendingVerification
            ? "We've sent a verification code to your email."
            : "Create an account to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!pendingVerification ? (
          <>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password <span className='text-gray-900'>&#40;Please use a strong password&#41;</span>
              
              </Label>
              <div className="relative">
                
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign Up
            </Button>
          </form>
          </>
          
        ) : (
          <form onSubmit={onVerificationSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Verify Email
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
  )
    
}
  export default SignUp