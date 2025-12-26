import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUser() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: 'teknisi1@gmail.com' },
            include: {
                technician: true,
            },
        })

        if (user) {
            console.log('User found:')
            console.log('- Email:', user.email)
            console.log('- Role:', user.role)
            console.log('- Has Technician:', !!user.technician)
            console.log('\nFull user data:')
            console.log(JSON.stringify(user, null, 2))
        } else {
            console.log('User not found')
        }
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkUser()
