import {
  Users,
  ShoppingCart,
  DollarSign,
  Wrench,
  Package,
  FileText,
  Settings,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard - HaloTekno',
}

// Stat Card Component for Light Mode
function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  iconBg = 'bg-blue-500',
}: {
  icon: React.ElementType
  label: string
  value: string
  trend?: { value: number; isPositive: boolean }
  iconBg?: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`mt-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        <div className={`rounded-xl ${iconBg} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
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
          value="1,234"
          trend={{ value: 12, isPositive: true }}
          iconBg="bg-blue-500"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value="456"
          trend={{ value: 8, isPositive: true }}
          iconBg="bg-green-500"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue (Bulan Ini)"
          value="Rp 45.2M"
          trend={{ value: 15, isPositive: true }}
          iconBg="bg-yellow-500"
        />
        <StatCard
          icon={Wrench}
          label="Mitra Aktif"
          value="89"
          trend={{ value: 5, isPositive: true }}
          iconBg="bg-purple-500"
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
    </div>
  )
}
