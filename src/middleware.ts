import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const refreshTokenCookie = request.cookies.get('refreshToken')

  if (
    !refreshTokenCookie &&
    pathname !== '/signin' &&
    pathname !== '/signup' &&
    pathname !== '/setting'
  ) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (
    refreshTokenCookie &&
    (pathname === '/signin' || pathname === '/signup')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export default middleware

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|images|icons|favicon.ico|mockServiceWorker.js).*)',
}
