import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import AddToCartButton from '@/components/cart/add-to-cart-button'
import ImageGallery from '@/components/catalog/image-gallery'
import {
  Star,
  CheckCircle,
  Shield,
  Clock,
  Package,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import prisma from '@/lib/db'

export const metadata = {
  title: 'Detail Sparepart - HaloTekno',
}

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id, isActive: true },
    })

    if (!product) return null

    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function SparepartDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const isInStock = product.stock > 0

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
          <Link href="/sparepart" className="hover:text-blue-600">
            Sparepart
          </Link>
          {' / '}
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {product.images.length > 0 ? (
              <ImageGallery images={product.images} />
            ) : (
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                <Package className="h-24 w-24 text-gray-300" />
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                {isInStock ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    <CheckCircle className="inline h-4 w-4" /> Tersedia
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                    <AlertCircle className="inline h-4 w-4" /> Stok Habis
                  </span>
                )}
                {product.brand && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {product.brand}
                  </span>
                )}
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-gray-600">{product.category}</p>
            </div>

            {/* Price */}
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-6">
              <p className="mb-1 text-sm text-gray-600">Harga</p>
              <p className="text-4xl font-bold text-blue-600">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              {isInStock && (
                <p className="mt-2 text-sm text-gray-600">
                  Stok tersedia:{' '}
                  <span className="font-semibold">{product.stock} unit</span>
                </p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-3 text-xl font-bold text-gray-900">
                  Deskripsi Produk
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-3 text-xl font-bold text-gray-900">
                Spesifikasi
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Kategori</span>
                  <span className="font-semibold text-gray-900">
                    {product.category}
                  </span>
                </div>
                {product.brand && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-semibold text-gray-900">
                      {product.brand}
                    </span>
                  </div>
                )}
                {product.model && (
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">
                      Model / Kompatibilitas
                    </span>
                    <span className="font-semibold text-gray-900">
                      {product.model}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Kondisi</span>
                  <span className="font-semibold text-gray-900">Baru</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Garansi</span>
                  <span className="font-semibold text-gray-900">30 Hari</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Keunggulan
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Original Quality
                    </p>
                    <p className="text-sm text-gray-600">
                      Kualitas terjamin original
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Pengiriman Cepat
                    </p>
                    <p className="text-sm text-gray-600">
                      Proses pengiriman 1-2 hari
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    <Package className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Packing Aman</p>
                    <p className="text-sm text-gray-600">
                      Dikemas dengan bubble wrap
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              {isInStock ? (
                <>
                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0] || '',
                      type: 'PRODUCT',
                      stock: product.stock,
                    }}
                    className="w-full"
                  />
                  <Link
                    href="/cart"
                    className="block w-full rounded-lg border-2 border-blue-600 py-3 text-center font-semibold text-blue-600 transition-all hover:bg-blue-50"
                  >
                    Lihat Keranjang
                  </Link>
                </>
              ) : (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-lg bg-gray-300 py-3 text-center font-semibold text-gray-500"
                >
                  Stok Habis
                </button>
              )}
              <p className="text-center text-xs text-gray-500">
                Hubungi kami untuk informasi lebih lanjut
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Produk Terkait
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Placeholder - could implement related products later */}
            <p className="col-span-full py-8 text-center text-gray-500">
              Lihat produk lainnya di{' '}
              <Link href="/sparepart" className="text-blue-600 hover:underline">
                katalog sparepart
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
