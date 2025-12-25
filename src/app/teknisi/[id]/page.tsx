'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import ChatWindow from '@/components/chat/chat-window'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import {
  MapPin, Clock, Star, Award, CheckCircle, Calendar,
  MessageCircle, Wrench, Settings, ChevronRight
} from 'lucide-react'
import Link from 'next/link'

// Dummy data
const teknisiDetail = {
  id: '1',
  name: 'Ahmad Teknisi Pro',
  phone: '6281234567890',
  photo: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
  specialization: ['Spesialis HP & Smartphone', 'Laptop', 'Tablet'],
  rating: 4.9,
  reviewCount: 150,
  hourlyRate: 75000,
  cekBongkarRate: 50000,
  location: 'Jakarta Selatan',
  availability: true,
  bio: 'Teknisi berpengalaman dengan lebih dari 8 tahun pengalaman dalam perbaikan gadget. Spesialisasi dalam perbaikan motherboard, LCD, dan software troubleshooting.',
  skills: [
    'Motherboard Repair',
    'LCD Replacement',
    'Software Troubleshooting',
    'Water Damage Repair',
    'Battery Replacement',
  ],
  workingHours: 'Senin - Sabtu: 09:00 - 18:00',
  completedJobs: 450,
  responseTime: '< 1 jam',
}

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    date: '2 hari yang lalu',
    comment: 'Sangat profesional dan cepat. HP saya yang mati total bisa hidup kembali!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 5,
    date: '1 minggu yang lalu',
    comment: 'Harga terjangkau dan hasil memuaskan. Recommended!',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    rating: 4,
    date: '2 minggu yang lalu',
    comment: 'Bagus, tapi agak lama menunggu antrian.',
  },
]

export default function TeknisiDetailPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '09:00',
    description: '',
    scheduleType: 'asap',
  })

  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service')
  const [activeService, setActiveService] = useState<'konsultasi' | 'cek-bongkar' | 'jasa-servis'>(
    (serviceParam as any) || 'konsultasi'
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Booking ${activeService} berhasil! ${teknisiDetail.name} akan menghubungi Anda segera.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="container mx-auto px-4 pb-8 pt-24">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="mb-6 hidden text-sm text-gray-600 sm:block">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          {' / '}
          <Link href={`/${activeService}`} className="hover:text-blue-600">
            {activeService === 'konsultasi' ? 'Konsultasi' :
              activeService === 'cek-bongkar' ? 'Cek/Bongkar' : 'Jasa Servis'}
          </Link>
          {' / '}
          <span className="text-gray-900">{teknisiDetail.name}</span>
        </div>

        {/* Service Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-white p-2 border border-gray-200">
          <button
            onClick={() => setActiveService('konsultasi')}
            className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium transition-all ${activeService === 'konsultasi'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="sm:hidden">Konsultasi</span>
            <span className="hidden sm:inline">Konsultasi</span>
          </button>
          <ChevronRight className="h-5 w-5 text-gray-300 self-center hidden sm:block" />
          <button
            onClick={() => setActiveService('cek-bongkar')}
            className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium transition-all ${activeService === 'cek-bongkar'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Wrench className="h-4 w-4" />
            <span className="sm:hidden">Cek</span>
            <span className="hidden sm:inline">Cek/Bongkar</span>
          </button>
          <ChevronRight className="h-5 w-5 text-gray-300 self-center hidden sm:block" />
          <button
            onClick={() => setActiveService('jasa-servis')}
            className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium transition-all ${activeService === 'jasa-servis'
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
                  src={teknisiDetail.photo}
                  alt={teknisiDetail.name}
                  className="h-48 w-full rounded-xl object-cover md:w-48"
                />
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                        {teknisiDetail.name}
                      </h1>
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${teknisiDetail.availability
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}
                        >
                          {teknisiDetail.availability ? '🟢 Online' : '⚫ Offline'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-lg font-bold">{teknisiDetail.rating}</span>
                    <span className="text-gray-600">({teknisiDetail.reviewCount} review)</span>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{teknisiDetail.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Respons {teknisiDetail.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span>{teknisiDetail.completedJobs} Pekerjaan</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{teknisiDetail.workingHours.split(':')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Chat Section - Only on konsultasi */}
            {activeService === 'konsultasi' && (
              <div className="lg:hidden rounded-2xl border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Chat dengan {teknisiDetail.name}</h3>
                </div>
                <ChatWindow />
                <div className="mt-4">
                  <WhatsAppButton
                    phoneNumber={teknisiDetail.phone}
                    className="w-full justify-center text-sm"
                    message={`Halo ${teknisiDetail.name}! 👋
Saya ingin konsultasi mengenai masalah gadget saya.

Mohon bantuannya, terima kasih!`}
                  />
                </div>
              </div>
            )}

            {/* Mobile Booking Form - Cek/Bongkar */}
            {activeService === 'cek-bongkar' && (
              <div className="lg:hidden rounded-2xl border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Booking Cek/Bongkar</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Jadwal</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileScheduleType"
                          value="asap"
                          checked={formData.scheduleType === 'asap'}
                          onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Segera</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileScheduleType"
                          value="scheduled"
                          checked={formData.scheduleType === 'scheduled'}
                          onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Pilih Tanggal</span>
                      </label>
                    </div>
                  </div>
                  {formData.scheduleType === 'scheduled' && (
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  )}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Deskripsi Masalah</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              </div>
            )}

            {/* Mobile Booking Form - Jasa Servis */}
            {activeService === 'jasa-servis' && (
              <div className="lg:hidden rounded-2xl border border-gray-200 bg-white p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Booking Servis</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Jadwal</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileServisScheduleType"
                          value="asap"
                          checked={formData.scheduleType === 'asap'}
                          onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Segera</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mobileServisScheduleType"
                          value="scheduled"
                          checked={formData.scheduleType === 'scheduled'}
                          onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                          className="text-blue-600"
                        />
                        <span className="text-sm">Pilih Tanggal</span>
                      </label>
                    </div>
                  </div>
                  {formData.scheduleType === 'scheduled' && (
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  )}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Deskripsi Masalah</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              </div>
            )}

            {/* About */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Tentang</h2>
              <p className="leading-relaxed text-gray-700">{teknisiDetail.bio}</p>
            </div>

            {/* Specializations */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Spesialisasi</h2>
              <div className="flex flex-wrap gap-2">
                {teknisiDetail.specialization.map((spec, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-blue-50 px-4 py-2 font-medium text-blue-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Keahlian</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {teknisiDetail.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Review ({teknisiDetail.reviewCount})
              </h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="mb-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Hidden on mobile for konsultasi */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6">
              {/* Konsultasi Sidebar - Chat */}
              {activeService === 'konsultasi' && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Chat dengan {teknisiDetail.name}</h3>
                  </div>
                  <ChatWindow />
                  <div className="mt-4">
                    <WhatsAppButton
                      phoneNumber={teknisiDetail.phone}
                      className="w-full justify-center text-sm"
                      message={`Halo ${teknisiDetail.name}! 👋
Saya ingin konsultasi mengenai masalah gadget saya.

Mohon bantuannya, terima kasih!`}
                    />
                  </div>
                </>
              )}

              {/* Cek/Bongkar Sidebar */}
              {activeService === 'cek-bongkar' && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-orange-600" />
                    <h3 className="text-lg font-bold text-gray-900">Booking Cek/Bongkar</h3>
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
                            onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

              {/* Jasa Servis Sidebar */}
              {activeService === 'jasa-servis' && (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Booking Servis</h3>
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
                            onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
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
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
