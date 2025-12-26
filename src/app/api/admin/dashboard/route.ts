import { NextResponse } from 'next/server'
import { auth } from '@/../auth'
import prisma from '@/lib/db'

export async function GET() {
    try {
        const session = await auth()

        // Only ADMIN and SUPER_ADMIN can access
        if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get all stats in parallel
        const [
            totalUsers,
            totalTechnicians,
            totalMitras,
            totalProducts,
            totalOrders,
            pendingMitras,
            recentUsers,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.technician.count(),
            prisma.user.count({ where: { role: 'MITRA' } }),
            prisma.product.count({ where: { isActive: true } }),
            prisma.order.count(),
            prisma.user.count({ where: { role: 'MITRA', mitraStatus: 'PENDING' } }),
            prisma.user.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    technician: {
                        select: { id: true },
                    },
                },
            }),
        ])

        // Get role distribution
        const roleStats = await prisma.user.groupBy({
            by: ['role'],
            _count: true,
        })

        return NextResponse.json({
            stats: {
                totalUsers,
                totalTechnicians,
                totalMitras,
                totalProducts,
                totalOrders,
                pendingMitras,
                byRole: roleStats.reduce((acc: Record<string, number>, stat) => {
                    acc[stat.role] = stat._count
                    return acc
                }, {}),
            },
            recentUsers,
        })
    } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
