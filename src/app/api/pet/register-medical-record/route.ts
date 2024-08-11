import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const medicalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  notes: z.string().optional(),
  date: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, notes, date } = medicalSchema.parse(body);
    console.log(title, notes, date);

    const { petId } = body;
    console.log("title:", date);

    const newMedicalRecord = await prisma.medicalRecord.create({
      data: {
        title,
        notes: notes || "",
        date: date || "",
        petId: parseInt(petId, 10),
      },
    });
    return NextResponse.json(
      { newMedicalRecord, message: "New Medical Record created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create medical record" },
      { status: 500 }
    );
  }
}
