import {
  ShoppingBag,
  Package,
  Wrench,
  Clock,
  Smartphone,
  Headphones,
  Laptop,
  Cpu,
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard - HaloTekno',
}

export default function CustomerDashboard() {
  return (
    <div>
      {/* Main Banner with Tech Background */}
      <div className="mb-6">
        <div
          className="relative h-64 overflow-hidden rounded-2xl"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-blue-500/90 to-transparent"></div>

          {/* Content */}
          <div className="relative flex h-full items-center px-12">
            <div className="max-w-xl">
              <h1 className="mb-3 text-4xl font-bold text-white">HaloTekno</h1>
              <p className="text-xl text-blue-50">
                Layanan Servis dan Penjualan Gadget No. 1
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">KATEGORI</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {/* Konsultasi Servis */}
          <Link
            href="/konsultasi"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80"
                alt="Konsultasi"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/60">
                <Headphones className="relative z-10 h-16 w-16 text-blue-500 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Konsultasi Servis
              </h3>
              <p className="text-xs text-gray-600">Gratis</p>
            </div>
          </Link>

          {/* Jasa Cek/Bongkar */}
          <Link
            href="/cek-bongkar"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80"
                alt="Cek Bongkar"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/60">
                <Wrench className="relative z-10 h-16 w-16 text-blue-500 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Jasa Cek/Bongkar
              </h3>
              <p className="text-xs text-gray-600">Mulai 50rb</p>
            </div>
          </Link>

          {/* Jasa Servis */}
          <Link
            href="/jasa-servis"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80"
                alt="Jasa Servis"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/60">
                <Smartphone className="relative z-10 h-16 w-16 text-blue-500 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Jasa Servis
              </h3>
              <p className="text-xs text-gray-600">Bergaransi</p>
            </div>
          </Link>

          {/* Sewa Alat Ditempat */}
          <Link
            href="/sewa-alat"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&q=80"
                alt="Sewa Alat"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/60">
                <Clock className="relative z-10 h-16 w-16 text-blue-500 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Sewa Alat Ditempat
              </h3>
              <p className="text-xs text-gray-600">Harian</p>
            </div>
          </Link>

          {/* Jual Sparepart */}
          <Link
            href="/sparepart"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80"
                alt="Sparepart"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/60">
                <Package className="relative z-10 h-16 w-16 text-blue-500 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Jual Sparepart
              </h3>
              <p className="text-xs text-gray-600">1000+ Item</p>
            </div>
          </Link>

          {/* Rekomendasi Tempat Servis */}
          <Link
            href="/rekomendasi"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
                alt="Rekomendasi"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
                loading="eager"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/60">
                <ShoppingBag className="relative z-10 h-16 w-16 text-blue-500 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Rekomendasi Tempat
              </h3>
              <p className="text-xs text-gray-600">Terpercaya</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Katalog Teknisi */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">TEKNISI TERBAIK</h2>
          <Link
            href="/teknisi"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
            'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&q=80',
          ].map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-blue-50">
                <img
                  src={img}
                  alt={`Teknisi ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-gray-900">
                  Teknisi {i + 1}
                </h3>
                <p className="mb-2 text-xs text-gray-600">
                  Spesialis HP & Laptop
                </p>
                <div className="mb-2 flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-xs text-gray-500">(120)</span>
                </div>
                <p className="text-sm font-bold text-blue-600">
                  Mulai Rp 50.000
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Katalog Sparepart */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            SPAREPART TERLARIS
          </h2>
          <Link
            href="/sparepart"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
            'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80',
            'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
          ].map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-blue-50">
                <img
                  src={img}
                  alt={`LCD iPhone ${i + 1}3`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-gray-900">
                  LCD iPhone {i + 1}3
                </h3>
                <p className="mb-2 text-xs text-gray-600">Original Quality</p>
                <div className="mb-2 flex items-center gap-1">
                  <span className="text-xs text-gray-500">Terjual 500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-blue-600">Rp 850.000</p>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                    Stok Ada
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Katalog Rekomendasi Tempat */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            REKOMENDASI TEMPAT SERVIS
          </h2>
          <Link
            href="/rekomendasi"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
          ].map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg"
            >
              <div className="flex gap-4 p-4">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-blue-50">
                  <img
                    src={img}
                    alt={`Toko Servis ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Toko Servis {i + 1}
                  </h3>
                  <p className="mb-2 text-xs text-gray-600">
                    Jl. Contoh No. {i + 1}23, Jakarta
                  </p>
                  <div className="mb-2 flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-xs text-gray-500">(250 review)</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                      Buka
                    </span>
                    <span className="text-xs text-gray-500">08:00 - 20:00</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
