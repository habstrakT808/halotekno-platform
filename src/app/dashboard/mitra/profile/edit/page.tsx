'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Store,
  Camera,
  Clock,
  Phone,
  Mail,
  Globe,
  MapPin,
  Plus,
  X,
  Save,
  Loader2,
  CheckCircle,
  Edit3,
  Star,
  Image as ImageIcon,
  Trash2,
  Eye,
} from 'lucide-react'
import { toast } from 'sonner'

interface Service {
  name: string
  price: string
  icon: string
}

interface MitraProfile {
  name: string
  tagline: string
  description: string
  city: string
  address: string
  phone: string
  email: string
  website: string
  banner: string
  gallery: string[]
  services: Service[]
  features: string[]
  hours: {
    weekday: string
    weekend: string
  }
}

const DEFAULT_PROFILE: MitraProfile = {
  name: '',
  tagline: '',
  description: '',
  city: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  banner: '',
  gallery: [],
  services: [],
  features: [],
  hours: {
    weekday: 'Senin - Sabtu: 09:00 - 18:00',
    weekend: 'Minggu: Tutup',
  },
}

const CITY_OPTIONS = [
  'Jakarta Selatan',
  'Jakarta Pusat',
  'Jakarta Barat',
  'Jakarta Utara',
  'Jakarta Timur',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Semarang',
  'Medan',
  'Makassar',
  'Tangerang',
  'Bekasi',
  'Depok',
]

const FEATURE_OPTIONS = [
  'Garansi Resmi',
  'Teknisi Bersertifikat',
  'Spare Part Original',
  'Free Konsultasi',
  'Home Service',
  'Express Service',
  'Pickup & Delivery',
  '24 Jam',
  'Pembayaran Cicilan',
]

const SERVICE_ICONS = [
  '💻',
  '📱',
  '🖥️',
  '⚡',
  '💾',
  '🧹',
  '🔧',
  '🎮',
  '📀',
  '🔌',
]

