/**
 * Compress image file to reduce size
 * @param file - Image file to compress
 * @param maxSizeMB - Maximum size in MB (default: 2MB)
 * @param maxWidthOrHeight - Maximum width or height (default: 1920px)
 * @returns Compressed image as Blob
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
