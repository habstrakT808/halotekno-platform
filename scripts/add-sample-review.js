const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addSampleReviews() {
    try {
        // Get a product order
        const productOrder = await prisma.order.findFirst({
            where: {
                items: {
                    some: {
                        productId: { not: null },
                    },
                },
            },
            include: {
                items: true,
                user: true,
            },
        })

        if (!productOrder) {
            console.log('No product orders found. Please create a sparepart order first.')
            return
        }

        const productItem = productOrder.items.find((item) => item.productId)
        if (!productItem) {
            console.log('No product item found in order.')
            return
        }

        // Check if review already exists
        const existingReview = await prisma.review.findFirst({
            where: {
                orderId: productOrder.id,
                type: 'PRODUCT',
            },
        })

        if (existingReview) {
            console.log('Review already exists for this order.')
            return
        }

        // Create sample reviews
        const review = await prisma.review.create({
            data: {
                userId: productOrder.userId,
                orderId: productOrder.id,
                type: 'PRODUCT',
                rating: 5,
                comment:
                    'Produk original dan berkualitas! Packing rapi, pengiriman cepat. Sangat puas dengan pembelian ini. Recommended seller!',
            },
        })

        console.log('\n✅ Sample review created successfully!')
        console.log('Product:', productItem.productId)
        console.log('Order:', productOrder.orderNumber)
        console.log('Rating:', review.rating)
        console.log('Comment:', review.comment)
        console.log('\nYou can now view the review on the sparepart detail page!')
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

addSampleReviews()
