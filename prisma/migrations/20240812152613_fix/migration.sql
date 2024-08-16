/*
  Warnings:

  - Changed the type of `event` on the `Calendar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Event" AS ENUM ('WALKING', 'VETERINARY', 'GROOMING', 'OTHER');

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "event",
ADD COLUMN     "event" "Event" NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Weight" ADD COLUMN     "notes" TEXT,
ALTER COLUMN "date" SET DATA TYPE TEXT;
