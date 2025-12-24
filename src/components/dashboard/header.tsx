'use client'

import { useSession } from 'next-auth/react'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { data: session } = useSession()

  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
      {session?.user && (
        <p className="mt-2 text-sm text-gray-500">
          Selamat datang,{' '}
          <span className="font-semibold text-cyan-400">
            {session.user.name}
          </span>
        </p>
      )}
    </div>
  )
}
