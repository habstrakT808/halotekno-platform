'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import CartItem from '@/components/cart/cart-item'
import CartSummary from '@/components/cart/cart-summary'
import { useCartStore } from '@/lib/store/cart-store'
import Link from 'next/link'
import { ShoppingBag, Loader2 } from 'lucide-react'

export default function CartPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const items = useCartStore((state) => state.items)
    const setUserId = useCartStore((state) => state.setUserId)
    const userId = useCartStore((state) => state.userId)

    // Redirect to login if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    // Sync cart with user
    useEffect(() => {
        if (session?.user?.id) {
            // If different user, cart will clear automatically in the store
            if (userId !== session.user.id) {
                setUserId(session.user.id)
            }
        }
    }, [session, userId, setUserId])

    // Show loading while checking auth
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    // Don't render if not authenticated
    if (status === 'unauthenticated') {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40">
            <Navbar variant="light" />

            <main className="pt-24 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                            Keranjang Belanja
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {items.length} item dalam keranjang
                        </p>
                    </div>

                    {items.length === 0 ? (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="mb-6 rounded-full bg-gray-100 p-8">
                                <ShoppingBag className="h-16 w-16 text-gray-400" />
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">
                                Keranjang Kosong
                            </h2>
                            <p className="mb-8 text-gray-600">
                                Belum ada item di keranjang Anda
                            </p>
                            <Link
                                href="/sparepart"
                                className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
                            >
                                Mulai Belanja
                            </Link>
                        </div>
                    ) : (
                        /* Cart Content */
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="space-y-4 lg:col-span-2">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <CartSummary />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer variant="light" />
        </div>
    )
}
