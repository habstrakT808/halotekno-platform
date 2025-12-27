'use client'

import { useState } from 'react'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import BookingModal from '@/components/rental/booking-modal'

interface RentalActionsProps {
  rentalItem: {
    id: string
    name: string
    pricePerDay: number
    stock: number
    images: string[]
  }
  isAvailable: boolean
}

export default function RentalActions({
  rentalItem,
  isAvailable,
}: RentalActionsProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  if (!isAvailable) {
    return (
      <div className="sticky bottom-0 space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <button
          disabled
          className="w-full cursor-not-allowed rounded-lg bg-gray-300 py-3 text-center font-semibold text-gray-500"
        >
          Tidak Tersedia
        </button>
        <p className="text-center text-xs text-gray-500">
          Hubungi kami untuk informasi lebih lanjut
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="sticky bottom-0 space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        {/* Booking Sekarang - Primary Button */}
        <button
          onClick={() => setShowBookingModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 py-3 font-semibold text-white transition-all hover:shadow-lg"
        >
          <Calendar className="h-5 w-5" />
          Booking Sekarang
        </button>

        {/* Lihat Alat Lainnya - Secondary Button */}
        <Link
          href="/sewa-alat"
          className="block w-full rounded-lg border-2 border-blue-600 py-3 text-center font-semibold text-blue-600 transition-all hover:bg-blue-50"
        >
          Lihat Alat Lainnya
        </Link>

        <p className="text-center text-xs text-gray-500">
          Hubungi kami untuk informasi lebih lanjut
        </p>
      </div>

      {/* Booking Modal */}
      <BookingModal
        rentalItem={{
          id: rentalItem.id,
          name: rentalItem.name,
          pricePerDay: rentalItem.pricePerDay,
          stock: rentalItem.stock,
          image: rentalItem.images[0] || '',
        }}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  )
}
