'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface ImageGalleryProps {
    images: string[]
    productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const selectImage = (index: number) => {
        setCurrentIndex(index)
    }

    const openFullscreen = () => {
        setIsFullscreen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeFullscreen = () => {
        setIsFullscreen(false)
        document.body.style.overflow = ''
    }

    return (
        <>
            <div className="space-y-4">
                {/* Main Image Container */}
                <div className="relative group">
                    {/* Main Image */}
                    <div
                        className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in"
                        onClick={openFullscreen}
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`${productName} - Image ${currentIndex + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Zoom Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 group-hover:bg-black/10 group-hover:opacity-100 transition-all duration-300">
                            <ZoomIn className="h-10 w-10 text-white drop-shadow-lg" />
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white hover:scale-110"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-6 w-6 text-gray-700" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:bg-white hover:scale-110"
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-6 w-6 text-gray-700" />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 sm:gap-3">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => selectImage(index)}
                                className={`relative aspect-square overflow-hidden rounded-lg transition-all ${index === currentIndex
                                        ? 'ring-2 ring-blue-500 ring-offset-2'
                                        : 'border-2 border-gray-200 hover:border-blue-400'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
                    onClick={closeFullscreen}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeFullscreen}
                        className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                        aria-label="Close fullscreen"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    {/* Fullscreen Image */}
                    <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={images[currentIndex]}
                            alt={`${productName} - Fullscreen`}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                        />

                        {/* Fullscreen Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Fullscreen Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-white">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}

                    {/* Fullscreen Thumbnails */}
                    {images.length > 1 && (
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.stopPropagation(); selectImage(index); }}
                                    className={`h-16 w-16 overflow-hidden rounded-lg transition-all ${index === currentIndex
                                            ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                                            : 'opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
