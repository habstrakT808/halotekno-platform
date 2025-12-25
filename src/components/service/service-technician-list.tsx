'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { SearchBar } from '@/components/catalog/search-bar'
import { FilterSidebar } from '@/components/catalog/filter-sidebar'
import WhatsAppButton from '@/components/shared/whatsapp-button'
import {
    MessageCircle,
    Wrench,
    Settings,
    Star,
    MapPin,
    Filter,
    X,
    ChevronRight,
    Clock
} from 'lucide-react'
import Link from 'next/link'

// Dummy technician data
const technicianData = [
    {
        id: '1',
        name: 'Budi Santoso',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        specialization: 'iPhone & MacBook',
        rating: 4.9,
        reviewCount: 245,
        completedJobs: 500,
        location: 'Jakarta Selatan',
        available: true,
        responseTime: '< 5 menit',
    },
    {
        id: '2',
        name: 'Ahmad Wijaya',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        specialization: 'Samsung & Android',
        rating: 4.8,
        reviewCount: 189,
        completedJobs: 420,
        location: 'Jakarta Barat',
        available: true,
        responseTime: '< 10 menit',
    },
    {
        id: '3',
        name: 'Rizky Pratama',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        specialization: 'Laptop Gaming',
        rating: 4.9,
        reviewCount: 167,
        completedJobs: 380,
        location: 'Jakarta Timur',
        available: false,
        responseTime: '< 15 menit',
    },
    {
        id: '4',
        name: 'Deni Setiawan',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        specialization: 'Tablet & iPad',
        rating: 4.7,
        reviewCount: 134,
        completedJobs: 290,
        location: 'Bandung',
        available: true,
        responseTime: '< 10 menit',
    },
    {
        id: '5',
        name: 'Eko Prasetyo',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
        specialization: 'Xiaomi & Oppo',
        rating: 4.8,
        reviewCount: 201,
        completedJobs: 350,
        location: 'Surabaya',
        available: true,
        responseTime: '< 5 menit',
    },
    {
        id: '6',
        name: 'Fajar Nugroho',
        photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80',
        specialization: 'Recovery Data',
        rating: 4.9,
        reviewCount: 156,
        completedJobs: 280,
        location: 'Yogyakarta',
        available: true,
        responseTime: '< 10 menit',
    },
]

const filterGroups = [
    {
        title: 'Spesialisasi',
        type: 'checkbox' as const,
        options: [
            { value: 'iphone', label: 'iPhone', count: 45 },
            { value: 'samsung', label: 'Samsung', count: 38 },
            { value: 'laptop', label: 'Laptop', count: 28 },
            { value: 'tablet', label: 'Tablet', count: 15 },
            { value: 'xiaomi', label: 'Xiaomi', count: 32 },
        ],
    },
    {
        title: 'Rating',
        type: 'checkbox' as const,
        options: [
            { value: '4.5+', label: '4.5+ ⭐', count: 89 },
            { value: '4.0+', label: '4.0+ ⭐', count: 120 },
        ],
    },
    {
        title: 'Ketersediaan',
        type: 'checkbox' as const,
        options: [
            { value: 'available', label: 'Online Sekarang', count: 65 },
            { value: 'today', label: 'Tersedia Hari Ini', count: 85 },
        ],
    },
]

interface ServicePageProps {
    serviceType: 'konsultasi' | 'cek-bongkar' | 'jasa-servis'
}

export default function ServiceTechnicianList({ serviceType }: ServicePageProps) {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const serviceInfo = {
        'konsultasi': {
            title: 'Konsultasi Servis',
            subtitle: 'Gratis',
            description: 'Chat langsung dengan teknisi untuk konsultasi masalah gadget',
            icon: MessageCircle,
            color: 'green',
            badge: 'Gratis',
        },
        'cek-bongkar': {
            title: 'Jasa Cek/Bongkar',
            subtitle: 'Mulai Rp 50.000',
            description: 'Diagnosa lengkap kondisi gadget oleh teknisi profesional',
            icon: Wrench,
            color: 'orange',
            badge: 'Populer',
        },
        'jasa-servis': {
            title: 'Jasa Servis',
            subtitle: 'Bergaransi',
            description: 'Perbaikan gadget berkualitas dengan garansi',
            icon: Settings,
            color: 'blue',
            badge: 'Bergaransi',
        },
    }

    const currentService = serviceInfo[serviceType]
    const Icon = currentService.icon

    // Filter technicians based on search
    const filteredTechnicians = technicianData.filter(tech =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
            <Navbar variant="light" />

            <main className="pt-24 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                            {currentService.title}
                        </h1>
                        <p className="text-lg text-gray-600">{currentService.description}</p>
                    </div>

                    {/* Service Flow Tabs */}
                    <div className="mb-8 flex flex-wrap gap-2 rounded-xl bg-white p-2 border border-gray-200">
                        <Link
                            href="/konsultasi"
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${serviceType === 'konsultasi'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span className="hidden sm:inline">1.</span> Konsultasi
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-300 self-center" />
                        <Link
                            href="/cek-bongkar"
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${serviceType === 'cek-bongkar'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Wrench className="h-4 w-4" />
                            <span className="hidden sm:inline">2.</span> Cek/Bongkar
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-300 self-center" />
                        <Link
                            href="/jasa-servis"
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${serviceType === 'jasa-servis'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">3.</span> Jasa Servis
                        </Link>
                    </div>

                    {/* Search & Filter */}
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <SearchBar
                            placeholder="Cari teknisi berdasarkan nama, spesialisasi, atau lokasi..."
                            onSearch={setSearchQuery}
                        />
                        <button
                            onClick={() => setMobileFilterOpen(true)}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 md:hidden"
                        >
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>

                    <div className="flex gap-8">
                        {/* Desktop Sidebar */}
                        <div className="hidden w-64 flex-shrink-0 md:block">
                            <FilterSidebar filters={filterGroups} />
                        </div>

                        {/* Mobile Filter Drawer */}
                        {mobileFilterOpen && (
                            <div className="fixed inset-0 z-50 md:hidden">
                                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
                                <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-bold">Filter</h3>
                                        <button onClick={() => setMobileFilterOpen(false)}>
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <FilterSidebar filters={filterGroups} />
                                </div>
                            </div>
                        )}

                        {/* Technician Grid */}
                        <div className="flex-1">
                            <p className="mb-4 text-sm text-gray-600">
                                Menampilkan {filteredTechnicians.length} teknisi untuk {currentService.title}
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredTechnicians.map((tech) => (
                                    <Link
                                        key={tech.id}
                                        href={`/teknisi/${tech.id}?service=${serviceType}`}
                                        className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-lg"
                                    >
                                        <div className="mb-3 flex items-start gap-3">
                                            <img
                                                src={tech.photo}
                                                alt={tech.name}
                                                className="h-14 w-14 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                                                    {tech.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">{tech.specialization}</p>
                                                <div className="mt-1 flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-medium">{tech.rating}</span>
                                                    <span className="text-xs text-gray-500">({tech.reviewCount})</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {tech.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {tech.responseTime}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${tech.available
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {tech.available ? '🟢 Online' : '⚫ Offline'}
                                            </span>
                                            <span className="text-sm font-medium text-blue-600">
                                                {serviceType === 'konsultasi' ? 'Mulai Chat' : 'Pilih Teknisi'}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <WhatsAppButton variant="fixed" />
            <Footer variant="light" />
        </div>
    )
}
