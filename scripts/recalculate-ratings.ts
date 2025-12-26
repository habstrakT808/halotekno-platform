import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function recalculateRatings() {
    console.log('🔄 Recalculating mitra ratings...')

    try {
        // Get all mitras
        const mitras = await prisma.mitra.findMany({
            select: { id: true, businessName: true },
        })

        for (const mitra of mitras) {
            // Get all reviews for this mitra
            const reviews = await prisma.review.findMany({
                where: { mitraId: mitra.id },
                select: { rating: true },
            })

            const totalReviews = reviews.length
            const averageRating =
                totalReviews > 0
                    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                    : 0

            // Update mitra
            await prisma.mitra.update({
                where: { id: mitra.id },
                data: {
                    rating: averageRating,
                    totalReview: totalReviews,
                },
            })

            console.log(
                `✅ ${mitra.businessName}: ${averageRating.toFixed(1)} stars (${totalReviews} reviews)`
            )
        }

        console.log('\n✅ All ratings recalculated successfully!')
    } catch (error) {
        console.error('❌ Error recalculating ratings:', error)
    } finally {
        await prisma.$disconnect()
    }
}

recalculateRatings()
