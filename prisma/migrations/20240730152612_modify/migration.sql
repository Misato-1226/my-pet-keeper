-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_petId_fkey";

-- AlterTable
ALTER TABLE "Calendar" ALTER COLUMN "petId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "vetName" TEXT;

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "birthday" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
