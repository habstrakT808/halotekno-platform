'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Image Counter */}
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {/* Main Image */}
      <div className="relative h-full w-full p-4 sm:p-8">
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="h-full w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Thumbnail Strip (Desktop only) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 sm:flex">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                index === currentIndex
                  ? 'scale-110 border-white'
                  : 'border-white/30 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Touch/Swipe area for mobile */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          const startX = touch.clientX

          const handleTouchMove = (moveEvent: TouchEvent) => {
            const currentX = moveEvent.touches[0].clientX
            const diff = startX - currentX

            if (Math.abs(diff) > 50) {
              if (diff > 0) {
                handleNext()
              } else {
                handlePrevious()
              }
              document.removeEventListener('touchmove', handleTouchMove)
            }
          }

          document.addEventListener('touchmove', handleTouchMove)
          document.addEventListener(
            'touchend',
            () => {
              document.removeEventListener('touchmove', handleTouchMove)
            },
            { once: true }
          )
        }}
      />
    </div>
  )
}
