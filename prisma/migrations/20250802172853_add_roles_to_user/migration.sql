-- CreateEnum
CREATE TYPE "public"."ROlE" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."ROlE" NOT NULL DEFAULT 'USER';
