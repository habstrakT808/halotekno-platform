'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Wrench,
  Calendar,
  DollarSign,
  FileText,
  Heart,
  MapPin,
} from 'lucide-react'

const customerMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/customer' },
  {
    icon: ShoppingCart,
    label: 'Pesanan Saya',
    href: '/dashboard/customer/orders',
  },
  { icon: Heart, label: 'Wishlist', href: '/dashboard/customer/wishlist' },
  { icon: MapPin, label: 'Alamat', href: '/dashboard/customer/addresses' },
  { icon: Settings, label: 'Pengaturan', href: '/dashboard/customer/settings' },
]

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/admin' },
  { icon: Users, label: 'Kelola User', href: '/dashboard/admin/users' },
  { icon: Package, label: 'Kelola Produk', href: '/dashboard/admin/products' },
  {
    icon: ShoppingCart,
    label: 'Kelola Order',
    href: '/dashboard/admin/orders',
  },
  { icon: FileText, label: 'Laporan', href: '/dashboard/admin/reports' },
  { icon: Settings, label: 'Pengaturan', href: '/dashboard/admin/settings' },
]

const mitraMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/mitra' },
  { icon: Wrench, label: 'Pekerjaan', href: '/dashboard/mitra/jobs' },
  { icon: Calendar, label: 'Jadwal', href: '/dashboard/mitra/schedule' },
  { icon: DollarSign, label: 'Pendapatan', href: '/dashboard/mitra/earnings' },
  { icon: Settings, label: 'Pengaturan', href: '/dashboard/mitra/settings' },
]

interface SidebarProps {
  variant?: 'dark' | 'light'
}

export function Sidebar({ variant = 'dark' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const menuItems =
    session?.user.role === 'ADMIN'
      ? adminMenuItems
      : session?.user.role === 'MITRA'
        ? mitraMenuItems
        : customerMenuItems

  const isLight = variant === 'light'

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed left-4 top-4 z-50 rounded-lg p-2 lg:hidden ${
          isLight
            ? 'bg-white text-gray-900 shadow-lg'
            : 'bg-gray-800 text-white'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r transition-transform duration-300 lg:sticky ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isLight
            ? 'border-gray-200 bg-white'
            : 'border-gray-700/50 bg-gray-800/50 backdrop-blur-xl'
        }`}
      >
        <div className="flex h-full flex-col p-6">
          {/* Logo */}
          <Link
            href="/"
            className="mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent"
          >
            HaloTekno
          </Link>

          {/* User Info */}
          {session?.user && (
            <div
              className={`mb-8 rounded-xl p-4 ${
                isLight ? 'border border-gray-200 bg-gray-50' : 'bg-gray-700/30'
              }`}
            >
              <p
                className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}
              >
                Logged in as
              </p>
              <p
                className={`truncate font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}
              >
                {session.user.name}
              </p>
              <p className="mt-1 text-xs text-cyan-600">{session.user.role}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                      : isLight
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className={`mt-4 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
              isLight
                ? 'text-red-600 hover:bg-red-50'
                : 'text-red-400 hover:bg-red-500/10'
            }`}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>
    </>
  )
}
