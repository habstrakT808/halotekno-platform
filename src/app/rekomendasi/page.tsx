'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Star, Clock, Phone, Filter, ChevronDown } from 'lucide-react'

// Dummy data
const DUMMY_MITRAS = [
    {
        id: '1',
        name: 'TechCare Pro Service',
        description: 'Spesialis servis laptop, komputer, dan gadget dengan teknisi berpengalaman 10+ tahun',
        city: 'Jakarta Selatan',
        address: 'Jl. Fatmawati No. 123, Cilandak',
        rating: 4.9,
        reviewCount: 156,
        services: ['Servis Laptop', 'Servis PC', 'Upgrade Hardware', 'Data Recovery'],
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
        phone: '+62 812-3456-7890',
        hours: 'Sen-Sab: 09:00 - 20:00',
        distance: '2.5 km',
    },
    {
        id: '2',
        name: 'Smartphone Clinic',
        description: 'Ahli perbaikan smartphone semua merk dengan garansi resmi dan spare part original',
        city: 'Jakarta Pusat',
        address: 'Plaza Indonesia, Lt. 3 No. 45',
        rating: 4.8,
        reviewCount: 203,
        services: ['Servis iPhone', 'Servis Android', 'Ganti LCD', 'Ganti Baterai'],
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
        phone: '+62 813-4567-8901',
        hours: 'Setiap Hari: 10:00 - 21:00',
        distance: '5.1 km',
    },
    {
        id: '3',
        name: 'Gadget Hospital Bandung',
        description: 'Pusat servis gadget terpercaya di Bandung dengan layanan express dan home service',
        city: 'Bandung',
        address: 'Jl. Dago No. 88, Coblong',
        rating: 4.7,
        reviewCount: 89,
        services: ['Servis Tablet', 'Servis Laptop', 'Instalasi Software', 'Cleaning Service'],
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
        phone: '+62 822-3456-7890',
        hours: 'Sen-Jum: 08:00 - 18:00',
        distance: '45.2 km',
    },
    {
        id: '4',
        name: 'Computer Repair Center',
        description: 'Solusi lengkap untuk semua masalah komputer dan jaringan kantor Anda',
        city: 'Surabaya',
        address: 'Jl. HR Muhammad No. 234, Gubeng',
        rating: 4.6,
        reviewCount: 124,
        services: ['Servis PC', 'Instalasi Jaringan', 'Server Maintenance', 'CCTV Installation'],
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
        phone: '+62 831-2345-6789',
        hours: 'Sen-Sab: 08:30 - 17:30',
        distance: '650 km',
    },
    {
        id: '5',
        name: 'iRepair Station',
        description: 'Authorized service center untuk produk Apple dengan teknisi bersertifikat',
        city: 'Jakarta Barat',
        address: 'Mall Taman Anggrek, Lt. 2 No. 12',
        rating: 4.9,
        reviewCount: 312,
        services: ['Servis MacBook', 'Servis iPhone', 'Servis iPad', 'Servis Apple Watch'],
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        phone: '+62 812-9876-5432',
        hours: 'Setiap Hari: 10:00 - 22:00',
        distance: '8.3 km',
    },
    {
        id: '6',
        name: 'Gaming PC Specialist',
        description: 'Rakit PC gaming custom, upgrade, dan maintenance dengan performa maksimal',
        city: 'Tangerang',
        address: 'Jl. BSD Raya No. 456, Serpong',
        rating: 4.8,
        reviewCount: 167,
        services: ['Rakit PC Gaming', 'Upgrade PC', 'Overclocking', 'Custom Water Cooling'],
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80',
        phone: '+62 821-5678-9012',
        hours: 'Sen-Sab: 09:00 - 19:00',
        distance: '15.7 km',
    },
]

const CITIES = ['Semua Kota', 'Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat', 'Bandung', 'Surabaya', 'Tangerang']
const SERVICE_TYPES = ['Semua Layanan', 'Servis Laptop', 'Servis PC', 'Servis iPhone', 'Servis Android', 'Upgrade Hardware']

export default function RekomendasiPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCity, setSelectedCity] = useState('Semua Kota')
    const [selectedService, setSelectedService] = useState('Semua Layanan')
    const [showFilters, setShowFilters] = useState(false)

    const filteredMitras = DUMMY_MITRAS.filter((mitra) => {
        const matchesSearch = mitra.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mitra.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCity = selectedCity === 'Semua Kota' || mitra.city === selectedCity
        const matchesService = selectedService === 'Semua Layanan' || mitra.services.includes(selectedService)
        return matchesSearch && matchesCity && matchesService
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 px-4 py-16 text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

                <div className="relative mx-auto max-w-7xl">
                    <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
                        Temukan Mitra Terpercaya
                    </h1>
                    <p className="mb-8 text-center text-lg text-blue-100 md:text-xl">
                        Rekomendasi toko servis gadget dan komputer terbaik di Indonesia
                    </p>

                    {/* Search Bar */}
                    <div className="mx-auto max-w-3xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nama toko atau layanan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content with Background */}
            <div className="relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
                        alt="Background"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
                    {/* Filters */}
                    <div className="mb-6 flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <Filter className="h-5 w-5" />
                            Filter
                            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>

                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            {CITIES.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            {SERVICE_TYPES.map((service) => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>

                        <div className="ml-auto text-sm text-gray-600">
                            {filteredMitras.length} mitra ditemukan
                        </div>
                    </div>

                    {/* Mitra Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredMitras.map((mitra) => (
                            <Link
                                key={mitra.id}
                                href={`/rekomendasi/${mitra.id}`}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-2xl hover:-translate-y-1"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={mitra.image}
                                        alt={mitra.name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1 shadow-lg">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">{mitra.rating}</span>
                                        <span className="text-sm text-gray-500">({mitra.reviewCount})</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                                        {mitra.name}
                                    </h3>

                                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                                        {mitra.description}
                                    </p>

                                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                        <span>{mitra.city} • {mitra.distance}</span>
                                    </div>

                                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4 text-green-600" />
                                        <span>{mitra.hours}</span>
                                    </div>

                                    {/* Services Tags */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {mitra.services.slice(0, 3).map((service) => (
                                            <span
                                                key={service}
                                                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                        {mitra.services.length > 3 && (
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                +{mitra.services.length - 3} lainnya
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{mitra.phone}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredMitras.length === 0 && (
                        <div className="py-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">Tidak ada mitra ditemukan</h3>
                            <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
