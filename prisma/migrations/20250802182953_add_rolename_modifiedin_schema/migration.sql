/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."ROLE" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "role",
ADD COLUMN     "role" "public"."ROLE" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "public"."ROlE";
