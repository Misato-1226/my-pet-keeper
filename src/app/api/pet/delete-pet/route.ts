import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    const { petId } = await req.json();
    await prisma.weight.deleteMany({
      where: { petId: parseInt(petId, 10), userId: userId },
    });
    await prisma.medicalRecord.deleteMany({
      where: {
        petId: parseInt(petId, 10),
        userId: userId,
      },
    });
    await prisma.pet.deleteMany({
      where: { id: parseInt(petId, 10), userId: userId },
    });

    return NextResponse.json(
      { message: "Pet deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete pet" },
      { status: 500 }
    );
  }
};
