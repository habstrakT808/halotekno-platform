import { Sidebar } from './sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  variant?: 'dark' | 'light'
}

export function DashboardLayout({
  children,
  variant = 'dark',
}: DashboardLayoutProps) {
  const isLight = variant === 'light'

  return (
    <div
      className={`flex min-h-screen ${isLight ? 'bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 text-gray-900' : 'bg-gray-900 text-white'}`}
    >
      <Sidebar variant={variant} />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
