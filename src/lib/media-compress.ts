/**
 * Media compression and validation utilities for chat
 */

// File size limits in bytes
export const FILE_SIZE_LIMITS = {
    IMAGE: 2 * 1024 * 1024, // 2MB
    VIDEO: 10 * 1024 * 1024, // 10MB
    DOCUMENT: 5 * 1024 * 1024, // 5MB
}

// Supported file types
export const SUPPORTED_TYPES = {
    IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
    DOCUMENT: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
    ],
}

export type MediaType = 'image' | 'video' | 'document' | 'unknown'

/**
 * Detect media type from MIME type
 */
export function getMediaType(mimeType: string): MediaType {
    if (SUPPORTED_TYPES.IMAGE.includes(mimeType)) return 'image'
    if (SUPPORTED_TYPES.VIDEO.includes(mimeType)) return 'video'
    if (SUPPORTED_TYPES.DOCUMENT.includes(mimeType)) return 'document'
    return 'unknown'
}

/**
 * Format file size to human readable string
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Compress image file to reduce size
 */
export async function compressImage(
    file: File,
    maxSizeMB: number = 2,
    maxWidthOrHeight: number = 1920
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            const img = new Image()

            img.onload = () => {
                const canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxWidthOrHeight) {
                        height = (height * maxWidthOrHeight) / width
                        width = maxWidthOrHeight
                    }
                } else {
                    if (height > maxWidthOrHeight) {
                        width = (width * maxWidthOrHeight) / height
                        height = maxWidthOrHeight
                    }
                }

                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'))
                    return
                }

                ctx.drawImage(img, 0, 0, width, height)

                // Try different quality levels to meet size requirement
                const tryCompress = (quality: number) => {
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to compress image'))
                                return
                            }

                            const sizeMB = blob.size / 1024 / 1024

                            // If size is acceptable or quality is already very low, resolve
                            if (sizeMB <= maxSizeMB || quality <= 0.1) {
                                resolve(blob)
                            } else {
                                // Try with lower quality
                                tryCompress(quality - 0.1)
                            }
                        },
                        file.type,
                        quality
                    )
                }

                // Start with 0.9 quality
                tryCompress(0.9)
            }

            img.onerror = () => {
                reject(new Error('Failed to load image'))
            }

            img.src = e.target?.result as string
        }

        reader.onerror = () => {
            reject(new Error('Failed to read file'))
        }

        reader.readAsDataURL(file)
    })
}

/**
 * Convert Blob to Base64 string
 */
export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            resolve(reader.result as string)
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

/**
 * Convert File to Base64 string
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            resolve(reader.result as string)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

/**
 * Validate file type (size will be handled by compression)
 */
export function validateFile(file: File): {
    valid: boolean
    error?: string
    mediaType: MediaType
} {
    const mediaType = getMediaType(file.type)

    if (mediaType === 'unknown') {
        return {
            valid: false,
            error: 'Tipe file tidak didukung',
            mediaType,
        }
    }

    // For non-images, check size limits
    if (mediaType !== 'image') {
        let maxSize: number
        switch (mediaType) {
            case 'video':
                maxSize = FILE_SIZE_LIMITS.VIDEO
                break
            case 'document':
                maxSize = FILE_SIZE_LIMITS.DOCUMENT
                break
            default:
                return {
                    valid: false,
                    error: 'Tipe file tidak valid',
                    mediaType,
                }
        }

        if (file.size > maxSize) {
            return {
                valid: false,
                error: `Ukuran file terlalu besar. Maksimal ${formatFileSize(maxSize)}`,
                mediaType,
            }
        }
    }

    return {
        valid: true,
        mediaType,
    }
}

/**
 * Process file for upload (compress if image, validate others)
 */
export async function processFileForUpload(file: File): Promise<{
    base64: string
    size: number
    type: string
    name: string
}> {
    const validation = validateFile(file)

    if (!validation.valid) {
        throw new Error(validation.error)
    }

    let processedFile: File | Blob = file

    // Compress images - always compress, with aggressive settings for large files
    if (validation.mediaType === 'image') {
        try {
            // Determine compression settings based on file size
            const fileSizeMB = file.size / 1024 / 1024
            let maxSizeMB = 2 // Default target
            let maxDimension = 1920 // Default dimension

            // For very large files, use more aggressive compression
            if (fileSizeMB > 10) {
                maxSizeMB = 1.5
                maxDimension = 1600
            } else if (fileSizeMB > 5) {
                maxSizeMB = 1.8
                maxDimension = 1800
            }

            processedFile = await compressImage(file, maxSizeMB, maxDimension)

            // If still too large after compression, try even more aggressive
            if (processedFile.size > FILE_SIZE_LIMITS.IMAGE) {
                processedFile = await compressImage(file, 1, 1280)
            }
        } catch (error) {
            console.error('Image compression failed:', error)
            throw new Error('Gagal memproses gambar. Silakan coba gambar lain.')
        }
    }

    const base64 = await (processedFile instanceof Blob
        ? blobToBase64(processedFile)
        : fileToBase64(processedFile))

    return {
        base64,
        size: processedFile.size,
        type: file.type,
        name: file.name,
    }
}
