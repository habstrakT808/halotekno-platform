export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Customer dashboard is publicly accessible
  return <>{children}</>
}
