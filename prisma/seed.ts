import { PrismaClient, Prisma } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const productData: Prisma.ProductCreateInput[] = [
  {
    title: 'IKEA Chair',
    category: 'Chairs',
    price: 49.99,
    condition: 'Good',
    description: 'asdasd',
    location: 'Vilnius',
  },
  {
    title: 'IKEA Table',
    category: 'Chairs',
    price: 109.99,
    condition: 'Good',
    description: 'asdasd',
    location: 'Vilnius',
  },
];

export async function main() {
  for (const p of productData) {
    await prisma.product.create({ data: p });
  }
}

main();
