'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Navigation,
  Loader2,
} from 'lucide-react'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'

interface MitraDetail {
  id: string
  businessName: string
  tagline?: string
  description?: string
  city: string
  address: string
  phone: string
  email?: string
  website?: string
  rating: number
  totalReview: number
  banner?: string
  features: string[]
  weekdayHours?: string
  weekendHours?: string
  services: Array<{ id: string; name: string; icon?: string; price?: string }>
  images: Array<{ id: string; url: string }>
  reviews: Array<{
    id: string
    rating: number
    comment?: string
    createdAt: string
    userName: string
    userImage?: string
  }>
  isOpen: boolean
}

export default function MitraDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [mitra, setMitra] = useState<MitraDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchMitra = async () => {
      try {
        const response = await fetch(`/api/mitra/${id}`)
        if (response.ok) {
          const data = await response.json()
          setMitra(data)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error('Error fetching mitra:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchMitra()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !mitra) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Mitra tidak ditemukan
        </h2>
        <Link href="/rekomendasi" className="text-blue-600 hover:underline">
          Kembali ke daftar mitra
        </Link>
      </div>
    )
  }

  return (
    <>
      <Navbar variant="light" />
      <div className="min-h-screen bg-white pt-16">
        {/* Hero Section - Full Screen on Desktop, Reduced on Mobile */}
        <div className="relative h-[70vh] sm:h-[80vh] md:h-screen">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={
                mitra.banner ||
                'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80'
              }
              alt={mitra.businessName}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Back Button */}
            <div className="p-6">
              <Link
                href="/rekomendasi"
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-md transition-all hover:bg-white/30"
              >
                <ArrowLeft className="h-5 w-5" />
                Kembali
              </Link>
            </div>

            {/* Hero Content */}
            <div className="flex flex-1 items-center justify-center px-6">
              <div className="max-w-4xl text-center text-white">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold">
                      {mitra.rating.toFixed(1)}
                    </span>
                    <span className="text-sm opacity-90">
                      ({mitra.totalReview} ulasan)
                    </span>
                  </div>
                </div>

                <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl">
                  {mitra.businessName}
                </h1>

                <p className="mb-6 text-base text-gray-200 sm:text-lg md:text-2xl md:text-xl">
                  {mitra.tagline ||
                    'Mitra terpercaya untuk kebutuhan servis Anda'}
                </p>

                <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-base sm:mb-8 sm:gap-4 sm:text-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {mitra.city}
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {mitra.isOpen ? 'Buka Hari Ini' : 'Tutup Hari Ini'}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <a
                    href={`https://wa.me/${mitra.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:bg-green-700 sm:px-8 sm:py-4 sm:text-base"
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${mitra.phone}`}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:bg-blue-700 sm:px-8 sm:py-4 sm:text-base"
                  >
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                    Telepon
                  </a>
                  <button className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/30 sm:px-8 sm:py-4 sm:text-base">
                    <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Petunjuk Arah</span>
                    <span className="sm:hidden">Arah</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scroll Indicator - Hidden on small screens */}
            <div className="hidden pb-8 text-center sm:block">
              <div className="inline-flex flex-col items-center gap-2 text-white">
                <span className="text-sm">Scroll untuk info lebih lanjut</span>
                <div className="h-8 w-5 rounded-full border-2 border-white p-1">
                  <div className="h-2 w-1 animate-bounce rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
              alt="Background"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
            {/* About Section */}
            <section className="mb-16">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Tentang Kami
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                {mitra.description}
              </p>
            </section>

            {/* Features Grid */}
            <section className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                Keunggulan Kami
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {mitra.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                      ✓
                    </div>
                    <span className="font-medium text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                Layanan Kami
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mitra.services.map((service) => (
                  <div
                    key={service.name}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                  >
                    <div className="mb-3 text-4xl">{service.icon}</div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                      {service.name}
                    </h3>
                    <p className="text-sm text-blue-600">{service.price}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            {mitra.images && mitra.images.length > 0 && (
              <section className="mb-16">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Galeri
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {mitra.images.map((image) => (
                    <div key={image.id} className="overflow-hidden rounded-2xl">
                      <img
                        src={image.url}
                        alt="Gallery"
                        className="h-48 w-full object-cover transition-transform hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact Info */}
            <section className="mb-16">
              <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                Informasi Kontak
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    Alamat
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span className="text-gray-700">{mitra.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{mitra.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{mitra.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{mitra.website}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">
                    Jam Operasional
                  </h3>
                  <div className="space-y-3">
                    {mitra.weekdayHours && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">
                          {mitra.weekdayHours}
                        </span>
                      </div>
                    )}
                    {mitra.weekendHours && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">
                          {mitra.weekendHours}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            {mitra.reviews && mitra.reviews.length > 0 && (
              <section>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Ulasan Pelanggan
                </h2>
                <div className="space-y-4">
                  {mitra.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-gray-200 bg-white p-6"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {review.userName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString(
                              'id-ID',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        {review.comment || 'Tidak ada komentar'}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
        <Footer variant="light" />
      </div>
    </>
  )
}
