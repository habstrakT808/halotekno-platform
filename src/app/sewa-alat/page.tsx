'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { SearchBar } from '@/components/catalog/search-bar'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import { ProductCard } from '@/components/catalog/product-card'
import { SlidersHorizontal, X } from 'lucide-react'

// Dummy data
const sewaAlatData = [
  {
    id: '1',
    name: 'Laptop HP EliteBook 840 G8',
    photo:
      'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&q=80',
    category: 'Laptop',
    specs: 'i7-1165G7, 16GB RAM, 512GB SSD',
    dailyRate: 150000,
    weeklyRate: 900000,
    monthlyRate: 3000000,
    rating: 4.8,
    reviewCount: 145,
    availability: true,
    condition: 'Seperti Baru',
  },
  {
    id: '2',
    name: 'iPhone 13 Pro Max 256GB',
    photo:
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&q=80',
    category: 'Smartphone',
    specs: 'A15 Bionic, 6GB RAM, 256GB',
    dailyRate: 200000,
    weeklyRate: 1200000,
    monthlyRate: 4000000,
    rating: 4.9,
    reviewCount: 230,
    availability: true,
    condition: 'Sangat Baik',
  },
  {
    id: '3',
    name: 'iPad Pro 12.9" M1 2021',
    photo:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    category: 'Tablet',
    specs: 'M1 Chip, 8GB RAM, 256GB',
    dailyRate: 180000,
    weeklyRate: 1000000,
    monthlyRate: 3500000,
    rating: 4.7,
    reviewCount: 98,
    availability: false,
    condition: 'Baik',
  },
  {
    id: '4',
    name: 'MacBook Pro 14" M1 Pro',
    photo:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    category: 'Laptop',
    specs: 'M1 Pro, 16GB RAM, 512GB SSD',
    dailyRate: 250000,
    weeklyRate: 1500000,
    monthlyRate: 5000000,
    rating: 4.9,
    reviewCount: 312,
    availability: true,
    condition: 'Seperti Baru',
  },
  {
    id: '5',
    name: 'Samsung Galaxy Tab S8 Ultra',
    photo:
      'https://images.unsplash.com/photo-1585790050230-5dd28404f1e9?w=400&q=80',
    category: 'Tablet',
    specs: 'Snapdragon 8 Gen 1, 12GB RAM',
    dailyRate: 120000,
    weeklyRate: 700000,
    monthlyRate: 2500000,
    rating: 4.6,
    reviewCount: 76,
    availability: true,
    condition: 'Baik',
  },
  {
    id: '6',
    name: 'Dell XPS 15 9520',
    photo:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80',
    category: 'Laptop',
    specs: 'i7-12700H, 32GB RAM, 1TB SSD',
    dailyRate: 200000,
    weeklyRate: 1200000,
    monthlyRate: 4000000,
    rating: 4.8,
    reviewCount: 189,
    availability: true,
    condition: 'Sangat Baik',
  },
]

const filterGroups = [
  {
    title: 'Kategori',
    type: 'checkbox' as const,
    options: [
      { value: 'laptop', label: 'Laptop', count: 45 },
      { value: 'smartphone', label: 'Smartphone', count: 38 },
      { value: 'tablet', label: 'Tablet', count: 25 },
      { value: 'camera', label: 'Kamera', count: 15 },
    ],
  },
  {
    title: 'Harga per Hari',
    type: 'radio' as const,
    options: [
      { value: 'under-100k', label: 'Di bawah 100rb' },
      { value: '100k-200k', label: '100rb - 200rb' },
      { value: '200k-300k', label: '200rb - 300rb' },
      { value: 'above-300k', label: 'Di atas 300rb' },
    ],
  },
  {
    title: 'Kondisi',
    type: 'checkbox' as const,
    options: [
      { value: 'like-new', label: 'Seperti Baru', count: 32 },
      { value: 'excellent', label: 'Sangat Baik', count: 45 },
      { value: 'good', label: 'Baik', count: 28 },
    ],
  },
  {
    title: 'Ketersediaan',
    type: 'radio' as const,
    options: [
      { value: 'available', label: 'Tersedia Sekarang' },
      { value: 'all', label: 'Semua' },
    ],
  },
]

export default function SewaAlatPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="container mx-auto px-4 pb-8 pt-24">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Katalog Sewa Alat
          </h1>
          <p className="text-lg text-gray-600">
            Sewa gadget berkualitas untuk kebutuhan Anda
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Cari alat berdasarkan nama atau kategori..."
          sortOptions={[
            { value: 'popular', label: 'Paling Populer' },
            { value: 'price-low', label: 'Harga Terendah' },
            { value: 'price-high', label: 'Harga Tertinggi' },
            { value: 'rating', label: 'Rating Tertinggi' },
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
                <span className="font-semibold">{sewaAlatData.length}</span>{' '}
                alat
              </p>
            </div>

            {/* Mobile: Masonry 2 columns */}
            <div className="columns-2 gap-6 space-y-6 md:hidden">
              {sewaAlatData.map((item) => (
                <div key={item.id} className="mb-6 break-inside-avoid">
                  <ProductCard
                    id={item.id}
                    title={item.name}
                    image={item.photo}
                    description={item.specs}
                    price={item.dailyRate}
                    rating={item.rating}
                    reviewCount={item.reviewCount}
                    badge={item.availability ? 'Tersedia' : 'Tidak Tersedia'}
                    badgeColor={item.availability ? 'green' : 'red'}
                    href={`/sewa-alat/${item.id}`}
                    actionLabel="Lihat Detail"
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Regular grid 3 columns */}
            <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
              {sewaAlatData.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  image={item.photo}
                  description={item.specs}
                  price={item.dailyRate}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  badge={item.availability ? 'Tersedia' : 'Tidak Tersedia'}
                  badgeColor={item.availability ? 'green' : 'red'}
                  href={`/sewa-alat/${item.id}`}
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
