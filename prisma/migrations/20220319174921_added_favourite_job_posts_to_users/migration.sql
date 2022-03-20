/*
  Warnings:

  - You are about to drop the column `userId` on the `JobPost` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobPost" DROP CONSTRAINT "JobPost_userId_fkey";

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "jobPostId" TEXT;

-- CreateTable
CREATE TABLE "_FavouritedJobPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavouritedJobPosts_AB_unique" ON "_FavouritedJobPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_FavouritedJobPosts_B_index" ON "_FavouritedJobPosts"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "JobPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritedJobPosts" ADD FOREIGN KEY ("A") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavouritedJobPosts" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
