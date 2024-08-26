/*
  Warnings:

  - You are about to alter the column `weight` on the `Weight` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.
  - You are about to drop the `CalendarPets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CalendarPets" DROP CONSTRAINT "CalendarPets_calendarId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarPets" DROP CONSTRAINT "CalendarPets_petId_fkey";

-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "petId" INTEGER;

-- AlterTable
ALTER TABLE "Weight" ALTER COLUMN "weight" SET DATA TYPE DECIMAL(5,2);

-- DropTable
DROP TABLE "CalendarPets";

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
