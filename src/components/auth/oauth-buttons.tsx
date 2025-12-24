'use client'

import { signIn } from 'next-auth/react'
import { Chrome } from 'lucide-react'
import { useState } from 'react'

export function OAuthButtons() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('OAuth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex w-full transform items-center justify-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Chrome className="h-5 w-5" />
        {isLoading ? 'Loading...' : 'Continue with Google'}
      </button>
    </div>
  )
}
