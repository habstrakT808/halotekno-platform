const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                        role: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                        service: true,
                    },
                },
            },
        })

        console.log('\n=== DATABASE ORDERS ===')
        console.log('Total orders:', orders.length)
        console.log('\n')

        orders.forEach((order, index) => {
            console.log(`Order ${index + 1}:`)
            console.log('  Order Number:', order.orderNumber)
            console.log('  User:', order.user.email, `(${order.user.role})`)
            console.log('  Status:', order.status)
            console.log('  Total:', order.total)
            console.log('  Items:', order.items.length)
            order.items.forEach((item, i) => {
                console.log(`    Item ${i + 1}:`, item.product?.name || item.service?.name)
            })
            console.log('\n')
        })

        // Check admin users
        const admins = await prisma.user.findMany({
            where: { role: 'ADMIN' },
            select: { email: true, name: true },
        })

        console.log('=== ADMIN USERS ===')
        admins.forEach((admin) => {
            console.log('  -', admin.email, `(${admin.name})`)
        })

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkOrders()
