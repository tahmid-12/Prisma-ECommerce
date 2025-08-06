-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "status" "public"."ORDEREVENTSTATUS" NOT NULL DEFAULT 'PENDING';
