'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Clock, Phone, Mail, Globe, MessageCircle, Navigation, Share2, Heart } from 'lucide-react'

// Dummy data (same as list page)
const DUMMY_MITRAS = [
    {
        id: '1',
        name: 'TechCare Pro Service',
        tagline: 'Solusi Teknologi Terpercaya Anda',
        description: 'TechCare Pro Service adalah pusat servis teknologi terpercaya dengan pengalaman lebih dari 10 tahun. Kami menyediakan layanan perbaikan laptop, komputer, dan gadget dengan teknisi berpengalaman dan bersertifikat. Komitmen kami adalah memberikan layanan terbaik dengan harga yang kompetitif dan garansi resmi.',
        city: 'Jakarta Selatan',
        address: 'Jl. Fatmawati No. 123, Cilandak, Jakarta Selatan 12410',
        rating: 4.9,
        reviewCount: 156,
        services: [
            { name: 'Servis Laptop', price: 'Mulai dari Rp 150.000', icon: '💻' },
            { name: 'Servis PC', price: 'Mulai dari Rp 200.000', icon: '🖥️' },
            { name: 'Upgrade Hardware', price: 'Mulai dari Rp 100.000', icon: '⚡' },
            { name: 'Data Recovery', price: 'Mulai dari Rp 500.000', icon: '💾' },
            { name: 'Instalasi Software', price: 'Mulai dari Rp 50.000', icon: '📀' },
            { name: 'Cleaning Service', price: 'Mulai dari Rp 75.000', icon: '🧹' },
        ],
        banner: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80',
        gallery: [
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
            'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
            'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        ],
        phone: '+62 812-3456-7890',
        email: 'info@techcarepro.com',
        website: 'www.techcarepro.com',
        hours: {
            weekday: 'Senin - Sabtu: 09:00 - 20:00',
            weekend: 'Minggu: Tutup',
        },
        features: [
            'Garansi Resmi 30 Hari',
            'Teknisi Bersertifikat',
            'Spare Part Original',
            'Free Konsultasi',
            'Home Service Available',
            'Express Service',
        ],
        reviews: [
            { name: 'Ahmad Rizki', rating: 5, comment: 'Pelayanan sangat memuaskan! Laptop saya yang rusak parah bisa diperbaiki dengan cepat.', date: '2 hari yang lalu' },
            { name: 'Siti Nurhaliza', rating: 5, comment: 'Teknisinya profesional dan ramah. Harga juga sangat terjangkau.', date: '1 minggu yang lalu' },
            { name: 'Budi Santoso', rating: 4, comment: 'Bagus, cuma agak lama nunggu antriannya. Tapi hasilnya memuaskan.', date: '2 minggu yang lalu' },
        ],
    },
    // Add other mitras here if needed for navigation
]

export default function MitraDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const mitra = DUMMY_MITRAS.find((m) => m.id === id) || DUMMY_MITRAS[0]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Full Screen */}
            <div className="relative h-screen">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={mitra.banner}
                        alt={mitra.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col">
                    {/* Back Button */}
                    <div className="p-6">
                        <Link
                            href="/rekomendasi"
                            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-md transition-all hover:bg-white/30"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            Kembali
                        </Link>
                    </div>

                    {/* Hero Content */}
                    <div className="flex flex-1 items-center justify-center px-6">
                        <div className="max-w-4xl text-center text-white">
                            <div className="mb-4 flex items-center justify-center gap-2">
                                <div className="flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-lg font-bold">{mitra.rating}</span>
                                    <span className="text-sm opacity-90">({mitra.reviewCount} ulasan)</span>
                                </div>
                            </div>

                            <h1 className="mb-4 text-5xl font-bold md:text-7xl">
                                {mitra.name}
                            </h1>

                            <p className="mb-6 text-xl text-gray-200 md:text-2xl">
                                {mitra.tagline}
                            </p>

                            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-lg">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    {mitra.city}
                                </div>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Buka Hari Ini
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href={`https://wa.me/${mitra.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 font-semibold text-white shadow-2xl transition-all hover:bg-green-700 hover:scale-105"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    WhatsApp
                                </a>
                                <a
                                    href={`tel:${mitra.phone}`}
                                    className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-2xl transition-all hover:bg-blue-700 hover:scale-105"
                                >
                                    <Phone className="h-5 w-5" />
                                    Telepon
                                </a>
                                <button className="flex items-center gap-2 rounded-full bg-white/20 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/30">
                                    <Navigation className="h-5 w-5" />
                                    Petunjuk Arah
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="pb-8 text-center">
                        <div className="inline-flex flex-col items-center gap-2 text-white">
                            <span className="text-sm">Scroll untuk info lebih lanjut</span>
                            <div className="h-8 w-5 rounded-full border-2 border-white p-1">
                                <div className="h-2 w-1 animate-bounce rounded-full bg-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Content Sections */}
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

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
                    {/* About Section */}
                    <section className="mb-16">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Tentang Kami</h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            {mitra.description}
                        </p>
                    </section>

                    {/* Features Grid */}
                    <section className="mb-16">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Keunggulan Kami</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {mitra.features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                                        ✓
                                    </div>
                                    <span className="font-medium text-gray-900">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Services */}
                    <section className="mb-16">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Layanan Kami</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {mitra.services.map((service) => (
                                <div
                                    key={service.name}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                                >
                                    <div className="mb-3 text-4xl">{service.icon}</div>
                                    <h3 className="mb-2 text-lg font-bold text-gray-900">{service.name}</h3>
                                    <p className="text-sm text-blue-600">{service.price}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Gallery */}
                    <section className="mb-16">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Galeri</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {mitra.gallery.map((image, index) => (
                                <div key={index} className="overflow-hidden rounded-2xl">
                                    <img
                                        src={image}
                                        alt={`Gallery ${index + 1}`}
                                        className="h-48 w-full object-cover transition-transform hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section className="mb-16">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Informasi Kontak</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Alamat</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 flex-shrink-0 text-blue-600" />
                                        <span className="text-gray-700">{mitra.address}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-blue-600" />
                                        <span className="text-gray-700">{mitra.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-blue-600" />
                                        <span className="text-gray-700">{mitra.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="h-5 w-5 text-blue-600" />
                                        <span className="text-gray-700">{mitra.website}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Jam Operasional</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-green-600" />
                                        <span className="text-gray-700">{mitra.hours.weekday}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-700">{mitra.hours.weekend}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reviews */}
                    <section>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Ulasan Pelanggan</h2>
                        <div className="space-y-4">
                            {mitra.reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-200 bg-white p-6"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">{review.name}</p>
                                            <p className="text-sm text-gray-500">{review.date}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
