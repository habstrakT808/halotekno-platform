'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { LogOut, User } from 'lucide-react'

interface NavbarProps {
  variant?: 'dark' | 'light'
}

export function Navbar({ variant = 'dark' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLight = variant === 'light'

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isLight
          ? scrolled
            ? 'bg-white/95 shadow-lg backdrop-blur-md'
            : 'bg-white/90 shadow-md backdrop-blur-sm'
          : scrolled
            ? 'bg-gray-900/95 shadow-lg backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className={`bg-gradient-to-r text-2xl font-bold sm:text-3xl ${
              isLight
                ? 'from-cyan-600 to-blue-600'
                : 'from-cyan-400 to-blue-500'
            } bg-clip-text text-transparent`}
          >
            HaloTekno
          </Link>

          <div className="flex items-center gap-4">
            {status === 'loading' ? (
              <div
                className={`h-8 w-8 border-2 ${
                  isLight ? 'border-blue-600' : 'border-cyan-500'
                } animate-spin rounded-full border-t-transparent`}
              ></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className={`hidden items-center gap-2 px-4 py-2 text-sm font-medium sm:flex ${
                    isLight
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'hover:text-cyan-400'
                  } transition-colors`}
                >
                  <User className="h-4 w-4" />
                  {session.user.name || 'Dashboard'}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 ${
                    isLight
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-800 hover:bg-gray-700'
                  } rounded-full text-sm font-semibold transition-all duration-300 sm:text-base`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className={`px-4 py-2 text-sm font-semibold sm:px-6 sm:py-3 sm:text-base ${
                    isLight
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'hover:text-cyan-400'
                  } transition-colors`}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className={`rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-semibold text-white hover:shadow-lg sm:px-8 sm:py-3 ${
                    isLight
                      ? 'hover:shadow-blue-500/50'
                      : 'hover:shadow-cyan-500/50'
                  } transform text-sm transition-all duration-300 hover:scale-105 sm:text-base`}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
