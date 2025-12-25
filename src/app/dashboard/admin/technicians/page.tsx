'use client'

import { useState, useEffect } from 'react'
import { Users, Store, Shield, Search, Check, X, Eye, Loader2, Star, MapPin, Phone, Mail } from 'lucide-react'
import { toast } from 'sonner'

interface Technician {
    id: string
    name: string | null
    email: string
    phone: string | null
    isActive: boolean
    createdAt: string
}

interface Mitra {
    id: string
    name: string | null
    email: string
    phone: string | null
    mitraStatus: string | null
    isActive: boolean
    createdAt: string
}

export default function TechniciansPage() {
    const [activeTab, setActiveTab] = useState<'technicians' | 'mitra'>('technicians')
    const [technicians, setTechnicians] = useState<Technician[]>([])
    const [mitras, setMitras] = useState<Mitra[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [stats, setStats] = useState({
        totalTechnicians: 0,
        totalMitra: 0,
        pendingMitra: 0,
        activeMitra: 0,
    })

    // Fetch data
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/users?limit=100')
            if (!res.ok) throw new Error('Failed to fetch')

            const text = await res.text()
            if (!text) throw new Error('Empty response')

            const data = JSON.parse(text)
            const users = data.users || []

            // Filter teknisi dan mitra
            const techList = users.filter((u: any) => u.role === 'ADMIN')
            const mitraList = users.filter((u: any) => u.role === 'MITRA')

            setTechnicians(techList)
            setMitras(mitraList)

            setStats({
                totalTechnicians: techList.length,
                totalMitra: mitraList.length,
                pendingMitra: mitraList.filter((m: any) => m.mitraStatus === 'PENDING').length,
                activeMitra: mitraList.filter((m: any) => m.mitraStatus === 'APPROVED' && m.isActive).length,
            })
        } catch (error) {
            console.error('Error fetching data:', error)
            toast.error('Failed to load data')
        } finally {
            setLoading(false)
        }
    }

    // Approve/Reject mitra
    const handleMitraAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mitraStatus: status }),
            })

            if (!res.ok) throw new Error('Failed to update')

            toast.success(`Mitra ${status.toLowerCase()} successfully`)
            fetchData()
        } catch (error) {
            toast.error('Failed to update mitra status')
        }
    }

    // Filter data
    const filteredTechnicians = technicians.filter(
        (t) =>
            t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredMitras = mitras.filter(
        (m) =>
            m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Teknisi & Mitra</h1>
                <p className="mt-2 text-gray-600">Kelola teknisi internal dan mitra bisnis</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Teknisi</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.totalTechnicians}</p>
                        </div>
                        <div className="rounded-xl bg-blue-500 p-3">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Mitra</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.totalMitra}</p>
                        </div>
                        <div className="rounded-xl bg-green-500 p-3">
                            <Store className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pending Approval</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.pendingMitra}</p>
                        </div>
                        <div className="rounded-xl bg-yellow-500 p-3">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Mitra Aktif</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.activeMitra}</p>
                        </div>
                        <div className="rounded-xl bg-cyan-500 p-3">
                            <Store className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('technicians')}
                        className={`rounded-lg px-6 py-2 font-medium transition-all ${activeTab === 'technicians'
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Shield className="mr-2 inline h-5 w-5" />
                        Teknisi ({stats.totalTechnicians})
                    </button>
                    <button
                        onClick={() => setActiveTab('mitra')}
                        className={`rounded-lg px-6 py-2 font-medium transition-all ${activeTab === 'mitra'
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Store className="mr-2 inline h-5 w-5" />
                        Mitra ({stats.totalMitra})
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : activeTab === 'technicians' ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTechnicians.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                            <Shield className="h-12 w-12 text-gray-400" />
                            <p className="mt-4 text-gray-500">No technicians found</p>
                        </div>
                    ) : (
                        filteredTechnicians.map((tech) => (
                            <div
                                key={tech.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                            <Shield className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{tech.name || 'N/A'}</h3>
                                            <p className="text-sm text-gray-500">Teknisi</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${tech.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {tech.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="h-4 w-4" />
                                        {tech.email}
                                    </div>
                                    {tech.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="h-4 w-4" />
                                            {tech.phone}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                        <Eye className="mr-1 inline h-4 w-4" />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredMitras.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-12">
                            <Store className="h-12 w-12 text-gray-400" />
                            <p className="mt-4 text-gray-500">No mitra found</p>
                        </div>
                    ) : (
                        filteredMitras.map((mitra) => (
                            <div
                                key={mitra.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <Store className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{mitra.name || 'N/A'}</h3>
                                            <p className="text-sm text-gray-500">Mitra</p>
                                        </div>
                                    </div>
                                    {mitra.mitraStatus === 'PENDING' && (
                                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                                            Pending
                                        </span>
                                    )}
                                    {mitra.mitraStatus === 'APPROVED' && (
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                            Approved
                                        </span>
                                    )}
                                    {mitra.mitraStatus === 'REJECTED' && (
                                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
                                            Rejected
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="h-4 w-4" />
                                        {mitra.email}
                                    </div>
                                    {mitra.phone && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="h-4 w-4" />
                                            {mitra.phone}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex gap-2">
                                    {mitra.mitraStatus === 'PENDING' ? (
                                        <>
                                            <button
                                                onClick={() => handleMitraAction(mitra.id, 'APPROVED')}
                                                className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                            >
                                                <Check className="mr-1 inline h-4 w-4" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleMitraAction(mitra.id, 'REJECTED')}
                                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                            >
                                                <X className="mr-1 inline h-4 w-4" />
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <button className="flex-1 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                            <Eye className="mr-1 inline h-4 w-4" />
                                            View Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
