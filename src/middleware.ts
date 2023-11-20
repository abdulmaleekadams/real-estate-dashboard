import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicPath =
    pathname === '/account/login' || pathname === '/account/signup';

  const token = req.cookies.get('token')?.value || '';

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  } else if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/account/login', req.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
};
