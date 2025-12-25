import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

// POST - Track view or inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { mitraId, type } = body

    if (!mitraId || !type) {
      return NextResponse.json(
        { error: 'Mitra ID and type are required' },
        { status: 400 }
      )
    }

    if (type !== 'view' && type !== 'inquiry') {
      return NextResponse.json(
        { error: 'Type must be "view" or "inquiry"' },
        { status: 400 }
      )
    }

    // Check if mitra exists
    const mitra = await prisma.mitra.findUnique({
      where: { id: mitraId },
    })

    if (!mitra) {
      return NextResponse.json({ error: 'Mitra not found' }, { status: 404 })
    }

    // Increment the appropriate counter
    const updatedMitra = await prisma.mitra.update({
      where: { id: mitraId },
      data: {
        ...(type === 'view' && { totalViews: { increment: 1 } }),
        ...(type === 'inquiry' && { totalInquiries: { increment: 1 } }),
      },
      select: {
        totalViews: true,
        totalInquiries: true,
      },
    })

    return NextResponse.json({
      success: true,
      totalViews: updatedMitra.totalViews,
      totalInquiries: updatedMitra.totalInquiries,
    })
  } catch (error) {
    console.error('Error tracking analytics:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
}
