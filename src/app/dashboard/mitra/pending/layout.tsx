export default function MitraPendingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // No sidebar for pending page - full screen layout
    return <>{children}</>
}
