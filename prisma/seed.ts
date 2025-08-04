import { prismaClient } from "../src/prisma/prisma";

import { faker } from "@faker-js/faker";

async function main() {
  const products = Array.from({ length: 100 }).map(() => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    description: faker.commerce.productDescription(),
    tags: faker.helpers.arrayElements([
      "electronics",
      "accessories",
      "computer",
      "home",
      "fashion",
      "phone",
      "gaming",
    ], faker.number.int({ min: 1, max: 3 })).join(","),
  }));

  await prismaClient.product.deleteMany();

  await prismaClient.product.createMany({
    data: products,
  });

  console.log("✅ 100 products seeded successfully");
}

main()
  .catch((e) => {
    console.error(e); 
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
});