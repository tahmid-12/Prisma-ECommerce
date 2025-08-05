import { prismaClient } from "../../src/prisma/prisma";
import { faker } from "@faker-js/faker";

export const seedAddresses = async () => {
  const addresses = Array.from({ length: 20 }).map(() => ({
    lineOne: faker.location.streetAddress(),
    lineTwo: faker.datatype.boolean() ? faker.location.secondaryAddress() : null,
    city: faker.location.city(),
    country: faker.location.country(),
    pinCode: faker.location.zipCode(),
    userId: 1,
  }));

  await prismaClient.address.createMany({ data: addresses });

  console.log("✅ Seeded 20 addresses for userId: 1");
};