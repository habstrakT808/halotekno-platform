'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
    id: string
    type: 'user' | 'bot'
    text: string
    time: string
}

const initialMessages: Message[] = [
    {
        id: '1',
        type: 'bot',
        text: 'Halo! 👋 Selamat datang di HaloTekno. Saya asisten virtual yang siap membantu konsultasi masalah gadget Anda. Silakan ceritakan masalah yang Anda alami.',
        time: 'Baru saja',
    },
]

const botResponses = [
    'Terima kasih sudah menjelaskan. Berdasarkan deskripsi Anda, kemungkinan ada masalah pada [komponen]. Untuk diagnosa lebih lanjut, kami sarankan untuk melakukan pengecekan langsung.',
    'Saya paham masalah Anda. Untuk kasus seperti ini, biasanya membutuhkan pemeriksaan fisik perangkat. Apakah Anda ingin booking layanan Cek/Bongkar?',
    'Baik, saya catat. Teknisi kami akan memberikan estimasi biaya setelah pemeriksaan. Untuk layanan Cek/Bongkar, biaya mulai dari Rp 50.000.',
    'Tentu! Anda bisa langsung melakukan booking melalui halaman Jasa Cek/Bongkar. Atau jika ingin berbicara langsung dengan CS, silakan klik tombol WhatsApp.',
]

export default function ChatWindow() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [responseIndex, setResponseIndex] = useState(0)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            text: input,
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsTyping(true)

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                text: botResponses[responseIndex % botResponses.length],
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            }
            setMessages((prev) => [...prev, botMessage])
            setResponseIndex((prev) => prev + 1)
            setIsTyping(false)
        }, 1500)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex h-[500px] flex-col rounded-2xl border border-gray-200 bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 rounded-t-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-white">Asisten HaloTekno</h3>
                    <p className="text-xs text-blue-100">Online • Siap membantu</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-end gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {message.type === 'bot' && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                <Bot className="h-4 w-4 text-blue-600" />
                            </div>
                        )}
                        <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.type === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p className={`mt-1 text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                {message.time}
                            </p>
                        </div>
                        {message.type === 'user' && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                                <User className="h-4 w-4 text-gray-600" />
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-end gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3">
                            <div className="flex gap-1">
                                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ketik pesan Anda..."
                        className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isTyping ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
