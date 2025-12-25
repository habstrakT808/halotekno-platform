import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/technicians/[id] - Public technician detail
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const technician = await db.technician.findUnique({
      where: {
        id: params.id,
        user: {
          isActive: true,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            phone: true,
            email: true,
          },
        },
        services: {
          where: {
            isActive: true,
          },
          orderBy: {
            category: 'asc',
          },
        },
      },
    })

    if (!technician) {
      return NextResponse.json(
        { error: 'Technician not found' },
        { status: 404 }
      )
    }

    // Get reviews for this technician (from orders)
    const reviews = await db.review.findMany({
      where: {
        type: 'TECHNICIAN',
        order: {
          technicianId: params.id,
        },
      },
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json({
      ...technician,
      reviews,
    })
  } catch (error) {
    console.error('Error fetching technician:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
