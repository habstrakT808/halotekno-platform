import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  const backupPath = path.join(
    process.cwd(),
    'prisma',
    'seeds',
    'backup-data.json'
  )

  try {
    // Check if backup file exists
    await fs.access(backupPath)
    console.log('📦 Found backup file! Restoring data...')

    const backupContent = await fs.readFile(backupPath, 'utf-8')
    const { data } = JSON.parse(backupContent)

    // 1. Restore Users
    if (data.users && data.users.length > 0) {
      console.log(`- Restoring ${data.users.length} users...`)
      for (const user of data.users) {
        // Upsert to avoid duplicates
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            image: user.image,
            emailVerified: user.emailVerified,
          },
          create: {
            id: user.id,
            name: user.name,
            email: user.email!,
            password: user.password,
            role: user.role,
            image: user.image,
            emailVerified: user.emailVerified,
          },
        })
      }
    }

    // 2. Restore Mitras
    if (data.mitras && data.mitras.length > 0) {
      console.log(`- Restoring ${data.mitras.length} mitras...`)
      for (const mitra of data.mitras) {
        await prisma.mitra.upsert({
          where: { id: mitra.id },
          update: {
            businessName: mitra.businessName,
            address: mitra.address,
            city: mitra.city,
            latitude: mitra.latitude,
            longitude: mitra.longitude,
            phone: mitra.phone,
            rating: mitra.rating,
            isApproved: mitra.isApproved,
            isActive: mitra.isActive,
            // Add other fields as necessary from schema
            tagline: mitra.tagline,
            description: mitra.description,
            province: mitra.province,
            whatsapp: mitra.whatsapp,
            email: mitra.email,
            website: mitra.website,
            banner: mitra.banner,
            features: mitra.features,
            weekdayHours: mitra.weekdayHours,
            weekendHours: mitra.weekendHours,
          },
          create: {
            id: mitra.id,
            userId: mitra.userId,
            businessName: mitra.businessName,
            address: mitra.address,
            city: mitra.city,
            phone: mitra.phone,
            latitude: mitra.latitude,
            longitude: mitra.longitude,
            tagline: mitra.tagline,
            description: mitra.description,
            province: mitra.province,
            whatsapp: mitra.whatsapp,
            email: mitra.email,
            website: mitra.website,
            banner: mitra.banner,
            features: mitra.features,
            weekdayHours: mitra.weekdayHours,
            weekendHours: mitra.weekendHours,
            isApproved: mitra.isApproved,
            isActive: mitra.isActive,
          },
        })
      }
    }

    // 3. Restore Services
    if (data.mitraServices && data.mitraServices.length > 0) {
      console.log(`- Restoring ${data.mitraServices.length} services...`)
      // Delete existing to allow clean slate or use upsert if ID is stable
      await prisma.mitraService.deleteMany()
      await prisma.mitraService.createMany({
        data: data.mitraServices,
      })
    }

    // 4. Restore Images
    if (data.mitraImages && data.mitraImages.length > 0) {
      console.log(`- Restoring ${data.mitraImages.length} images...`)
      await prisma.mitraImage.deleteMany()
      await prisma.mitraImage.createMany({
        data: data.mitraImages,
      })
    }

    // 5. Restore Reviews
    if (data.reviews && data.reviews.length > 0) {
      console.log(`- Restoring ${data.reviews.length} reviews...`)
      for (const review of data.reviews) {
        await prisma.review.upsert({
          where: { id: review.id },
          update: {
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
          },
          create: review,
        })
      }
    }

    console.log('✅ Restore completed successfully!')
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      console.log('⚠️ No backup file found. Running default seed...')
      // Default seed logic here (e.g. create admin)
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await prisma.user.upsert({
        where: { email: 'admin@halotekno.com' },
        update: {},
        create: {
          name: 'Admin HaloTekno',
          email: 'admin@halotekno.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      })
      console.log('✅ Default admin created')
    } else {
      console.error('❌ Error during seeding:', error)
      throw error
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()
