'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function EditTechnicianPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    bio: '',
    experience: 0,
    specialties: [] as string[],
    isAvailable: true,
  })

  useEffect(() => {
    fetchTechnician()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTechnician = async () => {
    try {
      const res = await fetch(`/api/admin/technicians/${resolvedParams.id}`)
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setFormData({
        bio: data.bio || '',
        experience: data.experience,
        specialties: data.specialties,
        isAvailable: data.isAvailable,
      })
    } catch (error) {
      console.error('Error loading technician data:', error)
      toast.error('Failed to load technician data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/technicians/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to update')
      }

      toast.success('Technician updated successfully')
      router.push('/dashboard/admin/technicians')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update technician')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard/admin/technicians"
          className="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Technicians
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Teknisi</h1>
        <p className="mt-2 text-gray-600">Update technician profile</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience (years)
            </label>
            <input
              type="number"
              min="0"
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: parseInt(e.target.value),
                })
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specialties
            </label>
            <input
              type="text"
              value={formData.specialties.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specialties: e.target.value.split(',').map((s) => s.trim()),
                })
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="LCD, Mesin, Software"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({ ...formData, isAvailable: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-medium text-gray-700"
            >
              Available for service
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-medium text-white shadow-lg disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <Link
              href="/dashboard/admin/technicians"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
