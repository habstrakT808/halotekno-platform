import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    const userCount = await prisma.user.count()

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      userCount,
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
