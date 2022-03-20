/*
  Warnings:

  - You are about to drop the column `glassdoorId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "glassdoorId",
DROP COLUMN "industry",
ADD COLUMN     "crunchbaseId" TEXT,
ADD COLUMN     "description" TEXT;
