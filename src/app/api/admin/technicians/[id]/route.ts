import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/technicians/[id] - Get technician detail
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const technician = await db.technician.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone: true,
            isActive: true,
          },
        },
        services: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            orders: true,
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

    return NextResponse.json(technician)
  } catch (error) {
    console.error('Error fetching technician:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/technicians/[id] - Update technician
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { bio, experience, specialties, isAvailable } = body

    // Check if technician exists
    const existing = await db.technician.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Technician not found' },
        { status: 404 }
      )
    }

    // Update technician
    const technician = await db.technician.update({
      where: { id: params.id },
      data: {
        bio: bio !== undefined ? bio : undefined,
        experience: experience !== undefined ? experience : undefined,
        specialties: specialties !== undefined ? specialties : undefined,
        isAvailable: isAvailable !== undefined ? isAvailable : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone: true,
          },
        },
      },
    })

    return NextResponse.json(technician)
  } catch (error) {
    console.error('Error updating technician:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/technicians/[id] - Delete technician
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()

    if (!session || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if technician exists
    const existing = await db.technician.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Technician not found' },
        { status: 404 }
      )
    }

    // Soft delete - set user as inactive instead of hard delete
    await db.user.update({
      where: { id: existing.userId },
      data: { isActive: false },
    })

    return NextResponse.json({ message: 'Technician deleted successfully' })
  } catch (error) {
    console.error('Error deleting technician:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
