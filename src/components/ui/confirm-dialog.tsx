'use client'

import { useState } from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ConfirmDialogProps {
    isOpen: boolean
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
    variant?: 'danger' | 'warning' | 'info'
}

export function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmText = 'Ya',
    cancelText = 'Batal',
    onConfirm,
    onCancel,
    variant = 'danger',
}: ConfirmDialogProps) {
    if (!isOpen) return null

    const getVariantStyles = () => {
        switch (variant) {
            case 'danger':
                return {
                    button: 'bg-red-600 hover:bg-red-700',
                    icon: 'text-red-600',
                }
            case 'warning':
                return {
                    button: 'bg-yellow-600 hover:bg-yellow-700',
                    icon: 'text-yellow-600',
                }
            case 'info':
                return {
                    button: 'bg-blue-600 hover:bg-blue-700',
                    icon: 'text-blue-600',
                }
        }
    }

    const styles = getVariantStyles()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`rounded-full bg-red-100 p-2 ${styles.icon}`}>
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    </div>
                    <button
                        onClick={onCancel}
                        className="rounded-lg p-1 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <p className="mb-6 text-gray-600">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 rounded-lg px-4 py-2 font-medium text-white ${styles.button}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

// Hook for easier usage
export function useConfirm() {
    const [isOpen, setIsOpen] = useState(false)
    const [config, setConfig] = useState<{
        title: string
        message: string
        onConfirm: () => void
        variant?: 'danger' | 'warning' | 'info'
    }>({
        title: '',
        message: '',
        onConfirm: () => { },
    })

    const confirm = (
        title: string,
        message: string,
        onConfirm: () => void,
        variant: 'danger' | 'warning' | 'info' = 'danger'
    ) => {
        setConfig({ title, message, onConfirm, variant })
        setIsOpen(true)
    }

    const handleConfirm = () => {
        config.onConfirm()
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const ConfirmDialogComponent = () => (
        <ConfirmDialog
            isOpen={isOpen}
            title={config.title}
            message={config.message}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            variant={config.variant}
        />
    )

    return { confirm, ConfirmDialog: ConfirmDialogComponent }
}
