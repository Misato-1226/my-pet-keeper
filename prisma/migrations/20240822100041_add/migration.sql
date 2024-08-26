-- CreateTable
CREATE TABLE "CalendarPets" (
    "calendarId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "CalendarPets_pkey" PRIMARY KEY ("calendarId","petId")
);

-- AddForeignKey
ALTER TABLE "CalendarPets" ADD CONSTRAINT "CalendarPets_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarPets" ADD CONSTRAINT "CalendarPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