export default function MitraDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<MitraProfile>(DEFAULT_PROFILE)
  const [loading, setLoading] = useState(false)
  const [fetchingProfile, setFetchingProfile] = useState(true)
  const [activeTab, setActiveTab] = useState('info')
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    icon: '💻',
  })
  const [newGalleryUrl, setNewGalleryUrl] = useState('')

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/mitra/profile')
        if (response.ok) {
          const data = await response.json()
          // Transform API data to match frontend state
          setProfile({
            name: data.businessName || '',
            tagline: data.tagline || '',
            description: data.description || '',
            city: data.city || '',
            address: data.address || '',
            phone: data.phone || '',
            email: data.email || '',
            website: data.website || '',
            banner: data.banner || '',
            gallery: data.images?.map((img: any) => img.url) || [],
            services:
              data.services?.map((svc: any) => ({
                name: svc.name,
                price: svc.price || '',
                icon: svc.icon || '💻',
              })) || [],
            features: data.features || [],
            hours: {
              weekday: data.weekdayHours || 'Senin - Sabtu: 09:00 - 18:00',
              weekend: data.weekendHours || 'Minggu: Tutup',
            },
          })
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setFetchingProfile(false)
      }
    }

    if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status])

  // Redirect pending mitra
  useEffect(() => {
    if (session?.user?.role === 'MITRA') {
      const mitraStatus = (session.user as any).mitraStatus
      if (mitraStatus === 'PENDING') {
        router.push('/dashboard/mitra/pending')
      }
    }
  }, [session, router])

  // Calculate profile completion
  const getProfileCompletion = () => {
    let completed = 0
    const total = 10
    if (profile.name) completed++
    if (profile.tagline) completed++
    if (profile.description) completed++
    if (profile.address) completed++
    if (profile.city) completed++
    if (profile.phone) completed++
    if (profile.banner) completed++
    if (profile.services.length > 0) completed++
    if (profile.gallery.length > 0) completed++
    if (profile.features.length > 0) completed++
    return Math.round((completed / total) * 100)
  }

  const handleSave = async () => {
    // Validation
    if (!profile.name || !profile.address || !profile.city || !profile.phone) {
      toast.error(
        'Mohon lengkapi data wajib: Nama Toko, Alamat, Kota, dan Telepon'
      )
      return
    }

    setLoading(true)
    try {
      // Transform frontend state to API format
      const payload = {
        businessName: profile.name,
        tagline: profile.tagline,
        description: profile.description,
        banner: profile.banner,
        address: profile.address,
        city: profile.city,
        province: '', // You can add province field if needed
        phone: profile.phone,
        whatsapp: profile.phone, // Use phone as whatsapp for now
        email: profile.email,
        website: profile.website,
        features: profile.features,
        weekdayHours: profile.hours.weekday,
        weekendHours: profile.hours.weekend,
        services: profile.services.map((svc) => ({
          name: svc.name,
          price: svc.price,
          icon: svc.icon,
          description: null,
        })),
        images: profile.gallery.map((url) => ({ url })),
      }

      const response = await fetch('/api/mitra/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Gagal menyimpan profil')
      }

      toast.success('Profil berhasil disimpan!')
    } catch (error: any) {
      console.error('Error saving profile:', error)
      toast.error(error.message || 'Gagal menyimpan profil')
    } finally {
      setLoading(false)
    }
  }

  const addService = () => {
    if (newService.name && newService.price) {
      setProfile({
        ...profile,
        services: [...profile.services, { ...newService }],
      })
      setNewService({ name: '', price: '', icon: '💻' })
      toast.success('Layanan ditambahkan!')
    }
  }

  const removeService = (index: number) => {
    setProfile({
      ...profile,
      services: profile.services.filter((_, i) => i !== index),
    })
  }

  const addGalleryImage = () => {
    if (newGalleryUrl && profile.gallery.length < 8) {
      setProfile({
        ...profile,
        gallery: [...profile.gallery, newGalleryUrl],
      })
      setNewGalleryUrl('')
      toast.success('Foto ditambahkan!')
    }
  }

  const removeGalleryImage = (index: number) => {
    setProfile({
      ...profile,
      gallery: profile.gallery.filter((_, i) => i !== index),
    })
  }

  const toggleFeature = (feature: string) => {
    if (profile.features.includes(feature)) {
      setProfile({
        ...profile,
        features: profile.features.filter((f) => f !== feature),
      })
    } else {
      setProfile({
        ...profile,
        features: [...profile.features, feature],
      })
    }
  }

  if (status === 'loading' || fetchingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const completion = getProfileCompletion()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Kelola Profil Bisnis
            </h1>
            <p className="mt-1 text-gray-600">
              Lengkapi profil untuk tampil di halaman rekomendasi
            </p>
          </div>
          <button
            onClick={() => router.push('/rekomendasi/1')}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
          >
            <Eye className="h-5 w-5" />
            Lihat Preview
          </button>
        </div>
      </div>

      {/* Profile Completion Card */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Kelengkapan Profil</h2>
            <p className="mt-1 text-blue-100">
              Lengkapi semua informasi agar muncul di halaman rekomendasi
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20">
              <svg className="h-full w-full -rotate-90 transform">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeDasharray={`${completion * 2.2} 220`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {completion}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {[
          { id: 'info', label: 'Informasi Dasar', icon: Store },
          { id: 'services', label: 'Layanan', icon: Edit3 },
          { id: 'gallery', label: 'Galeri', icon: ImageIcon },
          { id: 'contact', label: 'Kontak', icon: Phone },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-600 shadow-sm hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Basic Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Informasi Dasar</h3>

            {/* Banner Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Banner Toko
              </label>
              <div className="relative h-48 overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
                {profile.banner ? (
                  <>
                    <img
                      src={profile.banner}
                      alt="Banner"
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => setProfile({ ...profile, banner: '' })}
                      className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <Camera className="mb-2 h-12 w-12 text-gray-400" />
                    <p className="text-gray-500">
                      Upload banner toko (1920x600 recommended)
                    </p>
                    <input
                      type="text"
                      placeholder="Paste URL gambar..."
                      className="mt-3 w-80 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setProfile({
                            ...profile,
                            banner: (e.target as HTMLInputElement).value,
                          })
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Toko
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  placeholder="Contoh: TechCare Pro Service"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tagline
                </label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) =>
                    setProfile({ ...profile, tagline: e.target.value })
                  }
                  placeholder="Contoh: Solusi Teknologi Terpercaya Anda"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Deskripsi Toko
              </label>
              <textarea
                value={profile.description}
                onChange={(e) =>
                  setProfile({ ...profile, description: e.target.value })
                }
                placeholder="Jelaskan tentang toko Anda, pengalaman, keahlian, dll..."
                rows={4}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Kota
                </label>
                <select
                  value={profile.city}
                  onChange={(e) =>
                    setProfile({ ...profile, city: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Kota</option>
                  {CITY_OPTIONS.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Keunggulan Toko
              </label>
              <div className="flex flex-wrap gap-2">
                {FEATURE_OPTIONS.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      profile.features.includes(feature)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {profile.features.includes(feature) && (
                      <CheckCircle className="mr-1 inline h-4 w-4" />
                    )}
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Layanan yang Ditawarkan
            </h3>

            {/* Add Service Form */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <select
                  value={newService.icon}
                  onChange={(e) =>
                    setNewService({ ...newService, icon: e.target.value })
                  }
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SERVICE_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                  placeholder="Nama layanan"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                  placeholder="Mulai dari Rp..."
                  className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addService}
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 font-medium text-white transition-all hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />
                  Tambah
                </button>
              </div>
            </div>

            {/* Services List */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {profile.services.map((service, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <button
                    onClick={() => removeService(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-100 p-1 text-red-600 opacity-0 transition-all hover:bg-red-600 hover:text-white group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="mb-2 text-3xl">{service.icon}</div>
                  <h4 className="font-semibold text-gray-900">
                    {service.name}
                  </h4>
                  <p className="text-sm text-blue-600">{service.price}</p>
                </div>
              ))}
              {profile.services.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  Belum ada layanan. Tambahkan layanan pertama Anda!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Galeri Foto</h3>

            {/* Add Image Form */}
            <div className="flex gap-4">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                placeholder="Paste URL gambar..."
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addGalleryImage}
                disabled={profile.gallery.length >= 8}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50"
              >
                <Plus className="h-5 w-5" />
                Tambah Foto
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Maksimal 8 foto. Gunakan foto berkualitas tinggi untuk hasil
              terbaik.
            </p>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {profile.gallery.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-gray-200"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="h-40 w-full object-cover"
                  />
                  <button
                    onClick={() => removeGalleryImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 transition-all hover:bg-red-700 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {profile.gallery.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  <ImageIcon className="mx-auto mb-3 h-12 w-12 opacity-50" />
                  Belum ada foto. Tambahkan foto untuk menarik pelanggan!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Kontak & Jam Operasional
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone className="h-4 w-4" /> Nomor Telepon
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  placeholder="+62 812-xxxx-xxxx"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="h-4 w-4" /> Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  placeholder="toko@email.com"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Globe className="h-4 w-4" /> Website (opsional)
                </label>
                <input
                  type="text"
                  value={profile.website}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  placeholder="www.toko-anda.com"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4" /> Jam Buka (Weekday)
                </label>
                <input
                  type="text"
                  value={profile.hours.weekday}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      hours: { ...profile.hours, weekday: e.target.value },
                    })
                  }
                  placeholder="Senin - Sabtu: 09:00 - 18:00"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4" /> Jam Buka (Weekend)
                </label>
                <input
                  type="text"
                  value={profile.hours.weekend}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      hours: { ...profile.hours, weekend: e.target.value },
                    })
                  }
                  placeholder="Minggu: Tutup / 10:00 - 15:00"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  )
}
