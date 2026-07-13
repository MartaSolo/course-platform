/*
  Warnings:

  - You are about to drop the column `downloadUrl` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `youtubeUrl` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" RENAME COLUMN "downloadUrl" TO "youtubeUrl";
ALTER TABLE "Lesson" DROP COLUMN "videoId";
