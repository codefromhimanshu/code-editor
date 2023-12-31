
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

export async function middleware(req) {
  // Token will exist if the user is logged in
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;
  // Allow the requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) The token exists
  if (pathname.includes('/api/auth') || pathname.includes('/api/register') || token) {
    return NextResponse.next();
  }
  console.log(token)
  console.log(pathname)
  if (token && pathname == '/') {
    return NextResponse.redirect('/tasks');
  }

  // Otherwise, redirect to login
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
