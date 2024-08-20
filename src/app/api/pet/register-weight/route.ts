import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";

const weightSchema = z.object({
  date: z.string().min(1, "Date is required"),
  weight: z.string().optional(),
  notes: z.string().optional(),
});

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    const body = await req.json();
    const { date, notes, weight } = weightSchema.parse(body);

    const { petId } = body;

    const newWeight = await prisma.weight.create({
      data: {
        userId,
        date,
        notes,
        weight: parseInt(weight ?? "0", 10),
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
