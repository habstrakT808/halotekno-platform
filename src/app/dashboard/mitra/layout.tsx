import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout variant="dark">{children}</DashboardLayout>
}
