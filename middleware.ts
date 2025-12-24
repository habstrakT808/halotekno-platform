import { auth } from './auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Protected routes
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isAdminRoute = pathname.startsWith('/dashboard/admin')
  const isMitraRoute = pathname.startsWith('/dashboard/mitra')

  // Auth routes
  const isAuthRoute =
    pathname.startsWith('/login') || pathname.startsWith('/register')

  // Redirect to login if accessing protected route without auth
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Role-based access control
  if (isLoggedIn && req.auth?.user) {
    const userRole = req.auth.user.role

    // Admin-only routes
    if (isAdminRoute && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Mitra-only routes
    if (isMitraRoute && userRole !== 'MITRA') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
