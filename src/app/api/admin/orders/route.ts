import { NextResponse } from 'next/server'
import { auth } from '@/../auth'
import prisma from '@/lib/db'

// GET - Get all orders for admin
export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if user is admin
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })

        if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // Get all orders with items
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                images: true,
                            },
                        },
                        service: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        })

        return NextResponse.json({ orders })
    } catch (error) {
        console.error('Error fetching orders:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
