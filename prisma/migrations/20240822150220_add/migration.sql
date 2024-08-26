/*
  Warnings:

  - You are about to drop the column `petId` on the `Calendar` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_petId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarPets" DROP CONSTRAINT "CalendarPets_calendarId_fkey";

-- DropForeignKey
ALTER TABLE "CalendarPets" DROP CONSTRAINT "CalendarPets_petId_fkey";

-- AlterTable
ALTER TABLE "Calendar" DROP COLUMN "petId";

-- AddForeignKey
ALTER TABLE "CalendarPets" ADD CONSTRAINT "CalendarPets_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarPets" ADD CONSTRAINT "CalendarPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
