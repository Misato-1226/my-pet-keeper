-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_petId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_petId_fkey";

-- DropForeignKey
ALTER TABLE "Weight" DROP CONSTRAINT "Weight_petId_fkey";

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
