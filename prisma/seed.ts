import { PrismaClient, Prisma } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const productData: Prisma.ProductCreateInput[] = [
  {
    id: '11',
    title: "IKEA Chair",
    category: 'Chairs',
    price: 49.99,
    condition: 'good',
    description: 'asdasd',
    location: 'vilnius',
  },
  {
    id: '22',
    title: "IKEA Table",
    category: 'Chairs',
    price: 109.99,
    condition: 'good',
    description: 'asdasd',
    location: 'vilnius',
  }
]

export async function main() {
  for (const p of productData) {
    await prisma.product.create({ data: p })
  }
}

main()
