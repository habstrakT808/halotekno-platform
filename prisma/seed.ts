import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@halotekno.com' },
    update: {},
    create: {
      email: 'admin@halotekno.com',
      name: 'Admin HaloTekno',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      phone: '081234567890',
    },
  })
  console.log('✅ Created admin:', admin.email)

  // Create Customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      name: 'Test Customer',
      password: customerPassword,
      role: 'CUSTOMER',
      phone: '081234567891',
    },
  })
  console.log('✅ Created customer:', customer.email)

  // Create Technician User
  const techPassword = await bcrypt.hash('tech123', 12)
  const techUser = await prisma.user.upsert({
    where: { email: 'teknisi@test.com' },
    update: {},
    create: {
      email: 'teknisi@test.com',
      name: 'Budi Teknisi',
      password: techPassword,
      role: 'CUSTOMER', // Role is CUSTOMER but has technician profile
      phone: '081234567892',
    },
  })

  // Create Technician Profile
  const technician = await prisma.technician.upsert({
    where: { userId: techUser.id },
    update: {},
    create: {
      userId: techUser.id,
      bio: 'Teknisi berpengalaman 5 tahun dalam servis HP dan laptop. Spesialis LCD, mesin, dan software.',
      experience: 5,
      specialties: ['LCD', 'Mesin', 'Software', 'Kamera'],
      rating: 4.8,
      totalReview: 24,
      isAvailable: true,
    },
  })
  console.log('✅ Created technician:', techUser.email)

  // Create Services for Technician
  await prisma.service.createMany({
    data: [
      {
        technicianId: technician.id,
        name: 'Konsultasi Gratis',
        category: 'KONSULTASI',
        price: 0,
        description: 'Konsultasi gratis via chat untuk diagnosa awal',
      },
      {
        technicianId: technician.id,
        name: 'Cek & Bongkar',
        category: 'CEK_BONGKAR',
        price: 50000,
        description: 'Pengecekan menyeluruh dan bongkar pasang komponen',
      },
      {
        technicianId: technician.id,
        name: 'Servis LCD',
        category: 'SERVIS_LENGKAP',
        price: 150000,
        description: 'Perbaikan atau penggantian LCD rusak',
      },
    ],
  })
  console.log('✅ Created services for technician')

  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
