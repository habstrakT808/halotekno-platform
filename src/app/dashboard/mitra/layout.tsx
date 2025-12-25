'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { Toaster } from 'sonner'

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't use any layout for pending page
  if (pathname === '/dashboard/mitra/pending') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <Navbar variant="light" />
      <main className="min-h-screen pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer variant="light" />
      <Toaster position="top-right" richColors />
    </div>
  )
}
