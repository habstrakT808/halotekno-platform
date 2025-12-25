import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

async function backupData() {
  console.log('🔄 Starting data backup...')

  try {
    // 1. Fetch Users (and their related Profile/Mitra data will be seeded via relations logic if needed,
    // but better to fetch raw tables to keep IDs consistent)
    const users = await prisma.user.findMany()
    const accounts = await prisma.account.findMany()
    const sessions = await prisma.session.findMany()

    // 2. Fetch Mitra Data
    const mitras = await prisma.mitra.findMany()
    const mitraServices = await prisma.mitraService.findMany()
    const mitraImages = await prisma.mitraImage.findMany()

    // 3. Fetch Reviews
    const reviews = await prisma.review.findMany()

    // 4. Combine into one backup object
    const backup = {
      timestamp: new Date().toISOString(),
      data: {
        users,
        accounts,
        sessions,
        mitras,
        mitraServices,
        mitraImages,
        reviews,
      },
    }

    // 5. Save to file
    const seedDir = path.join(process.cwd(), 'prisma', 'seeds')

    // Ensure dir exists
    try {
      await fs.access(seedDir)
    } catch {
      await fs.mkdir(seedDir, { recursive: true })
    }

    const backupPath = path.join(seedDir, 'backup-data.json')
    await fs.writeFile(backupPath, JSON.stringify(backup, null, 2))

    console.log(`✅ Backup successful! Saved to: ${backupPath}`)
    console.log(`📊 Stats:`)
    console.log(`- Users: ${users.length}`)
    console.log(`- Mitras: ${mitras.length}`)
    console.log(`- Reviews: ${reviews.length}`)
  } catch (error) {
    console.error('❌ Backup failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

backupData()
