import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/../auth'
import prisma from '@/lib/db'

// GET - Get technician services
export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const technician = await prisma.technician.findUnique({
            where: { userId: session.user.id },
            select: { id: true },
        })

        if (!technician) {
            return NextResponse.json({ error: 'Technician not found' }, { status: 404 })
        }

        const services = await prisma.service.findMany({
            where: { technicianId: technician.id },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({ services })
    } catch (error) {
        console.error('Error fetching services:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST - Create new service
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const technician = await prisma.technician.findUnique({
            where: { userId: session.user.id },
            select: { id: true },
        })

        if (!technician) {
            return NextResponse.json({ error: 'Technician not found' }, { status: 404 })
        }

        const body = await request.json()
        const { name, category, price, minPrice, maxPrice, description, duration } = body

        if (!name || !category || price === undefined || price === null) {
            return NextResponse.json(
                { error: 'Name, category, and price are required' },
                { status: 400 }
            )
        }

        const service = await prisma.service.create({
            data: {
                technicianId: technician.id,
                name,
                category,
                price: parseFloat(price),
                minPrice: minPrice !== undefined && minPrice !== null && minPrice !== '' ? parseFloat(minPrice) : null,
                maxPrice: maxPrice !== undefined && maxPrice !== null && maxPrice !== '' ? parseFloat(maxPrice) : null,
                description: description || '',
                duration: duration || 60,
            },
        })

        return NextResponse.json({ service }, { status: 201 })
    } catch (error) {
        console.error('Error creating service:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
