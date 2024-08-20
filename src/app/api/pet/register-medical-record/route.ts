import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";

const medicalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  veterinaryClinic: z.string().optional(),
  veterinarian: z.string().optional(),
  notes: z.string().optional(),
  date: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    const body = await req.json();
    const { title, veterinaryClinic, veterinarian, notes, date } =
      medicalSchema.parse(body);
    console.log(title, notes, date);

    const { petId } = body;
    console.log("title:", date);

    const newMedicalRecord = await prisma.medicalRecord.create({
      data: {
        userId,
        title,
        veterinaryClinic: veterinaryClinic || "",
        veterinarian: veterinarian || "",
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
