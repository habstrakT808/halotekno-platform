import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
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
import { notFound } from 'next/navigation'
import prisma from '@/lib/db'

export const metadata = {
  title: 'Detail Sewa Alat - HaloTekno',
}

async function getRentalItem(id: string) {
  try {
    const item = await prisma.rentalItem.findUnique({
      where: { id, isActive: true },
    })

    if (!item) return null

    return item
  } catch (error) {
    console.error('Error fetching rental item:', error)
    return null
  }
}

export default async function SewaAlatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await getRentalItem(id)

  if (!item) {
    notFound()
  }

  const isAvailable = item.stock > 0

  // Calculate rental rates
  const dailyRate = item.pricePerDay
  const weeklyRate = Math.round(dailyRate * 5 * 0.9) // 10% discount
  const monthlyRate = Math.round(dailyRate * 20 * 0.8) // 20% discount
  const depositAmount = Math.round(dailyRate * 10) // 10x daily rate as deposit

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
            Sewa Alat
          </Link>
          {' / '}
          <span className="text-gray-900">{item.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {item.images.length > 0 ? (
              <ImageGallery images={item.images} />
            ) : (
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                <Package className="h-24 w-24 text-gray-300" />
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Item Header */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                {isAvailable ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    <CheckCircle className="inline h-4 w-4" /> Tersedia
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    <AlertCircle className="inline h-4 w-4" /> Tidak Tersedia
                  </span>
                )}
                {isAvailable && (
                  <span className="text-sm text-gray-600">
                    {item.stock} unit tersedia
                  </span>
                )}
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {item.name}
              </h1>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Harga Sewa
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Harian</p>
                    <p className="text-sm text-gray-600">Per hari</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    Rp {dailyRate.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-blue-200 pt-3">
                  <div>
                    <p className="font-semibold text-gray-900">Mingguan</p>
                    <p className="text-sm text-gray-600">5 hari (hemat 10%)</p>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    Rp {weeklyRate.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-blue-200 pt-3">
                  <div>
                    <p className="font-semibold text-gray-900">Bulanan</p>
                    <p className="text-sm text-gray-600">20 hari (hemat 20%)</p>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    Rp {monthlyRate.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-3 text-xl font-bold text-gray-900">
                  Deskripsi
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </div>
            )}

            {/* Rental Terms */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Syarat & Ketentuan
              </h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>
                    Deposit Rp {depositAmount.toLocaleString('id-ID')}{' '}
                    (dikembalikan setelah pengembalian)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Minimal sewa 1 hari</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Gratis antar-jemput area Jakarta</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                  <span>Pengembalian maksimal jam 18:00</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <span>Denda keterlambatan Rp 50.000/jam</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                  <span>Kerusakan ditanggung penyewa</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Benefit</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Kondisi Prima</p>
                    <p className="text-sm text-gray-600">
                      Alat terawat dan berkondisi baik
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Fleksibel</p>
                    <p className="text-sm text-gray-600">
                      Durasi sewa menyesuaikan kebutuhan
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <Package className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Support 24/7</p>
                    <p className="text-sm text-gray-600">
                      Bantuan teknis selama masa sewa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              {isAvailable ? (
                <>
                  <Link
                    href={`/booking/rental?item=${item.id}`}
                    className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-center font-semibold text-white transition-all hover:shadow-lg"
                  >
                    <Calendar className="mr-2 inline h-5 w-5" />
                    Booking Sekarang
                  </Link>
                  <Link
                    href="/sewa-alat"
                    className="block w-full rounded-lg border-2 border-blue-600 py-3 text-center font-semibold text-blue-600 transition-all hover:bg-blue-50"
                  >
                    Lihat Alat Lainnya
                  </Link>
                </>
              ) : (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-lg bg-gray-300 py-3 text-center font-semibold text-gray-500"
                >
                  Tidak Tersedia
                </button>
              )}
              <p className="text-center text-xs text-gray-500">
                Hubungi kami untuk informasi lebih lanjut
              </p>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Alat Sewa Lainnya
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Placeholder - could implement related items later */}
            <p className="col-span-full py-8 text-center text-gray-500">
              Lihat alat sewa lainnya di{' '}
              <Link href="/sewa-alat" className="text-blue-600 hover:underline">
                katalog sewa alat
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
