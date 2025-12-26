'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { SearchBar } from '@/components/catalog/search-bar'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import { ProductCard } from '@/components/catalog/product-card'
import { SlidersHorizontal, X, Loader2, Shield } from 'lucide-react'

interface TechnicianData {
  id: string
  bio: string | null
  experience: number
  specialties: string[]
  rating: number
  totalReview: number
  isAvailable: boolean
  user: {
    id: string
    name: string | null
    image: string | null
    phone: string | null
  }
  services: Array<{
    id: string
    name: string
    category: string
    price: number
  }>
}

const filterGroups = [
  {
    title: 'Spesialisasi',
    type: 'checkbox' as const,
    options: [
      { value: 'LCD', label: 'LCD' },
      { value: 'Mesin', label: 'Mesin' },
      { value: 'Software', label: 'Software' },
      { value: 'Motherboard', label: 'Motherboard' },
      { value: 'Baterai', label: 'Baterai' },
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
  const [technicians, setTechnicians] = useState<TechnicianData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    fetchTechnicians()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedSpecialty, sortBy])

  const fetchTechnicians = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        limit: '50',
        sortBy,
      })

      if (searchQuery) params.append('search', searchQuery)
      if (selectedSpecialty) params.append('specialty', selectedSpecialty)

      const res = await fetch(`/api/technicians?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setTechnicians(data.technicians || [])
    } catch (error) {
      console.error('Error fetching technicians:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
      <Navbar variant="light" />

      <main className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
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
            { value: 'experience', label: 'Pengalaman' },
            { value: 'reviews', label: 'Paling Banyak Review' },
          ]}
          onSearch={handleSearch}
          onSort={handleSort}
        />

        {/* Mobile Filter Toggle */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filter
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex gap-8">
          {/* Sidebar Filter - Desktop */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <FilterSidebar
              filters={filterGroups}
              onFilterChange={(filters) => {
                const specialty = Object.values(filters)
                  .flat()
                  .find((f: string) =>
                    filterGroups[0].options.some((o) => o.value === f)
                  )
                if (specialty) setSelectedSpecialty(specialty)
              }}
            />
          </aside>

          {/* Mobile Filter Overlay */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Filter</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="rounded-lg p-2 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filterGroups}
                  onFilterChange={(filters) => {
                    const specialty = Object.values(filters)
                      .flat()
                      .find((f: string) =>
                        filterGroups[0].options.some((o) => o.value === f)
                      )
                    if (specialty) setSelectedSpecialty(specialty)
                    setIsFilterOpen(false)
                  }}
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              </div>
            ) : technicians.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Shield className="h-16 w-16 text-gray-300" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Tidak ada teknisi ditemukan
                </h3>
                <p className="mt-2 text-gray-500">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Menampilkan {technicians.length} teknisi
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {technicians.map((tech) => {
                    // Get lowest service price
                    const lowestPrice =
                      tech.services.length > 0
                        ? Math.min(...tech.services.map((s) => s.price))
                        : 0

                    return (
                      <ProductCard
                        key={tech.id}
                        id={tech.id}
                        title={tech.user.name || 'Teknisi'}
                        image={
                          tech.user.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(tech.user.name || 'T')}&background=3b82f6&color=fff&size=400`
                        }
                        description={tech.specialties.join(', ')}
                        rating={tech.rating}
                        reviewCount={tech.totalReview}
                        price={lowestPrice}
                        badge={tech.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                        badgeColor={tech.isAvailable ? 'green' : 'red'}
                        href={`/teknisi/${tech.id}`}
                      />
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  )
}
