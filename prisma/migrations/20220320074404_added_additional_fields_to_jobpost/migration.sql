/*
  Warnings:

  - You are about to drop the column `isActive` on the `JobPost` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('GROSS', 'NET');

-- CreateEnum
CREATE TYPE "SalaryPeriod" AS ENUM ('PER_HOUR', 'PER_WEEK', 'PER_MONTH', 'PER_YEAR');

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "isActive",
ADD COLUMN     "salaryPeriod" "SalaryPeriod",
ADD COLUMN     "salaryType" "SalaryType";
