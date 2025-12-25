import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/technicians - Public list of active technicians
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const specialty = searchParams.get('specialty') || ''
    const sortBy = searchParams.get('sortBy') || 'rating' // rating, experience, reviews

    const skip = (page - 1) * limit

    // Build where clause - only active technicians with active users
    const where: any = {
      isAvailable: true,
      user: {
        isActive: true,
      },
    }

    if (search) {
      where.user = {
        ...where.user,
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }
    }

    if (specialty) {
      where.specialties = {
        has: specialty,
      }
    }

    // Determine sort order
    let orderBy: any = { rating: 'desc' }
    if (sortBy === 'experience') {
      orderBy = { experience: 'desc' }
    } else if (sortBy === 'reviews') {
      orderBy = { totalReview: 'desc' }
    }

    const total = await db.technician.count({ where })

    const technicians = await db.technician.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            phone: true,
          },
        },
        services: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            price: true,
            duration: true,
          },
        },
      },
      orderBy,
    })

    return NextResponse.json({
      technicians,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching technicians:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
