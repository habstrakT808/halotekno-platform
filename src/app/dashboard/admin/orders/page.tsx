'use client'

import { useState, useEffect } from 'react'
import {
    Package,
    CheckCircle,
    XCircle,
    Loader2,
    User,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

interface Order {
    id: string
    orderNumber: string
    total: number
    status: string
    createdAt: string
    user: {
        name: string | null
        email: string
        phone: string | null
    }
    items: Array<{
        id: string
        quantity: number
        price: number
        product?: {
            name: string
            images: string[]
        }
        service?: {
            name: string
        }
    }>
}

const statusColors = {
    PENDING_PAYMENT: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    PAID: 'bg-blue-100 text-blue-700 border-blue-200',
    IN_PROGRESS: 'bg-purple-100 text-purple-700 border-purple-200',
    COMPLETED: 'bg-green-100 text-green-700 border-green-200',
    CANCELLED: 'bg-red-100 text-red-700 border-red-200',
}

const statusLabels = {
    PENDING_PAYMENT: 'Menunggu Pembayaran',
    PAID: 'Dibayar',
    IN_PROGRESS: 'Sedang Dikerjakan',
    COMPLETED: 'Selesai',
    CANCELLED: 'Dibatalkan',
}

export default function AdminOrdersPage() {
    const { toast } = useToast()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'service' | 'sparepart'>('all')
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders')
            if (res.ok) {
                const data = await res.json()
                setOrders(data.orders)
            }
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        setUpdating(orderId)
        try {
            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })

            if (res.ok) {
                toast({
                    title: 'Berhasil',
                    description: 'Status pesanan berhasil diupdate',
                })
                fetchOrders()
            } else {
                const error = await res.json()
                toast({
                    title: 'Gagal',
                    description: error.error || 'Gagal update status',
                    variant: 'destructive',
                })
            }
        } catch (error) {
            console.error('Error updating status:', error)
            toast({
                title: 'Error',
                description: 'Terjadi kesalahan',
                variant: 'destructive',
            })
        } finally {
            setUpdating(null)
        }
    }

    const filteredOrders = orders.filter((order) => {
        if (filter === 'all') return true
        const hasProduct = order.items.some((item) => item.product)
        const hasService = order.items.some((item) => item.service)
        if (filter === 'sparepart') return hasProduct
        if (filter === 'service') return hasService
        return true
    })

    const getOrderType = (order: Order) => {
        const hasProduct = order.items.some((item) => item.product)
        return hasProduct ? 'Sparepart' : 'Service'
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="mb-2 text-4xl font-bold text-gray-900">
                    Kelola Pesanan
                </h1>
                <p className="text-lg text-gray-600">
                    Kelola semua pesanan service dan sparepart
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 flex gap-3">
                <button
                    onClick={() => setFilter('all')}
                    className={`rounded-xl px-6 py-3 font-semibold transition-all ${filter === 'all'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    Semua Pesanan
                </button>
                <button
                    onClick={() => setFilter('service')}
                    className={`rounded-xl px-6 py-3 font-semibold transition-all ${filter === 'service'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    Service
                </button>
                <button
                    onClick={() => setFilter('sparepart')}
                    className={`rounded-xl px-6 py-3 font-semibold transition-all ${filter === 'sparepart'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                        }`}
                >
                    Sparepart
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
                        <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <p className="text-xl font-medium text-gray-600">
                            Belum ada pesanan
                        </p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                        >
                            <div className="p-6">
                                {/* Order Header */}
                                <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-6">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {order.orderNumber}
                                            </h3>
                                            <span className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 text-xs font-bold text-white">
                                                {getOrderType(order)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <User className="h-4 w-4" />
                                            <p className="font-medium">
                                                {order.user.name || order.user.email}
                                            </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleString('id-ID', {
                                                dateStyle: 'long',
                                                timeStyle: 'short',
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-600">
                                            Total Pembayaran
                                        </p>
                                        <p className="text-3xl font-bold text-blue-600">
                                            Rp {order.total.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-6 space-y-3">
                                    <h4 className="font-semibold text-gray-900">
                                        Detail Pesanan
                                    </h4>
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 p-4"
                                        >
                                            {item.product?.images[0] && (
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="h-16 w-16 rounded-lg object-cover shadow-md"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">
                                                    {item.product?.name || item.service?.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {item.quantity} x Rp{' '}
                                                    {item.price.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-blue-600">
                                                    Rp{' '}
                                                    {(item.price * item.quantity).toLocaleString(
                                                        'id-ID'
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Status & Actions */}
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <span
                                        className={`rounded-full border-2 px-4 py-2 text-sm font-bold ${statusColors[
                                            order.status as keyof typeof statusColors
                                        ]
                                            }`}
                                    >
                                        {statusLabels[order.status as keyof typeof statusLabels]}
                                    </span>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-2">
                                        {order.status === 'PENDING_PAYMENT' && (
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'PAID')}
                                                disabled={updating === order.id}
                                                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:shadow-xl disabled:opacity-50"
                                            >
                                                {updating === order.id ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    'Konfirmasi Bayar'
                                                )}
                                            </button>
                                        )}
                                        {/* Only for SPAREPART orders */}
                                        {order.status === 'PAID' && getOrderType(order) === 'Sparepart' && (
                                            <button
                                                onClick={() =>
                                                    updateOrderStatus(order.id, 'IN_PROGRESS')
                                                }
                                                disabled={updating === order.id}
                                                className="rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-2.5 font-semibold text-white shadow-lg shadow-purple-200 transition-all hover:shadow-xl disabled:opacity-50"
                                            >
                                                Mulai Proses
                                            </button>
                                        )}
                                        {/* Only for SPAREPART orders */}
                                        {order.status === 'IN_PROGRESS' && getOrderType(order) === 'Sparepart' && (
                                            <button
                                                onClick={() =>
                                                    updateOrderStatus(order.id, 'COMPLETED')
                                                }
                                                disabled={updating === order.id}
                                                className="rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-5 py-2.5 font-semibold text-white shadow-lg shadow-green-200 transition-all hover:shadow-xl disabled:opacity-50"
                                            >
                                                <CheckCircle className="mr-1 inline h-5 w-5" />
                                                Selesaikan
                                            </button>
                                        )}

                                        {/* For SERVICE orders, show info */}
                                        {getOrderType(order) === 'Service' && order.status !== 'PENDING_PAYMENT' && order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
                                            <div className="rounded-lg bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                                                Status dikontrol oleh teknisi
                                            </div>
                                        )}
                                        {order.status !== 'CANCELLED' &&
                                            order.status !== 'COMPLETED' && (
                                                <button
                                                    onClick={() =>
                                                        updateOrderStatus(order.id, 'CANCELLED')
                                                    }
                                                    disabled={updating === order.id}
                                                    className="rounded-lg border-2 border-red-300 bg-white px-5 py-2.5 font-semibold text-red-600 transition-all hover:bg-red-50 disabled:opacity-50"
                                                >
                                                    <XCircle className="mr-1 inline h-5 w-5" />
                                                    Batalkan
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Toaster />
        </div>
    )
}
