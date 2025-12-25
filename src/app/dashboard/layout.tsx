export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth check moved to individual child layouts (admin/mitra require auth, customer is public)
  return <>{children}</>
}
