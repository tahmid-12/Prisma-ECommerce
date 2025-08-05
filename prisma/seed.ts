import { prismaClient } from "../src/prisma/prisma";
import { seedProducts } from "./seed/products";
import { seedAddresses } from "./seed/addresses";

async function main() {
    // await await seedProducts();
    await seedAddresses();
}

main()
  .catch((e) => {
    console.error(e); 
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
});