'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'

export default function CartSummary() {
    const items = useCartStore((state) => state.items)

    // Calculate summary from items
    const subtotal = items.reduce((total, item) => {
        const itemPrice = item.rentalDays
            ? item.price * item.rentalDays * item.quantity
            : item.price * item.quantity
        return total + itemPrice
    }, 0)

    const tax = subtotal * 0.11 // 11% PPN
    const total = subtotal + tax
    const itemCount = items.reduce((count, item) => count + item.quantity, 0)

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Ringkasan Pesanan</h2>

            <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} item)</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>Pajak (PPN 11%)</span>
                    <span>Rp {tax.toLocaleString('id-ID')}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-blue-600">
                            Rp {total.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>
            </div>

            <Link
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 py-3 text-center font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
            >
                Lanjut ke Checkout
            </Link>

            <p className="mt-4 text-center text-xs text-gray-500">
                Harga sudah termasuk PPN 11%
            </p>
        </div>
    )
}
