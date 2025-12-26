import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const validatedFields = registerSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Data tidak valid', details: validatedFields.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, password, phone, role } = validatedFields.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        role,
        mitraStatus: role === 'MITRA' ? 'PENDING' : null, // Set PENDING for mitra
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        mitraStatus: true,
      },
    })

    return NextResponse.json(
      { message: 'Registrasi berhasil', user },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as { code?: string }).code,
      meta: (error as { meta?: unknown }).meta,
    })
    return NextResponse.json(
      { error: 'Terjadi kesalahan server', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
