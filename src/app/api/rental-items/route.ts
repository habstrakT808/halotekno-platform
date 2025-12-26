import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const availability = searchParams.get('availability') // 'available' or 'all'

    const skip = (page - 1) * limit

    // Build where clause
    const where: Record<string, unknown> = {
      isActive: true, // Only show active items to public
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (availability === 'available') {
      where.stock = { gt: 0 }
    }

    // Fetch rental items
    const [rentalItems, total] = await Promise.all([
      prisma.rentalItem.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.rentalItem.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    // Get stats
    const stats = {
      total: await prisma.rentalItem.count({ where: { isActive: true } }),
      available: await prisma.rentalItem.count({
        where: { isActive: true, stock: { gt: 0 } },
      }),
      unavailable: await prisma.rentalItem.count({
        where: { isActive: true, stock: 0 },
      }),
    }

    return NextResponse.json({
      rentalItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      stats,
    })
  } catch (error) {
    console.error('Error fetching rental items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rental items' },
      { status: 500 }
    )
  }
}
