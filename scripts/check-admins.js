const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkAdmins() {
    try {
        const admins = await prisma.user.findMany({
            where: { role: 'ADMIN' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        })

        console.log('\n=== ADMIN USERS ===')
        console.log('Total admins:', admins.length)
        console.log('\n')

        admins.forEach((admin, i) => {
            console.log(`Admin ${i + 1}:`)
            console.log('  ID:', admin.id)
            console.log('  Email:', admin.email)
            console.log('  Name:', admin.name)
            console.log('  Role:', admin.role)
            console.log('\n')
        })

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkAdmins()
