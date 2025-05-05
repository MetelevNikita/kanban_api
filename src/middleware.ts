import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;


  // Если пользователь не имеет токена и пытается получить доступ к страницам, отличным от login/registration
  if (!token && pathname !== '/login' && pathname !== '/registration') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если пользователь с токеном пытается получить доступ к login/registration
  if (token && (pathname === '/login' || pathname === '/registration')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};