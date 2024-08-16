import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const petId = parseInt(params.id, 10);

    if (isNaN(petId)) {
      return NextResponse.json({ message: "Invalid pet ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const pet = await prisma.pet.findFirst({
      where: { id: petId, userId: userId },
    });

    if (pet) {
      return NextResponse.json(pet, { status: 200 });
    } else {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
