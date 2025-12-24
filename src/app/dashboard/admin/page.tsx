import { DashboardHeader } from '@/components/dashboard/header'
import { StatCard } from '@/components/dashboard/stat-card'
import { Users, ShoppingCart, DollarSign, Wrench } from 'lucide-react'

export const metadata = {
  title: 'Admin Dashboard - HaloTekno',
}

export default function AdminDashboard() {
  return (
    <div>
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Kelola seluruh sistem HaloTekno"
      />

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value="1,234"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value="456"
          trend={{ value: 8, isPositive: true }}
          iconColor="from-green-500 to-emerald-600"
        />
        <StatCard
          icon={DollarSign}
          label="Revenue (Bulan Ini)"
          value="Rp 45.2M"
          trend={{ value: 15, isPositive: true }}
          iconColor="from-yellow-500 to-orange-600"
        />
        <StatCard
          icon={Wrench}
          label="Mitra Aktif"
          value="89"
          trend={{ value: 5, isPositive: true }}
          iconColor="from-purple-500 to-pink-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Aksi Cepat</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <button className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/50">
            <Users className="mb-2 h-8 w-8 text-cyan-400" />
            <h3 className="font-semibold">Kelola User</h3>
          </button>
          <button className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/50">
            <ShoppingCart className="mb-2 h-8 w-8 text-green-400" />
            <h3 className="font-semibold">Verifikasi Pembayaran</h3>
          </button>
          <button className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/50">
            <DollarSign className="mb-2 h-8 w-8 text-yellow-400" />
            <h3 className="font-semibold">Lihat Laporan</h3>
          </button>
          <button className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-xl transition-all hover:border-cyan-500/50">
            <Wrench className="mb-2 h-8 w-8 text-purple-400" />
            <h3 className="font-semibold">Kelola Mitra</h3>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-bold">Pesanan Terbaru</h2>
          <div className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-xl">
            <div className="text-center text-gray-400">
              <ShoppingCart className="mx-auto mb-3 h-12 w-12 opacity-50" />
              <p>Belum ada data pesanan</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold">User Baru</h2>
          <div className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-xl">
            <div className="text-center text-gray-400">
              <Users className="mx-auto mb-3 h-12 w-12 opacity-50" />
              <p>Belum ada data user baru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
