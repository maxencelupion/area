import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.pathname;
  const token = req.cookies.get('access_token');

  if (token && (url === '/login' || token && url === '/signup')) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  if (!token && (url === '/my_area' || !token && url === '/profile')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my_area', '/profile', '/login', '/signup'],
};
