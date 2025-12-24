import { requireAuth } from '@/lib/auth'

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()

  // Don't wrap with DashboardLayout here - let child layouts handle it
  return <>{children}</>
}
