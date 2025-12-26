'use client'

import { use, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import ChatWindow from '@/components/chat/chat-window-new'
import { Loader2, Star, Award, MessageCircle, Mail, Phone } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface ChatRoom {
    id: string
    customer: {
        id: string
        name: string | null
        image: string | null
        email: string
        phone: string | null
    }
    technician: {
        id: string
        rating: number
        totalReview: number
        experience: number
        specialties: string[]
        user: {
            name: string | null
            image: string | null
            email: string
            phone: string | null
        }
    }
}

export default function ChatRoomPage({
    params,
}: {
    params: Promise<{ roomId: string }>
}) {
    const resolvedParams = use(params)
    const router = useRouter()
    const { data: session, status } = useSession()
    const [room, setRoom] = useState<ChatRoom | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchRoom = useCallback(async () => {
        try {
            const res = await fetch(`/api/chat/rooms`)
            if (res.ok) {
                const data = await res.json()
                const foundRoom = data.rooms?.find(
                    (r: ChatRoom) => r.id === resolvedParams.roomId
                )
                if (foundRoom) {
                    setRoom(foundRoom)
                } else {
                    router.push('/chat')
                }
            }
        } catch (error) {
            console.error('Error fetching room:', error)
        } finally {
            setLoading(false)
        }
    }, [resolvedParams.roomId, router])

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        } else if (status === 'authenticated') {
            fetchRoom()
        }
    }, [status, router, fetchRoom])

    if (loading || status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
                    <p className="mt-4 text-gray-600">Memuat percakapan...</p>
                </div>
            </div>
        )
    }

    if (!room || !session?.user) {
        return null
    }

    // Determine if current user is the customer or technician
    const isCustomer = room.customer?.id === session.user.id
    const isTechnician = !isCustomer

    // Get other user info
    let otherUser
    let otherUserDetails

    if (isCustomer) {
        // Customer view - show technician info
        otherUser = room.technician?.user || null
        otherUserDetails = room.technician || null
    } else {
        // Technician view - show customer info
        otherUser = room.customer || null
        otherUserDetails = room.customer || null
    }


    if (!otherUser) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Error: Unable to load chat data</p>
            </div>
        )
    }

    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                <Navbar variant="light" />
                <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-6 pt-28">
                    <div className="h-[calc(100vh-10rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                        <div className="flex h-full">
                            {/* Sidebar */}
                            <div className="w-80 border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                                <div className="flex h-full flex-col">
                                    <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="relative">
                                                <img
                                                    src={otherUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name || 'U')}&background=fff&color=3b82f6&size=200`}
                                                    alt={otherUser.name || 'User'}
                                                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                                                />
                                                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-4 border-white bg-green-500"></div>
                                            </div>
                                            <h2 className="mt-4 text-xl font-bold text-white">{otherUser.name || 'User'}</h2>
                                            <p className="text-sm text-blue-100">{isTechnician ? 'Customer' : 'Teknisi'}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                        <div>
                                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                <MessageCircle className="h-4 w-4 text-blue-600" />
                                                Informasi Kontak
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                                                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-gray-500">Email</p>
                                                        <p className="truncate text-sm font-medium text-gray-900">{otherUser.email}</p>
                                                    </div>
                                                </div>
                                                {otherUser.phone && (
                                                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                                                        <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs text-gray-500">Telepon</p>
                                                            <p className="text-sm font-medium text-gray-900">{otherUser.phone}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {!isTechnician && 'rating' in otherUserDetails && (
                                            <>
                                                <div>
                                                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                        <Star className="h-4 w-4 text-yellow-500" />
                                                        Rating & Review
                                                    </h3>
                                                    <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                                                            <span className="text-2xl font-bold text-gray-900">{otherUserDetails.rating.toFixed(1)}</span>
                                                        </div>
                                                        <p className="mt-1 text-center text-sm text-gray-600">{otherUserDetails.totalReview} review</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                                                        <Award className="h-4 w-4 text-blue-600" />
                                                        Pengalaman
                                                    </h3>
                                                    <div className="rounded-lg bg-blue-50 p-4">
                                                        <p className="text-center text-2xl font-bold text-blue-600">{otherUserDetails.experience}</p>
                                                        <p className="mt-1 text-center text-sm text-gray-600">Tahun Pengalaman</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <ChatWindow
                                    roomId={resolvedParams.roomId}
                                    currentUserId={session.user.id!}
                                    otherUserName={otherUser.name || 'User'}
                                    otherUserImage={otherUser.image}
                                />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer variant="light" />
            </div>

            {/* Mobile View - Full Screen */}
            <div className="lg:hidden h-screen flex flex-col bg-white">
                <ChatWindow
                    roomId={resolvedParams.roomId}
                    currentUserId={session.user.id!}
                    otherUserName={otherUser.name || 'User'}
                    otherUserImage={otherUser.image}
                />
            </div>
        </>
    )
}
