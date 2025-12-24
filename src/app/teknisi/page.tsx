'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { SearchBar } from '@/components/catalog/search-bar'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import { ProductCard } from '@/components/catalog/product-card'
import { SlidersHorizontal, X } from 'lucide-react'

// Dummy data
const teknisiData = [
  {
    id: '1',
    name: 'Ahmad Teknisi Pro',
    photo:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    specialization: 'Spesialis HP & Laptop',
    rating: 4.9,
    reviewCount: 150,
    hourlyRate: 75000,
    location: 'Jakarta Selatan',
    availability: true,
  },
  {
    id: '2',
    name: 'Budi Repair Expert',
    photo:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    specialization: 'Spesialis iPhone',
    rating: 4.8,
    reviewCount: 120,
    hourlyRate: 100000,
    location: 'Jakarta Pusat',
    availability: true,
  },
  {
    id: '3',
    name: 'Citra Service',
    photo:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
    specialization: 'Spesialis Android',
    rating: 4.7,
    reviewCount: 98,
    hourlyRate: 65000,
    location: 'Jakarta Timur',
    availability: false,
  },
  {
    id: '4',
    name: 'Dedi Tech Master',
    photo:
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=400&q=80',
    specialization: 'Spesialis Laptop Gaming',
    rating: 4.9,
    reviewCount: 200,
    hourlyRate: 85000,
    location: 'Jakarta Barat',
    availability: true,
  },
  {
    id: '5',
    name: 'Eka Gadget Pro',
    photo:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80',
    specialization: 'Spesialis Tablet',
    rating: 4.6,
    reviewCount: 85,
    hourlyRate: 70000,
    location: 'Jakarta Utara',
    availability: true,
  },
  {
    id: '6',
    name: 'Faisal Repair',
    photo:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    specialization: 'Spesialis Motherboard',
    rating: 4.8,
    reviewCount: 110,
    hourlyRate: 90000,
    location: 'Tangerang',
    availability: true,
  },
]

const filterGroups = [
  {
    title: 'Spesialisasi',
    type: 'checkbox' as const,
    options: [
      { value: 'hp', label: 'HP & Smartphone', count: 45 },
      { value: 'laptop', label: 'Laptop', count: 32 },
      { value: 'tablet', label: 'Tablet', count: 18 },
      { value: 'motherboard', label: 'Motherboard', count: 12 },
    ],
  },
  {
    title: 'Rating',
    type: 'radio' as const,
    options: [
      { value: '4.5', label: '4.5+ ⭐' },
      { value: '4.0', label: '4.0+ ⭐' },
      { value: '3.5', label: '3.5+ ⭐' },
    ],
  },
  {
    title: 'Lokasi',
    type: 'checkbox' as const,
    options: [
      { value: 'jakarta-selatan', label: 'Jakarta Selatan', count: 25 },
      { value: 'jakarta-pusat', label: 'Jakarta Pusat', count: 20 },
      { value: 'jakarta-timur', label: 'Jakarta Timur', count: 18 },
      { value: 'jakarta-barat', label: 'Jakarta Barat', count: 15 },
      { value: 'jakarta-utara', label: 'Jakarta Utara', count: 12 },
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

export default function TeknisiPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="container mx-auto px-4 pb-8 pt-24">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Katalog Teknisi
          </h1>
          <p className="text-lg text-gray-600">
            Temukan teknisi terbaik untuk servis gadget Anda
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          placeholder="Cari teknisi berdasarkan nama atau spesialisasi..."
          sortOptions={[
            { value: 'rating', label: 'Rating Tertinggi' },
            { value: 'price-low', label: 'Harga Terendah' },
            { value: 'price-high', label: 'Harga Tertinggi' },
            { value: 'reviews', label: 'Paling Banyak Review' },
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

          {/* Product Grid - Masonry Layout */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Menampilkan{' '}
                <span className="font-semibold">{teknisiData.length}</span>{' '}
                teknisi
              </p>
            </div>

            {/* Mobile: Masonry 2 columns */}
            <div className="columns-2 gap-6 space-y-6 md:hidden">
              {teknisiData.map((teknisi) => (
                <div key={teknisi.id} className="mb-6 break-inside-avoid">
                  <ProductCard
                    id={teknisi.id}
                    title={teknisi.name}
                    image={teknisi.photo}
                    description={teknisi.specialization}
                    price={teknisi.hourlyRate}
                    rating={teknisi.rating}
                    reviewCount={teknisi.reviewCount}
                    badge={teknisi.availability ? 'Tersedia' : 'Tidak Tersedia'}
                    badgeColor={teknisi.availability ? 'green' : 'red'}
                    href={`/teknisi/${teknisi.id}`}
                    actionLabel="Lihat Profil"
                  />
                </div>
              ))}
            </div>

            {/* Desktop: Regular grid 3 columns */}
            <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
              {teknisiData.map((teknisi) => (
                <ProductCard
                  key={teknisi.id}
                  id={teknisi.id}
                  title={teknisi.name}
                  image={teknisi.photo}
                  description={teknisi.specialization}
                  price={teknisi.hourlyRate}
                  rating={teknisi.rating}
                  reviewCount={teknisi.reviewCount}
                  badge={teknisi.availability ? 'Tersedia' : 'Tidak Tersedia'}
                  badgeColor={teknisi.availability ? 'green' : 'red'}
                  href={`/teknisi/${teknisi.id}`}
                  actionLabel="Lihat Profil"
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
