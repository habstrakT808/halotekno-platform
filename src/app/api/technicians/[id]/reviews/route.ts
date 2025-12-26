import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Get all reviews for this technician
        const reviews = await prisma.review.findMany({
            where: {
                order: {
                    technicianId: id,
                },
                type: 'TECHNICIAN',
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
                order: {
                    select: {
                        orderNumber: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

        return NextResponse.json({
            reviews,
            averageRating,
            totalReviews: reviews.length,
        })
    } catch (error) {
        console.error('Error fetching technician reviews:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
