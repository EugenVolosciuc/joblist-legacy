/*
  Warnings:

  - You are about to drop the column `maxPay` on the `JobPost` table. All the data in the column will be lost.
  - You are about to drop the column `minPay` on the `JobPost` table. All the data in the column will be lost.
  - Added the required column `isFixedSalary` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "maxPay",
DROP COLUMN "minPay",
ADD COLUMN     "isFixedSalary" BOOLEAN NOT NULL,
ADD COLUMN     "maxSalary" DOUBLE PRECISION,
ADD COLUMN     "minSalary" DOUBLE PRECISION,
ADD COLUMN     "salary" DOUBLE PRECISION;
