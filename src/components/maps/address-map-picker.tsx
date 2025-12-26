'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { MapPin, Loader2, Navigation } from 'lucide-react'

interface AddressMapPickerProps {
    onLocationSelect: (lat: number, lng: number, address?: string) => void
    initialLat?: number
    initialLng?: number
    height?: string
}

const mapContainerStyle = {
    width: '100%',
    height: '400px',
}

const defaultCenter = {
    lat: -6.2088, // Jakarta
    lng: 106.8456,
}

export default function AddressMapPicker({
    onLocationSelect,
    initialLat,
    initialLng,
    height = '400px',
}: AddressMapPickerProps) {
    const [selectedPosition, setSelectedPosition] = useState<{
        lat: number
        lng: number
    } | null>(
        initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null
    )
    const [mapCenter, setMapCenter] = useState(
        initialLat && initialLng
            ? { lat: initialLat, lng: initialLng }
            : defaultCenter
    )
    const [loading, setLoading] = useState(false)
    const mapRef = useRef<google.maps.Map | null>(null)

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

    // Update map when coordinates change from parent
    useEffect(() => {
        if (initialLat && initialLng) {
            const newCenter = { lat: initialLat, lng: initialLng }
            setMapCenter(newCenter)
            setSelectedPosition(newCenter)
        }
    }, [initialLat, initialLng])

    // Get current location
    const handleGetCurrentLocation = useCallback(() => {
        setLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    setMapCenter(pos)
                    setSelectedPosition(pos)
                    onLocationSelect(pos.lat, pos.lng)
                    setLoading(false)
                },
                () => {
                    setLoading(false)
                    alert('Tidak dapat mengakses lokasi Anda')
                }
            )
        } else {
            setLoading(false)
            alert('Browser Anda tidak mendukung geolocation')
        }
    }, [onLocationSelect])

    // Handle map click
    const handleMapClick = useCallback(
        (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
                const lat = e.latLng.lat()
                const lng = e.latLng.lng()
                setSelectedPosition({ lat, lng })
                onLocationSelect(lat, lng)

                // Reverse geocode to get address
                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        onLocationSelect(lat, lng, results[0].formatted_address)
                    }
                })
            }
        },
        [onLocationSelect]
    )

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map
    }, [])

    if (!apiKey) {
        return (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                    <p className="text-sm text-gray-500">
                        Google Maps API Key tidak ditemukan
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Tambahkan NEXT_PUBLIC_GOOGLE_MAPS_API_KEY di .env
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Klik pada peta untuk menandai lokasi Anda
                </p>
                <button
                    onClick={handleGetCurrentLocation}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Navigation className="h-4 w-4" />
                    )}
                    Lokasi Saya
                </button>
            </div>

            <div
                className="overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm"
                style={{ height }}
            >
                <GoogleMap
                    mapContainerStyle={{ ...mapContainerStyle, height }}
                    center={mapCenter}
                    zoom={15}
                    onClick={handleMapClick}
                    onLoad={onLoad}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: true,
                        zoomControl: true,
                    }}
                >
                    {selectedPosition && (
                        <Marker
                            position={selectedPosition}
                            animation={google.maps.Animation.DROP}
                        />
                    )}
                </GoogleMap>
            </div>

            {selectedPosition && (
                <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-sm font-medium text-blue-900">
                        📍 Lokasi Terpilih
                    </p>
                    <p className="mt-1 text-xs text-blue-700">
                        Lat: {selectedPosition.lat.toFixed(6)}, Lng:{' '}
                        {selectedPosition.lng.toFixed(6)}
                    </p>
                </div>
            )}
        </div>
    )
}
