'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  ShoppingCart,
  Wrench,
  Package,
  FileText,
  Settings,
  TrendingUp,
  Clock,
  UserCheck,
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalUsers: number
  totalTechnicians: number
  totalMitras: number
  totalProducts: number
  totalOrders: number
  pendingMitras: number
  byRole: Record<string, number>
}

interface RecentUser {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: string
  technician?: { id: string } | null
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  iconBg = 'bg-blue-500',
  loading = false,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  iconBg?: string
  loading?: boolean
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          {loading ? (
            <div className="mt-1 h-9 w-20 animate-pulse rounded bg-gray-200" />
          ) : (
            <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
          )}
        </div>
        <div className={`rounded-xl ${iconBg} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}

// Helper functions for role display
function getRoleLabel(user: RecentUser) {
  if (user.technician) return 'TEKNISI'
  return user.role
}

function getRoleBadgeColor(user: RecentUser) {
  if (user.technician) return 'bg-orange-100 text-orange-700'

  switch (user.role) {
    case 'SUPER_ADMIN':
      return 'bg-purple-100 text-purple-700'
    case 'ADMIN':
      return 'bg-blue-100 text-blue-700'
    case 'MITRA':
      return 'bg-green-100 text-green-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

// Quick Action Card
function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
  iconBg = 'bg-blue-100',
  iconColor = 'text-blue-600',
}: {
  icon: React.ElementType
  title: string
  description: string
  href: string
  iconBg?: string
  iconColor?: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
    >
      <div className={`mb-4 inline-flex rounded-xl ${iconBg} p-3`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </Link>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/dashboard')

      if (res.status === 401) {
        router.push('/login')
        return
      }

      if (!res.ok) throw new Error('Failed to fetch dashboard data')

      const data = await res.json()
      setStats(data.stats)
      setRecentUsers(data.recentUsers || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {/* Header Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-blue-100">
              Kelola seluruh sistem HaloTekno dari satu tempat
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Clock className="h-5 w-5" />
            <span className="text-sm">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats?.totalUsers || 0}
          iconBg="bg-blue-500"
          loading={loading}
        />
        <StatCard
          icon={Wrench}
          label="Total Teknisi"
          value={stats?.totalTechnicians || 0}
          iconBg="bg-orange-500"
          loading={loading}
        />
        <StatCard
          icon={Package}
          label="Total Produk"
          value={stats?.totalProducts || 0}
          iconBg="bg-green-500"
          loading={loading}
        />
        <StatCard
          icon={UserCheck}
          label="Pending Mitra"
          value={stats?.pendingMitras || 0}
          iconBg="bg-yellow-500"
          loading={loading}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Menu Admin</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            icon={Users}
            title="Kelola User"
            description="Lihat dan kelola semua pengguna"
            href="/dashboard/admin/users"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <QuickActionCard
            icon={Wrench}
            title="Kelola Teknisi"
            description="Kelola data teknisi dan mitra"
            href="/dashboard/admin/technicians"
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
          <QuickActionCard
            icon={Package}
            title="Kelola Produk"
            description="Sparepart dan alat sewa"
            href="/dashboard/admin/products"
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <QuickActionCard
            icon={ShoppingCart}
            title="Kelola Order"
            description="Pesanan dan transaksi"
            href="/dashboard/admin/orders"
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />
          <QuickActionCard
            icon={FileText}
            title="Kelola Blog"
            description="Artikel dan konten"
            href="/dashboard/admin/blog"
            iconBg="bg-pink-100"
            iconColor="text-pink-600"
          />
          <QuickActionCard
            icon={TrendingUp}
            title="Laporan"
            description="Statistik dan analitik"
            href="/dashboard/admin/reports"
            iconBg="bg-cyan-100"
            iconColor="text-cyan-600"
          />
          <QuickActionCard
            icon={Settings}
            title="Pengaturan"
            description="Konfigurasi sistem"
            href="/dashboard/admin/settings"
            iconBg="bg-gray-100"
            iconColor="text-gray-600"
          />
        </div>
      </div>

      {/* Recent Users */}
      {!loading && recentUsers.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">User Terbaru</h2>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getRoleBadgeColor(user)}`}>
                    {getRoleLabel(user)}
                  </span>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
