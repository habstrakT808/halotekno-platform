'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { SearchBar } from '@/components/catalog/search-bar'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import { ProductCard } from '@/components/catalog/product-card'
import { SlidersHorizontal, X } from 'lucide-react'

// Dummy data
const sparepartData = [
  {
    id: '1',
    name: 'LCD iPhone 13 Pro Max',
    photo:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
    category: 'Layar',
    brand: 'Apple',
    price: 2500000,
    rating: 4.8,
    reviewCount: 245,
    stock: 15,
    condition: 'Baru',
  },
  {
    id: '2',
    name: 'Baterai Samsung Galaxy S23',
    photo:
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80',
    category: 'Baterai',
    brand: 'Samsung',
    price: 450000,
    rating: 4.7,
    reviewCount: 189,
    stock: 32,
    condition: 'Baru',
  },
  {
    id: '3',
    name: 'Kamera Belakang Xiaomi 12',
    photo:
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80',
    category: 'Kamera',
    brand: 'Xiaomi',
    price: 850000,
    rating: 4.6,
    reviewCount: 156,
    stock: 8,
    condition: 'Baru',
  },
  {
    id: '4',
    name: 'Charger Original iPhone',
    photo:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',
    category: 'Aksesoris',
    brand: 'Apple',
    price: 350000,
    rating: 4.9,
    reviewCount: 412,
    stock: 50,
    condition: 'Baru',
  },
  {
    id: '5',
    name: 'Motherboard Oppo Reno 8',
    photo:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
    category: 'Motherboard',
    brand: 'Oppo',
    price: 1800000,
    rating: 4.5,
    reviewCount: 78,
    stock: 3,
    condition: 'Baru',
  },
  {
    id: '6',
    name: 'Touchscreen Vivo V27',
    photo:
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80',
    category: 'Layar',
    brand: 'Vivo',
    price: 650000,
    rating: 4.7,
    reviewCount: 134,
    stock: 12,
    condition: 'Baru',
  },
]

const filterGroups = [
  {
    title: 'Kategori',
    type: 'checkbox' as const,
    options: [
      { value: 'layar', label: 'Layar', count: 156 },
      { value: 'baterai', label: 'Baterai', count: 98 },
      { value: 'kamera', label: 'Kamera', count: 67 },
      { value: 'motherboard', label: 'Motherboard', count: 45 },
      { value: 'aksesoris', label: 'Aksesoris', count: 234 },
    ],
  },
  {
    title: 'Brand',
    type: 'checkbox' as const,
    options: [
      { value: 'apple', label: 'Apple', count: 89 },
      { value: 'samsung', label: 'Samsung', count: 112 },
      { value: 'xiaomi', label: 'Xiaomi', count: 95 },
      { value: 'oppo', label: 'Oppo', count: 78 },
      { value: 'vivo', label: 'Vivo', count: 65 },
    ],
  },
  {
    title: 'Harga',
    type: 'radio' as const,
    options: [
      { value: 'under-500k', label: 'Di bawah 500rb' },
      { value: '500k-1m', label: '500rb - 1jt' },
      { value: '1m-2m', label: '1jt - 2jt' },
      { value: 'above-2m', label: 'Di atas 2jt' },
    ],
  },
  {
    title: 'Kondisi',
    type: 'radio' as const,
    options: [
      { value: 'new', label: 'Baru' },
      { value: 'refurbished', label: 'Refurbished' },
      { value: 'used', label: 'Bekas' },
    ],
  },
]

export default function SparepartPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Katalog Sparepart
          </h1>
          <p className="text-lg text-gray-600">
            Temukan sparepart berkualitas untuk gadget Anda
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Cari sparepart berdasarkan nama atau brand..."
          sortOptions={[
            { value: 'popular', label: 'Paling Populer' },
            { value: 'price-low', label: 'Harga Terendah' },
            { value: 'price-high', label: 'Harga Tertinggi' },
            { value: 'rating', label: 'Rating Tertinggi' },
            { value: 'sold', label: 'Paling Laris' },
          ]}
        />

        {/* Mobile Filter Button */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 transition-colors hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="font-medium">Filter</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:col-span-1 lg:block">
            <FilterSidebar filters={filterGroups} />
          </aside>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsFilterOpen(false)}
              ></div>

              {/* Drawer */}
              <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl">
                <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900">Filter</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  <FilterSidebar filters={filterGroups} />
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Menampilkan{' '}
                <span className="font-semibold">{sparepartData.length}</span>{' '}
                produk
              </p>
            </div>

            {/* Mobile: Masonry 2 columns */}
            <div className="columns-2 gap-6 space-y-6 md:hidden">
              {sparepartData.map((item) => (
                <div key={item.id} className="mb-6 break-inside-avoid">
                  <ProductCard
                    id={item.id}
                    title={item.name}
                    image={item.photo}
                    description={`${item.brand} • ${item.category}`}
                    price={item.price}
                    rating={item.rating}
                    reviewCount={item.reviewCount}
                    badge={item.stock > 0 ? `Stok: ${item.stock}` : 'Habis'}
                    badgeColor={item.stock > 0 ? 'green' : 'red'}
                    href={`/sparepart/${item.id}`}
                    actionLabel="Lihat Detail"
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Regular grid 3 columns */}
            <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
              {sparepartData.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  image={item.photo}
                  description={`${item.brand} • ${item.category}`}
                  price={item.price}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  badge={item.stock > 0 ? `Stok: ${item.stock}` : 'Habis'}
                  badgeColor={item.stock > 0 ? 'green' : 'red'}
                  href={`/sparepart/${item.id}`}
                  actionLabel="Lihat Detail"
                />
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <button className="rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                  Previous
                </button>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  1
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                  2
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                  3
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
