import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

// Load from .env.local
dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
    console.log('🔧 Creating admin account...')

    const hashedPassword = await bcrypt.hash('admin123', 12)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@halotekno.com' },
        update: {
            role: UserRole.SUPER_ADMIN, // Update existing account to SUPER_ADMIN
        },
        create: {
            email: 'admin@halotekno.com',
            name: 'Admin HaloTekno',
            password: hashedPassword,
            role: UserRole.SUPER_ADMIN,
            isActive: true,
        },
    })

    console.log('✅ Admin account created:')
    console.log(`   Email: ${admin.email}`)
    console.log(`   Password: admin123`)
    console.log(`   Role: ${admin.role}`)
}

main()
    .catch((e) => {
        console.error('❌ Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
