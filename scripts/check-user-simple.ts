import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'teknisi1@gmail.com' },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            technician: {
                select: { id: true },
            },
        },
    })

    console.log('User data:')
    console.log(JSON.stringify(user, null, 2))
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
