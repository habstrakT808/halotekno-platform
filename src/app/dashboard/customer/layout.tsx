import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { requireAuth } from '@/lib/auth'

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth()

  // Customer dashboard uses light theme
  if (session.user.role === 'CUSTOMER') {
    return <DashboardLayout variant="light">{children}</DashboardLayout>
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
