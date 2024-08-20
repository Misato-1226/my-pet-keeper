/*
  Warnings:

  - You are about to drop the column `vetName` on the `MedicalRecord` table. All the data in the column will be lost.
  - Added the required column `userId` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Weight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "vetName",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Weight" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
