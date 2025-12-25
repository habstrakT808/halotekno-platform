'use client'

import { useState, useEffect, use } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import ChatWindow from '@/components/chat/chat-window'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import {
  Star,
  Award,
  Settings,
  ChevronRight,
  Loader2,
  Shield,
  MessageCircle,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'

interface TechnicianDetail {
  id: string
  bio: string | null
  experience: number
  specialties: string[]
  rating: number
  totalReview: number
  isAvailable: boolean
  user: {
    id: string
    name: string | null
    image: string | null
    phone: string | null
  }
  services: Array<{
    id: string
    name: string
    category: string
    price: number
    description: string | null
  }>
  reviews: Array<{
    id: string
    rating: number
    comment: string | null
    createdAt: string
    user: {
      name: string | null
      image: string | null
    }
  }>
}

export default function TeknisiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const [technician, setTechnician] = useState<TechnicianDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    date: '',
    time: '09:00',
    description: '',
    scheduleType: 'asap',
  })

  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service')
  const [activeService, setActiveService] = useState<
    'konsultasi' | 'cek-bongkar' | 'jasa-servis'
  >((serviceParam as any) || 'konsultasi')

  useEffect(() => {
    fetchTechnician()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id])

  const fetchTechnician = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/technicians/${resolvedParams.id}`)
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setTechnician(data)
    } catch (error) {
      console.error('Error fetching technician:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!technician) return
    alert(
      `Booking ${activeService} berhasil! ${technician.user.name} akan menghubungi Anda segera.`
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hari ini'
    if (diffDays === 1) return 'Kemarin'
    if (diffDays < 7) return `${diffDays} hari yang lalu`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`
    return `${Math.floor(diffDays / 30)} bulan yang lalu`
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!technician) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Shield className="h-16 w-16 text-gray-300" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Teknisi tidak ditemukan
        </h2>
        <Link href="/teknisi" className="mt-4 text-blue-600 hover:underline">
          Kembali ke katalog teknisi
        </Link>
      </div>
    )
  }

  const lowestServicePrice =
    technician.services.length > 0
      ? Math.min(...technician.services.map((s) => s.price))
      : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="mb-6 hidden text-sm text-gray-600 sm:block">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          {' / '}
          <Link href="/teknisi" className="hover:text-blue-600">
            Teknisi
          </Link>
          {' / '}
          <span className="text-gray-900">{technician.user.name}</span>
        </div>

        {/* Service Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-white p-2">
          <button
            onClick={() => setActiveService('konsultasi')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
              activeService === 'konsultasi'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Konsultasi</span>
          </button>
          <ChevronRight className="hidden h-5 w-5 self-center text-gray-300 sm:block" />
          <button
            onClick={() => setActiveService('cek-bongkar')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
              activeService === 'cek-bongkar'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Wrench className="h-4 w-4" />
            <span className="sm:hidden">Cek</span>
            <span className="hidden sm:inline">Cek/Bongkar</span>
          </button>
          <ChevronRight className="hidden h-5 w-5 self-center text-gray-300 sm:block" />
          <button
            onClick={() => setActiveService('jasa-servis')}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
              activeService === 'jasa-servis'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span className="sm:hidden">Servis</span>
            <span className="hidden sm:inline">Jasa Servis</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Header */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <img
                  src={
                    technician.user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(technician.user.name || 'T')}&background=3b82f6&color=fff&size=400`
                  }
                  alt={technician.user.name || 'Teknisi'}
                  className="h-48 w-full rounded-xl object-cover md:w-48"
                />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                        {technician.user.name}
                      </h1>
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            technician.isAvailable
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {technician.isAvailable
                            ? '🟢 Tersedia'
                            : '⚫ Tidak Tersedia'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-lg font-bold">
                      {technician.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-600">
                      ({technician.totalReview} review)
                    </span>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span>{technician.experience} tahun pengalaman</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Settings className="h-4 w-4 text-blue-600" />
                      <span>{technician.services.length} layanan</span>
                    </div>
                  </div>

                  {lowestServicePrice > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Mulai dari</p>
                      <p className="text-2xl font-bold text-blue-600">
                        Rp {lowestServicePrice.toLocaleString('id-ID')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* About */}
            {technician.bio && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Tentang
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {technician.bio}
                </p>
              </div>
            )}

            {/* Specializations */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Spesialisasi
              </h2>
              <div className="flex flex-wrap gap-2">
                {technician.specialties.map((spec, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-blue-50 px-4 py-2 font-medium text-blue-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Services */}
            {technician.services.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Layanan
                </h2>
                <div className="space-y-3">
                  {technician.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {service.name}
                        </h3>
                        {service.description && (
                          <p className="text-sm text-gray-600">
                            {service.description}
                          </p>
                        )}
                        <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          {service.category}
                        </span>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-bold text-blue-600">
                          Rp {service.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {technician.reviews.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Review ({technician.totalReview})
                </h2>
                <div className="space-y-4">
                  {technician.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {review.user.image ? (
                            <img
                              src={review.user.image}
                              alt={review.user.name || 'User'}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                              <span className="text-xs font-semibold text-gray-600">
                                {review.user.name?.charAt(0) || 'U'}
                              </span>
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">
                            {review.user.name || 'Anonymous'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.comment && (
                        <p className="text-gray-700">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6">
              {activeService === 'konsultasi' && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                      Chat dengan {technician.user.name}
                    </h3>
                  </div>
                  <ChatWindow />
                  {technician.user.phone && (
                    <div className="mt-4">
                      <WhatsAppButton
                        phoneNumber={technician.user.phone}
                        className="w-full justify-center text-sm"
                        message={`Halo ${technician.user.name}! 👋
Saya ingin konsultasi mengenai masalah gadget saya.

Mohon bantuannya, terima kasih!`}
                      />
                    </div>
                  )}
                </>
              )}

              {(activeService === 'cek-bongkar' ||
                activeService === 'jasa-servis') && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    {activeService === 'cek-bongkar' ? (
                      <Wrench className="h-5 w-5 text-orange-600" />
                    ) : (
                      <Settings className="h-5 w-5 text-blue-600" />
                    )}
                    <h3 className="text-lg font-bold text-gray-900">
                      {activeService === 'cek-bongkar'
                        ? 'Booking Cek/Bongkar'
                        : 'Booking Servis'}
                    </h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Jadwal
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="scheduleType"
                            value="asap"
                            checked={formData.scheduleType === 'asap'}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                scheduleType: e.target.value,
                              })
                            }
                            className="text-blue-600"
                          />
                          <span className="text-sm">Segera</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="scheduleType"
                            value="scheduled"
                            checked={formData.scheduleType === 'scheduled'}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                scheduleType: e.target.value,
                              })
                            }
                            className="text-blue-600"
                          />
                          <span className="text-sm">Pilih Tanggal</span>
                        </label>
                      </div>
                    </div>
                    {formData.scheduleType === 'scheduled' && (
                      <div>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    )}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Deskripsi Masalah
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Jelaskan masalah gadget Anda..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white transition-all hover:shadow-lg"
                    >
                      Booking Sekarang
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <WhatsAppButton variant="fixed" />
      <Footer variant="light" />
    </div>
  )
}
