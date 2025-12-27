import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Default password for all users
const DEFAULT_PASSWORD = 'password123'

interface SeedData {
  exportedAt: string
  version: string
  users: Array<{
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
    phone: string | null
    address: string | null
    city: string | null
    province: string | null
    postalCode: string | null
    isActive: boolean
    mitraStatus: string | null
    createdAt: string
    updatedAt: string
  }>
  technicians: Array<{
    id: string
    userId: string
    specialization: string
    experience: number
    isAvailable: boolean
    rating: number
    totalReviews: number
    location: string | null
    latitude: number | null
    longitude: number | null
    serviceRadius: number | null
    about: string | null
    skills: string[]
    certifications: string[]
    portfolio: string[]
    isVerified: boolean
  }>
  products: Array<{
    id: string
    name: string
    description: string | null
    price: number
    stock: number
    images: string[]
    brand: string | null
    model: string | null
    isActive: boolean
  }>
  services: Array<{
    id: string
    name: string
    description: string | null
    price: number
    priceType: string
    duration: string | null
    isActive: boolean
    technicianId: string | null
  }>
  rentalItems: unknown[]
  orders: Array<{
    id: string
    orderNumber: string
    userId: string
    technicianId: string | null
    status: string
    subtotal: number
    tax: number
    total: number
    notes: string | null
    createdAt: string
    updatedAt: string
    items: Array<{
      id: string
      orderId: string
      type: string
      serviceId: string | null
      productId: string | null
      rentalItemId: string | null
      quantity: number
      rentalDays: number | null
      price: number
      subtotal: number
    }>
  }>
  payments: unknown[]
  reviews: Array<{
    id: string
    userId: string
    orderId: string | null
    mitraId: string | null
    type: string
    rating: number
    comment: string | null
    createdAt: string
    updatedAt: string
  }>
  mitras: unknown[]
  articles: unknown[]
  bankAccounts: unknown[]
  carts: unknown[]
  chatRooms: Array<{
    id: string
    customerId: string
    technicianId: string
    lastMessageAt: string
    createdAt: string
    updatedAt: string
    messages: Array<{
      id: string
      roomId: string
      senderId: string
      content: string
      mediaUrl: string | null
      mediaType: string | null
      mediaSize: number | null
      mediaName: string | null
      isRead: boolean
      createdAt: string
    }>
  }>
  notifications: unknown[]
}

