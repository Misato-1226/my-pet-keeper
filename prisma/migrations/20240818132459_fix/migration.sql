/*
  Warnings:

  - You are about to drop the column `animalHospital` on the `MedicalRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "animalHospital",
ADD COLUMN     "veterinaryClinic" TEXT;
