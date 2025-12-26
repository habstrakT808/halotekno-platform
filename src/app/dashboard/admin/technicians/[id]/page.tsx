'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    ArrowLeft,
    Star,
    Award,
    DollarSign,
    ShoppingBag,
    Mail,
    Phone,
    MapPin,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Loader2,
    User,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface TechnicianDetail {
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
        email: string
        image: string | null
        phone: string | null
        address: string | null
        isActive: boolean
    }
    services: Array<{
        id: string
        name: string
        description: string | null
        category: string
        price: number
        duration: number
        isActive: boolean
    }>
    _count: {
        services: number
        orders: number
    }
}

interface Stats {
    totalOrders: number
    completedOrders: number
    totalRevenue: number
    averageRating: number
    totalReviews: number
}

export default function TechnicianDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const router = useRouter()
    const [technician, setTechnician] = useState<TechnicianDetail | null>(null)
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

    useEffect(() => {
        params.then(setResolvedParams)
    }, [params])

    useEffect(() => {
        if (resolvedParams) {
            fetchTechnician()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedParams])

    const fetchTechnician = async () => {
        if (!resolvedParams) return

        setLoading(true)
        try {
            const [techRes, statsRes] = await Promise.all([
                fetch(`/api/admin/technicians/${resolvedParams.id}`),
                fetch(`/api/admin/technicians/${resolvedParams.id}/stats`),
            ])

            if (!techRes.ok) throw new Error('Failed to fetch technician')

            const techData = await techRes.json()
            setTechnician(techData)

            if (statsRes.ok) {
                const statsData = await statsRes.json()
                setStats(statsData)
            }
        } catch (error) {
            console.error('Error fetching technician:', error)
            toast.error('Failed to load technician details')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!technician) return

        if (
            !confirm(
                `Are you sure you want to delete technician "${technician.user.name}"? This will set the user as inactive.`
            )
        ) {
            return
        }

        try {
            const res = await fetch(`/api/admin/technicians/${technician.id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete')

            toast.success('Technician deleted successfully')
            router.push('/dashboard/admin/technicians')
        } catch (error) {
            console.error('Error deleting technician:', error)
            toast.error('Failed to delete technician')
        }
    }

    const handleToggleStatus = async () => {
        if (!technician) return

        try {
            const res = await fetch(`/api/admin/technicians/${technician.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isAvailable: !technician.isAvailable }),
            })

            if (!res.ok) throw new Error('Failed to update')

            toast.success('Status updated successfully')
            fetchTechnician()
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Failed to update status')
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    if (!technician) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <User className="h-16 w-16 text-gray-300" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    Technician not found
                </h2>
                <Link
                    href="/dashboard/admin/technicians"
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Back to technicians list
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pb-12">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-8 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href="/dashboard/admin/technicians"
                        className="mb-4 inline-flex items-center gap-2 text-white/90 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Technicians
                    </Link>

                    <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-4">
                            {technician.user.image ? (
                                <img
                                    src={technician.user.image}
                                    alt={technician.user.name || 'Technician'}
                                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                                />
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/20 shadow-lg">
                                    <User className="h-12 w-12 text-white" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {technician.user.name || 'N/A'}
                                </h1>
                                <p className="mt-1 text-white/90">
                                    {technician.experience} tahun pengalaman
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${technician.isAvailable
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-500 text-white'
                                            }`}
                                    >
                                        {technician.isAvailable ? 'Available' : 'Unavailable'}
                                    </span>
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${technician.user.isActive
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-red-500 text-white'
                                            }`}
                                    >
                                        {technician.user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleToggleStatus}
                                className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30"
                            >
                                {technician.isAvailable ? (
                                    <>
                                        <XCircle className="mr-1 inline h-4 w-4" />
                                        Set Unavailable
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="mr-1 inline h-4 w-4" />
                                        Set Available
                                    </>
                                )}
                            </button>
                            <Link
                                href={`/dashboard/admin/technicians/${technician.id}/edit`}
                                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-white/90"
                            >
                                <Edit className="mr-1 inline h-4 w-4" />
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                            >
                                <Trash2 className="mr-1 inline h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Stats Grid */}
                <div className="mt-6 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <p className="mt-1 text-3xl font-bold text-gray-900">
                                    {stats?.totalOrders || technician._count.orders}
                                </p>
                            </div>
                            <div className="rounded-xl bg-blue-500 p-3">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <p className="mt-1 text-3xl font-bold text-gray-900">
                                    Rp {((stats?.totalRevenue || 0) / 1000).toFixed(0)}K
                                </p>
                            </div>
                            <div className="rounded-xl bg-green-500 p-3">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Rating</p>
                                <p className="mt-1 text-3xl font-bold text-gray-900">
                                    {stats?.averageRating?.toFixed(1) || technician.rating.toFixed(1)}
                                </p>
                            </div>
                            <div className="rounded-xl bg-yellow-500 p-3">
                                <Star className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Reviews</p>
                                <p className="mt-1 text-3xl font-bold text-gray-900">
                                    {stats?.totalReviews || technician.totalReview}
                                </p>
                            </div>
                            <div className="rounded-xl bg-purple-500 p-3">
                                <Award className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Bio */}
                        {technician.bio && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-xl font-bold text-gray-900">Bio</h2>
                                <p className="text-gray-700">{technician.bio}</p>
                            </div>
                        )}

                        {/* Services */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Services ({technician.services.length})
                            </h2>
                            <div className="space-y-3">
                                {technician.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">
                                                {service.name}
                                            </h3>
                                            {service.description && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {service.description}
                                                </p>
                                            )}
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                                                    {service.category}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {service.duration} min
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4 text-right">
                                            <p className="text-lg font-bold text-blue-600">
                                                Rp {service.price.toLocaleString('id-ID')}
                                            </p>
                                            <span
                                                className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${service.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {service.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {technician.services.length === 0 && (
                                    <p className="text-center text-gray-500">No services yet</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Contact Information
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <span className="text-sm">{technician.user.email}</span>
                                </div>
                                {technician.user.phone && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                        <span className="text-sm">{technician.user.phone}</span>
                                    </div>
                                )}
                                {technician.user.address && (
                                    <div className="flex items-start gap-3 text-gray-700">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                        <span className="text-sm">{technician.user.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Specialties
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {technician.specialties.map((spec, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-sm font-medium text-white"
                                    >
                                        {spec}
                                    </span>
                                ))}
                                {technician.specialties.length === 0 && (
                                    <p className="text-sm text-gray-500">No specialties listed</p>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                Quick Stats
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Total Services</span>
                                    <span className="font-semibold text-gray-900">
                                        {technician._count.services}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Total Orders</span>
                                    <span className="font-semibold text-gray-900">
                                        {technician._count.orders}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Experience</span>
                                    <span className="font-semibold text-gray-900">
                                        {technician.experience} years
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
