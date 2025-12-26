import { auth } from './auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Route categories
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isAdminRoute = pathname.startsWith('/dashboard/admin')
  const isMitraRoute = pathname.startsWith('/dashboard/mitra')
  const isCustomerRoute = pathname.startsWith('/dashboard/customer')

  // Customer-only routes that require auth
  const requiresAuth =
    pathname.startsWith('/cart') ||
    pathname.startsWith('/checkout')

  // Auth routes
  const isAuthRoute =
    pathname.startsWith('/login') || pathname.startsWith('/register')

  // Redirect to login if accessing protected route without auth
  if ((isAdminRoute || isMitraRoute || requiresAuth) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect /dashboard to /dashboard/customer for guests
  if (pathname === '/dashboard' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard/customer', req.url))
  }

  // Redirect to dashboard if accessing auth routes while logged in
  // Disabled: Let login page handle redirect to detect technician users
  // if (isAuthRoute && isLoggedIn) {
  //   const userRole = req.auth?.user?.role
  //   if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
  //     return NextResponse.redirect(new URL('/dashboard/admin', req.url))
  //   } else if (userRole === 'MITRA') {
  //     return NextResponse.redirect(new URL('/dashboard/mitra', req.url))
  //   } else {
  //     return NextResponse.redirect(new URL('/dashboard/customer', req.url))
  //   }
  // }

  // Role-based access control
  if (isLoggedIn && req.auth?.user) {
    const userRole = req.auth.user.role
    const mitraStatus = (req.auth.user as any).mitraStatus

    // Redirect pending mitra to pending page
    if (userRole === 'MITRA' && mitraStatus === 'PENDING') {
      if (!pathname.startsWith('/dashboard/mitra/pending')) {
        return NextResponse.redirect(new URL('/dashboard/mitra/pending', req.url))
      }
    }

    // Redirect approved mitra away from pending page
    if (userRole === 'MITRA' && mitraStatus === 'APPROVED' && pathname.startsWith('/dashboard/mitra/pending')) {
      return NextResponse.redirect(new URL('/dashboard/customer', req.url)) // For now, redirect to customer
    }

    // Admin-only routes
    if (isAdminRoute && userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/customer', req.url))
    }

    // Mitra-only routes (excluding pending page)
    if (isMitraRoute && !pathname.startsWith('/dashboard/mitra/pending') && userRole !== 'MITRA') {
      if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard/admin', req.url))
      }
      return NextResponse.redirect(new URL('/dashboard/customer', req.url))
    }

    // Admin tidak boleh akses cart/checkout
    const isCartOrCheckout = pathname.startsWith('/cart') || pathname.startsWith('/checkout')
    if (isCartOrCheckout && (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN')) {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url))
    }

    // Mitra tidak boleh akses cart/checkout
    if (isCartOrCheckout && userRole === 'MITRA') {
      return NextResponse.redirect(new URL('/dashboard/mitra/pending', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
