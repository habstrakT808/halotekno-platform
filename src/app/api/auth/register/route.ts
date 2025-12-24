import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Registration request body:', {
      ...body,
      password: '[REDACTED]',
      confirmPassword: '[REDACTED]',
    })

    const validatedFields = registerSchema.safeParse(body)

    if (!validatedFields.success) {
      console.log('Validation failed:', validatedFields.error.flatten())
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
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    console.log('User created successfully:', user.email)

    return NextResponse.json(
      { message: 'Registrasi berhasil', user },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })
    return NextResponse.json(
      { error: 'Terjadi kesalahan server', details: error.message },
      { status: 500 }
    )
  }
}