async function seedFromBackup() {
  console.log('🌱 Seeding database from backup...\n')

  try {
    // Read seed data
    const dataPath = path.join(process.cwd(), 'prisma', 'seed-data.json')

    if (!fs.existsSync(dataPath)) {
      console.error('❌ Error: prisma/seed-data.json not found!')
      console.log(
        '   Please copy the seed-data.json file to the prisma folder first.'
      )
      process.exit(1)
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8')
    const data: SeedData = JSON.parse(rawData)

    console.log(`📅 Backup from: ${data.exportedAt}`)
    console.log(`📦 Version: ${data.version}\n`)

    // Hash default password
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10)

    // Clear existing data (in reverse order of dependencies)
    console.log('🗑️  Clearing existing data...')
    await prisma.chatMessage.deleteMany()
    await prisma.chatRoom.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.review.deleteMany()
    await prisma.payment.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.cartItem.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.mitraImage.deleteMany()
    await prisma.mitraService.deleteMany()
    await prisma.mitra.deleteMany()
    await prisma.service.deleteMany()
    await prisma.product.deleteMany()
    await prisma.rentalItem.deleteMany()
    await prisma.technician.deleteMany()
    await prisma.article.deleteMany()
    await prisma.bankAccount.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()
    console.log('   ✓ Existing data cleared\n')

    // Seed Users
    console.log('👤 Seeding users...')
    for (const user of data.users) {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password: hashedPassword,
          image: user.image,
          role: user.role as 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN' | 'MITRA',
          phone: user.phone,
          address: user.address,
          city: user.city,
          province: user.province,
          postalCode: user.postalCode,
          isActive: user.isActive,
          mitraStatus: user.mitraStatus as
            | 'PENDING'
            | 'APPROVED'
            | 'REJECTED'
            | null,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        },
      })
    }
    console.log(`   ✓ ${data.users.length} users seeded`)

    // Seed Technicians
    console.log('🔧 Seeding technicians...')
    for (const tech of data.technicians) {
      await prisma.technician.create({
        data: {
          id: tech.id,
          userId: tech.userId,
          specialization: tech.specialization,
          experience: tech.experience,
          isAvailable: tech.isAvailable,
          rating: tech.rating,
          totalReviews: tech.totalReviews,
          location: tech.location,
          latitude: tech.latitude,
          longitude: tech.longitude,
          serviceRadius: tech.serviceRadius,
          about: tech.about,
          skills: tech.skills,
          certifications: tech.certifications,
          portfolio: tech.portfolio,
          isVerified: tech.isVerified,
        },
      })
    }
    console.log(`   ✓ ${data.technicians.length} technicians seeded`)

    // Seed Products
    console.log('📦 Seeding products...')
    for (const product of data.products) {
      await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          images: product.images,
          brand: product.brand,
          model: product.model,
          isActive: product.isActive,
        },
      })
    }
    console.log(`   ✓ ${data.products.length} products seeded`)

    // Seed Services
    console.log('🛠️  Seeding services...')
    for (const service of data.services) {
      await prisma.service.create({
        data: {
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price,
          priceType: service.priceType as 'FIXED' | 'DIAGNOSTIC' | 'HOURLY',
          duration: service.duration,
          isActive: service.isActive,
          technicianId: service.technicianId,
        },
      })
    }
    console.log(`   ✓ ${data.services.length} services seeded`)

    // Seed Orders (without items first)
    console.log('📋 Seeding orders...')
    for (const order of data.orders) {
      await prisma.order.create({
        data: {
          id: order.id,
          orderNumber: order.orderNumber,
          userId: order.userId,
          technicianId: order.technicianId,
          status: order.status as
            | 'PENDING_PAYMENT'
            | 'PAID'
            | 'IN_PROGRESS'
            | 'COMPLETED'
            | 'CANCELLED',
          subtotal: order.subtotal,
          tax: order.tax,
          total: order.total,
          notes: order.notes,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        },
      })

      // Seed Order Items
      for (const item of order.items) {
        await prisma.orderItem.create({
          data: {
            id: item.id,
            orderId: item.orderId,
            type: item.type as 'SERVICE' | 'PRODUCT' | 'RENTAL',
            serviceId: item.serviceId,
            productId: item.productId,
            rentalItemId: item.rentalItemId,
            quantity: item.quantity,
            rentalDays: item.rentalDays,
            price: item.price,
            subtotal: item.subtotal,
          },
        })
      }
    }
    console.log(`   ✓ ${data.orders.length} orders seeded`)

    // Seed Reviews
    console.log('⭐ Seeding reviews...')
    for (const review of data.reviews) {
      await prisma.review.create({
        data: {
          id: review.id,
          userId: review.userId,
          orderId: review.orderId,
          mitraId: review.mitraId,
          type: review.type as 'TECHNICIAN' | 'PRODUCT' | 'RENTAL' | 'MITRA',
          rating: review.rating,
          comment: review.comment,
          createdAt: new Date(review.createdAt),
          updatedAt: new Date(review.updatedAt),
        },
      })
    }
    console.log(`   ✓ ${data.reviews.length} reviews seeded`)

    // Seed Chat Rooms and Messages
    console.log('💬 Seeding chat rooms...')
    for (const room of data.chatRooms) {
      await prisma.chatRoom.create({
        data: {
          id: room.id,
          customerId: room.customerId,
          technicianId: room.technicianId,
          lastMessageAt: new Date(room.lastMessageAt),
          createdAt: new Date(room.createdAt),
          updatedAt: new Date(room.updatedAt),
        },
      })

      // Seed Messages
      for (const msg of room.messages) {
        await prisma.chatMessage.create({
          data: {
            id: msg.id,
            roomId: msg.roomId,
            senderId: msg.senderId,
            content: msg.content,
            mediaUrl: msg.mediaUrl,
            mediaType: msg.mediaType,
            mediaSize: msg.mediaSize,
            mediaName: msg.mediaName,
            isRead: msg.isRead,
            createdAt: new Date(msg.createdAt),
          },
        })
      }
    }
    console.log(`   ✓ ${data.chatRooms.length} chat rooms seeded`)

    console.log('\n✅ Database seeded successfully!')
    console.log('\n🔐 Login credentials:')
    console.log('   Default password for all users: password123')
    console.log('\n   Users:')
    for (const user of data.users) {
      console.log(`   - ${user.email} (${user.role})`)
    }
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedFromBackup()
