import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const  userId = (await auth()).userId
  const authPages = ['/sign-in', '/sign-up'];

  // If the user is logged in and accessing sign-in/sign-up, redirect them to /dashboard
  if (userId && authPages.includes(req.nextUrl.pathname)) {
    const dashboardUrl = new URL('/', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Continue with other requests if no redirect is needed
  return NextResponse.next();
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}