/*
  Warnings:

  - You are about to drop the column `value` on the `Weight` table. All the data in the column will be lost.
  - Added the required column `weight` to the `Weight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Weight" DROP COLUMN "value",
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
