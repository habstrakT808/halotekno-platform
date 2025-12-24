import { DashboardHeader } from '@/components/dashboard/header'
import { StatCard } from '@/components/dashboard/stat-card'
import { Wrench, CheckCircle, DollarSign, Star, Clock } from 'lucide-react'

export const metadata = {
  title: 'Mitra Dashboard - HaloTekno',
}

export default function MitraDashboard() {
  return (
    <div>
      <DashboardHeader
        title="Dashboard Mitra"
        subtitle="Kelola pekerjaan dan pendapatan Anda"
      />

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wrench}
          label="Total Pekerjaan"
          value="45"
          trend={{ value: 10, isPositive: true }}
        />
        <StatCard
          icon={CheckCircle}
          label="Selesai Bulan Ini"
          value="12"
          trend={{ value: 15, isPositive: true }}
          iconColor="from-green-500 to-emerald-600"
        />
        <StatCard
          icon={DollarSign}
          label="Pendapatan Bulan Ini"
          value="Rp 8.5M"
          trend={{ value: 20, isPositive: true }}
          iconColor="from-yellow-500 to-orange-600"
        />
        <StatCard
          icon={Star}
          label="Rating"
          value="4.9"
          iconColor="from-purple-500 to-pink-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Aksi Cepat</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button className="transform rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
            <Wrench className="mb-2 h-8 w-8" />
            <h3 className="font-semibold">Lihat Pekerjaan</h3>
            <p className="mt-1 text-sm text-cyan-100">Pekerjaan tersedia</p>
          </button>
          <button className="transform rounded-2xl bg-gradient-to-r from-green-500 to-teal-600 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50">
            <Clock className="mb-2 h-8 w-8" />
            <h3 className="font-semibold">Atur Jadwal</h3>
            <p className="mt-1 text-sm text-green-100">Jam operasional</p>
          </button>
          <button className="transform rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50">
            <DollarSign className="mb-2 h-8 w-8" />
            <h3 className="font-semibold">Lihat Pendapatan</h3>
            <p className="mt-1 text-sm text-yellow-100">Riwayat pembayaran</p>
          </button>
        </div>
      </div>

      {/* Pending Jobs */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Pekerjaan Pending</h2>
        <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-xl">
          <div className="p-6 text-center text-gray-400">
            <Wrench className="mx-auto mb-3 h-12 w-12 opacity-50" />
            <p>Belum ada pekerjaan pending</p>
            <p className="mt-1 text-sm">Pekerjaan baru akan muncul di sini</p>
          </div>
        </div>
      </div>
    </div>
  )
}
