import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { MapPin, Clock, Star, Award, CheckCircle, Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Detail Teknisi - HaloTekno',
}

// Dummy data - in real app, fetch based on params.id
const teknisiDetail = {
  id: '1',
  name: 'Ahmad Teknisi Pro',
  photo:
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
  specialization: ['Spesialis HP & Smartphone', 'Laptop', 'Tablet'],
  rating: 4.9,
  reviewCount: 150,
  hourlyRate: 75000,
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
    comment:
      'Sangat profesional dan cepat. HP saya yang mati total bisa hidup kembali!',
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

export default function TeknisiDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="container mx-auto px-4 pb-8 pt-24">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          {' / '}
          <Link href="/teknisi" className="hover:text-blue-600">
            Katalog Teknisi
          </Link>
          {' / '}
          <span className="text-gray-900">{teknisiDetail.name}</span>
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
                      <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        {teknisiDetail.name}
                      </h1>
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            teknisiDetail.availability
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {teknisiDetail.availability
                            ? 'Tersedia'
                            : 'Tidak Tersedia'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="text-lg font-bold">
                      {teknisiDetail.rating}
                    </span>
                    <span className="text-gray-600">
                      ({teknisiDetail.reviewCount} review)
                    </span>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span>{teknisiDetail.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span>{teknisiDetail.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span>{teknisiDetail.completedJobs} Pekerjaan</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>{teknisiDetail.workingHours.split(':')[0]}</span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-blue-600">
                    Rp {teknisiDetail.hourlyRate.toLocaleString('id-ID')}/jam
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Tentang</h2>
              <p className="leading-relaxed text-gray-700">
                {teknisiDetail.bio}
              </p>
            </div>

            {/* Specializations */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Spesialisasi
              </h2>
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
                      <span className="font-semibold text-gray-900">
                        {review.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {review.date}
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
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Booking</h3>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Pilih Tanggal
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Pilih Waktu
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>09:00 - 10:00</option>
                  <option>10:00 - 11:00</option>
                  <option>11:00 - 12:00</option>
                  <option>13:00 - 14:00</option>
                  <option>14:00 - 15:00</option>
                  <option>15:00 - 16:00</option>
                  <option>16:00 - 17:00</option>
                </select>
              </div>

              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-700">Tarif per jam</span>
                  <span className="font-semibold">
                    Rp {teknisiDetail.hourlyRate.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Estimasi 1 jam</span>
                </div>
              </div>

              <button className="mb-3 w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-cyan-600">
                Book Sekarang
              </button>

              <button className="w-full rounded-lg border-2 border-blue-500 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50">
                Chat Teknisi
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
