import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1920&q=80)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.92] via-blue-50/[0.99] to-white/[0.92]"></div>
      </div>

      <Navbar variant="light" />
      {/* Main content dengan min-height 100vh agar footer tersembunyi */}
      <main className="min-h-screen pt-24 pb-8 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer variant="light" />
      <Toaster position="top-right" richColors />
    </div>
  )
}
