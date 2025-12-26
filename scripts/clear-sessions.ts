import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Clearing old sessions...')
  
  try {
    // Delete all sessions
    const result = await prisma.session.deleteMany({})
    console.log(`✓ Deleted ${result.count} sessions`)
    
    // Also check accounts table for any issues
    const accounts = await prisma.account.findMany({
      select: {
        provider: true,
        providerAccountId: true,
        userId: true,
        id_token: true,
      }
    })
    
    console.log(`📊 Found ${accounts.length} accounts`)
    
    // Check for large id_tokens
    for (const account of accounts) {
      if (account.id_token && account.id_token.length > 1000) {
        console.log(`⚠️ Large id_token found for user ${account.userId} (${account.id_token.length} chars)`)
      }
    }
    
    console.log('✅ Session cleanup complete!')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

