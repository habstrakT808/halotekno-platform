'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import type { CartItem } from '@/types/cart'

interface AddToCartButtonProps {
    product: {
        id: string
        name: string
        price: number
        image: string
        type: 'PRODUCT' | 'RENTAL' | 'SERVICE'
        stock?: number
    }
    variant?: 'default' | 'icon'
    className?: string
}

export default function AddToCartButton({
    product,
    variant = 'default',
    className = '',
}: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false)
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = () => {
        const cartItem: Omit<CartItem, 'id'> = {
            type: product.type,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
            stock: product.stock,
            ...(product.type === 'PRODUCT' && { productId: product.id }),
            ...(product.type === 'RENTAL' && { rentalItemId: product.id, rentalDays: 1 }),
            ...(product.type === 'SERVICE' && { serviceId: product.id }),
        }

        addItem(cartItem)
        setIsAdded(true)

        // Reset after 2 seconds
        setTimeout(() => {
            setIsAdded(false)
        }, 2000)
    }

    if (variant === 'icon') {
        return (
            <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`p-2 rounded-full transition-all duration-300 ${isAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } ${className}`}
                aria-label="Add to cart"
            >
                {isAdded ? (
                    <Check className="h-5 w-5" />
                ) : (
                    <ShoppingCart className="h-5 w-5" />
                )}
            </button>
        )
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105'
                } ${className}`}
        >
            {isAdded ? (
                <>
                    <Check className="h-5 w-5" />
                    Ditambahkan!
                </>
            ) : (
                <>
                    <ShoppingCart className="h-5 w-5" />
                    Tambah ke Keranjang
                </>
            )}
        </button>
    )
}
