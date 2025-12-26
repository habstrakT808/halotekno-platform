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
    console.log('📦 Found backup file! Restoring data...\n')

    const backupContent = await fs.readFile(backupPath, 'utf-8')
    const { data } = JSON.parse(backupContent)

    // 1. Restore Users
    if (data.users && data.users.length > 0) {
      console.log(`- Restoring ${data.users.length} users...`)
      for (const user of data.users) {
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            image: user.image,
            phone: user.phone,
            emailVerified: user.emailVerified,
            isActive: user.isActive,
          },
          create: {
            id: user.id,
            name: user.name,
            email: user.email!,
            password: user.password,
            role: user.role,
            image: user.image,
            phone: user.phone,
            emailVerified: user.emailVerified,
            isActive: user.isActive,
          },
        })
      }
    }

    // 2. Restore Technicians
    if (data.technicians && data.technicians.length > 0) {
      console.log(`- Restoring ${data.technicians.length} technicians...`)
      for (const tech of data.technicians) {
        await prisma.technician.upsert({
          where: { id: tech.id },
          update: {
            bio: tech.bio,
            experience: tech.experience,
            specialties: tech.specialties,
            rating: tech.rating,
            totalReview: tech.totalReview,
            isAvailable: tech.isAvailable,
          },
          create: {
            id: tech.id,
            userId: tech.userId,
            bio: tech.bio,
            experience: tech.experience,
            specialties: tech.specialties,
            rating: tech.rating,
            totalReview: tech.totalReview,
            isAvailable: tech.isAvailable,
          },
        })
      }
    }

    // 3. Restore Services
    if (data.services && data.services.length > 0) {
      console.log(`- Restoring ${data.services.length} services...`)
      for (const service of data.services) {
        await prisma.service.upsert({
          where: { id: service.id },
          update: {
            name: service.name,
            category: service.category,
            description: service.description,
            price: service.price,
            isActive: service.isActive,
          },
          create: service,
        })
      }
    }

    // 4. Restore Products
    if (data.products && data.products.length > 0) {
      console.log(`- Restoring ${data.products.length} products...`)
      for (const product of data.products) {
        await prisma.product.upsert({
          where: { id: product.id },
          update: {
            name: product.name,
            description: product.description,
            category: product.category,
            brand: product.brand,
            model: product.model,
            price: product.price,
            stock: product.stock,
            images: product.images,
            isActive: product.isActive,
          },
          create: product,
        })
      }
    }

    // 5. Restore Rental Items
    if (data.rentalItems && data.rentalItems.length > 0) {
      console.log(`- Restoring ${data.rentalItems.length} rental items...`)
      for (const item of data.rentalItems) {
        await prisma.rentalItem.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            description: item.description,
            pricePerDay: item.pricePerDay,
            stock: item.stock,
            images: item.images,
            isActive: item.isActive,
          },
          create: item,
        })
      }
    }

    // 6. Restore Mitras
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
          create: mitra,
        })
      }
    }

    // 7. Restore Mitra Services
    if (data.mitraServices && data.mitraServices.length > 0) {
      console.log(`- Restoring ${data.mitraServices.length} mitra services...`)
      await prisma.mitraService.deleteMany()
      await prisma.mitraService.createMany({
        data: data.mitraServices,
        skipDuplicates: true,
      })
    }

    // 8. Restore Mitra Images
    if (data.mitraImages && data.mitraImages.length > 0) {
      console.log(`- Restoring ${data.mitraImages.length} mitra images...`)
      await prisma.mitraImage.deleteMany()
      await prisma.mitraImage.createMany({
        data: data.mitraImages,
        skipDuplicates: true,
      })
    }

    // 9. Restore Reviews
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

    // 10. Restore Articles
    if (data.articles && data.articles.length > 0) {
      console.log(`- Restoring ${data.articles.length} articles...`)
      for (const article of data.articles) {
        await prisma.article.upsert({
          where: { id: article.id },
          update: {
            title: article.title,
            content: article.content,
            excerpt: article.excerpt,
            coverImage: article.coverImage,
            category: article.category,
            tags: article.tags,
            isPublished: article.isPublished,
          },
          create: article,
        })
      }
    }

    console.log('\n✅ Restore completed successfully!')
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      console.log('⚠️ No backup file found. Running default seed...')

      // Default seed - create admin user
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await prisma.user.upsert({
        where: { email: 'admin@halotekno.com' },
        update: {},
        create: {
          name: 'Admin HaloTekno',
          email: 'admin@halotekno.com',
          password: hashedPassword,
          role: 'SUPER_ADMIN',
          isActive: true,
        },
      })
      console.log('✅ Default admin created')
      console.log('   Email: admin@halotekno.com')
      console.log('   Password: admin123')
    } else {
      console.error('❌ Error during seeding:', error)
      throw error
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()
