import prisma from "@/utils/db";
import { handleSession } from "@/utils/session";
import { NextResponse } from "next/server";
import { z } from "zod";

const weightSchema = z.object({
  date: z.string().min(1, "Date is required"),
  weight: z.string().optional(),
  notes: z.string().optional(),
});

export const POST = async (req: Request) => {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { date, notes, weight } = weightSchema.parse(body);

    const { petId } = body;

    const newWeight = await prisma.weight.create({
      data: {
        userId,
        date,
        notes,
        weight: parseFloat(weight ?? "0"),
        petId: parseInt(petId, 10),
      },
    });

    return NextResponse.json(
      { newWeight, message: "New Weight added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add weight" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const deletedWeight = await prisma.weight.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { message: "Weight deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete weight" },
      { status: 500 }
    );
  }
};
