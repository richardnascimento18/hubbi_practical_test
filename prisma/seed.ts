import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function products() {
  const product1 = await prisma.product.create({
    data: {
      name: 'Product A',
      price: 10.99,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Product B',
      price: 20.99,
    },
  });
}

async function main() {
  await products();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
