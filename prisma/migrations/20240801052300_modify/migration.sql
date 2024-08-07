/*
  Warnings:

  - Made the column `birthday` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "birthday" SET NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE TEXT;
