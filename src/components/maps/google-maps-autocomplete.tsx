'use client'

import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import { useState, useRef } from 'react'
import { MapPin, Loader2 } from 'lucide-react'

const libraries: 'places'[] = ['places']

interface GoogleMapsAutocompleteProps {
  onPlaceSelected: (place: {
    address: string
    city: string
    province: string
    latitude: number
    longitude: number
  }) => void
  defaultValue?: string
  placeholder?: string
}

export default function GoogleMapsAutocomplete({
  onPlaceSelected,
  defaultValue = '',
  placeholder = 'Cari alamat...',
}: GoogleMapsAutocompleteProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance)
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()

      if (!place.geometry || !place.geometry.location) {
        console.error('No geometry found for this place')
        return
      }

      // Extract address components
      const address = place.formatted_address || ''
      let city = ''
      let province = ''

      place.address_components?.forEach((component) => {
        const types = component.types

        if (
          types.includes('locality') ||
          types.includes('administrative_area_level_2')
        ) {
          city = component.long_name
        }

        if (types.includes('administrative_area_level_1')) {
          province = component.long_name
        }
      })

      const latitude = place.geometry.location.lat()
      const longitude = place.geometry.location.lng()

      onPlaceSelected({
        address,
        city,
        province,
        latitude,
        longitude,
      })
    }
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-600">
          Error loading Google Maps. Please check your API key.
        </p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        <span className="text-sm text-gray-500">Loading maps...</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: 'id' }, // Restrict to Indonesia
          fields: ['address_components', 'formatted_address', 'geometry'],
        }}
      >
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Autocomplete>
    </div>
  )
}
