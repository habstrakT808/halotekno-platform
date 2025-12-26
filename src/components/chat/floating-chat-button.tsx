'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface ChatRoom {
    id: string
    lastMessageAt: string
    customer?: {
        id: string
        name: string | null
        image: string | null
    }
    technician?: {
        id: string
        user: {
            name: string | null
            image: string | null
        }
    }
    messages: Array<{
        content: string
        createdAt: string
    }>
    _count: {
        messages: number
    }
}

export default function FloatingChatButton() {
    const { status } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [rooms, setRooms] = useState<ChatRoom[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen && status === 'authenticated') {
            fetchRooms()
        }
    }, [isOpen, status])

    const fetchRooms = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/chat/rooms')
            if (res.ok) {
                const data = await res.json()
                setRooms(data.rooms || [])
            }
        } catch (error) {
            console.error('Error fetching rooms:', error)
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'Baru saja'
        if (diffMins < 60) return `${diffMins}m yang lalu`
        if (diffHours < 24) return `${diffHours}h yang lalu`
        if (diffDays < 7) return `${diffDays}d yang lalu`
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
    }

    const handleClick = () => {
        if (status === 'unauthenticated') {
            window.location.href = '/login'
        } else {
            setIsOpen(!isOpen)
        }
    }

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={handleClick}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-110"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageCircle className="h-6 w-6" />
                )}
            </button>

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-gray-200 bg-white shadow-2xl">
                    {/* Header */}
                    <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-4">
                        <h3 className="text-lg font-bold text-white">Chat Saya</h3>
                        <p className="text-sm text-blue-100">
                            {rooms.length} percakapan aktif
                        </p>
                    </div>

                    {/* Chat List */}
                    <div className="max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            </div>
                        ) : rooms.length === 0 ? (
                            <div className="p-8 text-center">
                                <MessageCircle className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                                <p className="text-sm text-gray-500">Belum ada percakapan</p>
                                <Link
                                    href="/teknisi"
                                    className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700"
                                >
                                    Mulai chat dengan teknisi →
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {rooms.map((room) => {
                                    // Determine other user based on who's viewing
                                    const otherUser = room.technician?.user
                                        ? room.technician.user  // Customer view - show technician
                                        : room.customer         // Technician view - show customer

                                    const lastMessage = room.messages[0]
                                    const unreadCount = room._count.messages

                                    return (
                                        <Link
                                            key={room.id}
                                            href={`/chat/${room.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block p-4 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={
                                                        otherUser?.image ||
                                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser?.name || 'U')}&background=3b82f6&color=fff&size=100`
                                                    }
                                                    alt={otherUser?.name || 'User'}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-gray-900 truncate">
                                                            {otherUser?.name || 'User'}
                                                        </h4>
                                                        {unreadCount > 0 && (
                                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                                                {unreadCount}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {lastMessage && (
                                                        <p className="text-sm text-gray-600 truncate">
                                                            {lastMessage.content}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-400">
                                                        {formatTime(room.lastMessageAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-3">
                        <Link
                            href="/chat"
                            onClick={() => setIsOpen(false)}
                            className="block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Lihat Semua Chat
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
