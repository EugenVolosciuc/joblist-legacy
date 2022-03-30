-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR');

-- AlterTable
ALTER TABLE "JobPost" ADD COLUMN     "currency" "Currency",
ADD COLUMN     "maxPay" DOUBLE PRECISION,
ADD COLUMN     "minPay" DOUBLE PRECISION;
