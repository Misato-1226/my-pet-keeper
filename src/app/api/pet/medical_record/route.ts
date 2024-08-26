import prisma from "@/utils/db";
import { handleSession } from "@/utils/session";
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
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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

export const PUT = async (req: Request) => {
  try {
    const { id, date, title, notes } = await req.json();
    const updateRecord = await prisma.medicalRecord.update({
      where: {
        id: id,
      },
      data: {
        date,
        title,
        notes,
      },
    });
    return NextResponse.json({ status: 200, updateRecord });
  } catch (error) {
    console.error("Failed to update record:", error);
    return NextResponse.json({ status: 500, error: "Failed to update record" });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();

    const deleteRecord = await prisma.medicalRecord.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "Record deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
};
