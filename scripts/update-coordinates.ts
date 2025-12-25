import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateMitraCoordinates() {
  try {
    // Update mitra with coordinates for Malang, Indonesia
    const result = await prisma.mitra.update({
      where: {
        id: 'cmjlxo5tw0001r5448gbzpwiu',
      },
      data: {
        latitude: -7.9666,
        longitude: 112.6326,
      },
    })

    console.log('✅ Mitra coordinates updated successfully!')
    console.log('Latitude:', result.latitude)
    console.log('Longitude:', result.longitude)
  } catch (error) {
    console.error('❌ Error updating coordinates:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateMitraCoordinates()
