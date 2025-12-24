import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Package,
  Shield,
  Truck,
  CheckCircle,
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Detail Sparepart - HaloTekno',
}

// Dummy data
const productDetail = {
  id: '1',
  name: 'LCD iPhone 13 Pro Max Original',
  images: [
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80',
  ],
  brand: 'Apple',
  category: 'LCD',
  price: 2500000,
  stock: 15,
  soldCount: 250,
  condition: 'Baru',
  rating: 4.9,
  reviewCount: 85,
  description:
    'LCD Original untuk iPhone 13 Pro Max dengan kualitas terbaik. Sudah termasuk touchscreen dan digitizer. Garansi 30 hari.',
  specifications: {
    Kompatibilitas: 'iPhone 13 Pro Max',
    Kondisi: 'Baru',
    Garansi: '30 Hari',
    Berat: '150 gram',
    Ukuran: '6.7 inch',
  },
}

const reviews = [
  {
    id: 1,
    name: 'Budi Santoso',
    rating: 5,
    date: '3 hari yang lalu',
    comment: 'Barang original, packing rapi, pengiriman cepat!',
  },
  {
    id: 2,
    name: 'Siti Aminah',
    rating: 5,
    date: '1 minggu yang lalu',
    comment: 'Kualitas bagus, harga sesuai. Recommended seller!',
  },
  {
    id: 3,
    name: 'Andi Wijaya',
    rating: 4,
    date: '2 minggu yang lalu',
    comment: 'Bagus, tapi pengiriman agak lama.',
  },
]

export default function SparepartDetailPage({
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
          <Link href="/sparepart" className="hover:text-blue-600">
            Katalog Sparepart
          </Link>
          {' / '}
          <span className="text-gray-900">{productDetail.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Product Images & Info */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Image Gallery */}
                <div>
                  <img
                    src={productDetail.images[0]}
                    alt={productDetail.name}
                    className="mb-4 aspect-square w-full rounded-xl object-cover"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {productDetail.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${productDetail.name} ${index + 1}`}
                        className="aspect-square w-full cursor-pointer rounded-lg border-2 border-gray-200 object-cover transition-colors hover:border-blue-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="mb-3 text-2xl font-bold text-gray-900">
                    {productDetail.name}
                  </h1>

                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="font-bold">{productDetail.rating}</span>
                    </div>
                    <span className="text-gray-600">
                      ({productDetail.reviewCount} review)
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">
                      {productDetail.soldCount} terjual
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="mb-2 text-3xl font-bold text-blue-600">
                      Rp {productDetail.price.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          productDetail.stock > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {productDetail.stock > 0
                          ? `Stok: ${productDetail.stock}`
                          : 'Habis'}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {productDetail.condition}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Package className="h-5 w-5 text-blue-600" />
                      <span>Original</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Garansi 30 Hari</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <span>Gratis Ongkir</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span>Verified Seller</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Deskripsi Produk
              </h2>
              <p className="leading-relaxed text-gray-700">
                {productDetail.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Spesifikasi
              </h2>
              <div className="space-y-3">
                {Object.entries(productDetail.specifications).map(
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

            {/* Reviews */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Review ({productDetail.reviewCount})
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
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Atur Jumlah
              </h3>

              <div className="mb-6 flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition-colors hover:bg-gray-50">
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={productDetail.stock}
                  className="w-20 rounded-lg border border-gray-300 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition-colors hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    Rp {productDetail.price.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Ongkir</span>
                  <span className="font-medium text-green-600">GRATIS</span>
                </div>
              </div>

              <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-cyan-600">
                <ShoppingCart className="h-5 w-5" />
                Tambah ke Keranjang
              </button>

              <button className="w-full rounded-lg border-2 border-blue-500 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
