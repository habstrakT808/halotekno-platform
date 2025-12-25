import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import AddToCartButton from '@/components/cart/add-to-cart-button'
import ImageGallery from '@/components/catalog/image-gallery'
import {
  Star,
  Calendar,
  Package,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Detail Sewa Alat - HaloTekno',
}

// Dummy data
const itemDetail = {
  id: '1',
  name: 'Laptop Gaming ROG Strix G15',
  images: [
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80',
  ],
  category: 'Laptop Gaming',
  dailyRate: 150000,
  weeklyRate: 900000,
  monthlyRate: 3000000,
  availability: true,
  condition: 'Sangat Baik',
  rating: 4.9,
  reviewCount: 45,
  description:
    'Laptop gaming powerful dengan spesifikasi tinggi. Cocok untuk gaming, editing video, dan rendering. Sudah termasuk charger dan tas laptop.',
  specifications: {
    Processor: 'AMD Ryzen 9 5900HX',
    RAM: '16GB DDR4',
    Storage: '512GB NVMe SSD',
    GPU: 'NVIDIA RTX 3060 6GB',
    Display: '15.6" FHD 144Hz',
    Kondisi: 'Sangat Baik (95%)',
  },
  rentalTerms: [
    'Deposit Rp 2.000.000 (dikembalikan setelah pengembalian)',
    'Minimal sewa 1 hari',
    'Gratis antar-jemput area Jakarta',
    'Pengembalian maksimal jam 18:00',
    'Denda keterlambatan Rp 50.000/jam',
    'Kerusakan ditanggung penyewa',
  ],
}

const reviews = [
  {
    id: 1,
    name: 'Rizki Pratama',
    rating: 5,
    date: '1 minggu yang lalu',
    comment:
      'Laptop mantap untuk gaming dan editing. Pemilik responsif dan baik!',
  },
  {
    id: 2,
    name: 'Dina Safitri',
    rating: 5,
    date: '2 minggu yang lalu',
    comment: 'Kondisi laptop sangat bagus, sesuai deskripsi. Recommended!',
  },
  {
    id: 3,
    name: 'Eko Wijaya',
    rating: 4,
    date: '3 minggu yang lalu',
    comment: 'Bagus, tapi deposit agak mahal.',
  },
]

export default async function SewaAlatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          {' / '}
          <Link href="/sewa-alat" className="hover:text-blue-600">
            Katalog Sewa Alat
          </Link>
          {' / '}
          <span className="text-gray-900">{itemDetail.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Product Images & Info */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Image Gallery */}
                <ImageGallery
                  images={itemDetail.images}
                  productName={itemDetail.name}
                />

                {/* Item Info */}
                <div>
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    {itemDetail.name}
                  </h1>

                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold">{itemDetail.rating}</span>
                    </div>
                    <span className="text-gray-600">
                      ({itemDetail.reviewCount} review)
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Per Hari</span>
                        <span className="text-2xl font-bold text-blue-600">
                          Rp {itemDetail.dailyRate.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Per Minggu</span>
                        <span className="font-semibold text-gray-900">
                          Rp {itemDetail.weeklyRate.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Per Bulan</span>
                        <span className="font-semibold text-gray-900">
                          Rp {itemDetail.monthlyRate.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          itemDetail.availability
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {itemDetail.availability ? 'Tersedia' : 'Sedang Disewa'}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {itemDetail.condition}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Package className="h-5 w-5 text-blue-600" />
                      <span>Antar-Jemput</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Asuransi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span>Fleksibel</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Deskripsi
              </h2>
              <p className="leading-relaxed text-gray-700">
                {itemDetail.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Spesifikasi
              </h2>
              <div className="space-y-3">
                {Object.entries(itemDetail.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex border-b border-gray-200 pb-3 last:border-0"
                    >
                      <span className="w-1/3 text-gray-600">{key}</span>
                      <span className="w-2/3 font-medium text-gray-900">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Rental Terms */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Syarat & Ketentuan Sewa
              </h2>
              <div className="space-y-3">
                {itemDetail.rentalTerms.map((term, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span className="text-gray-700">{term}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Review ({itemDetail.reviewCount})
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
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Booking Sewa
              </h3>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Durasi Sewa
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Harian</option>
                  <option>Mingguan</option>
                  <option>Bulanan</option>
                </select>
              </div>

              <div className="mb-6 space-y-2 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tarif per hari</span>
                  <span className="font-semibold">
                    Rp {itemDetail.dailyRate.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Durasi</span>
                  <span className="font-semibold">1 hari</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Deposit</span>
                  <span className="font-semibold">Rp 2.000.000</span>
                </div>
                <div className="mt-2 border-t border-gray-300 pt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-blue-600">
                      Rp 2.150.000
                    </span>
                  </div>
                </div>
              </div>

              <AddToCartButton
                product={{
                  id: itemDetail.id,
                  name: itemDetail.name,
                  price: itemDetail.dailyRate,
                  image: itemDetail.images[0],
                  type: 'RENTAL',
                }}
                className="mb-3 w-full"
              />

              <button className="w-full rounded-lg border-2 border-blue-500 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50">
                Chat Pemilik
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
