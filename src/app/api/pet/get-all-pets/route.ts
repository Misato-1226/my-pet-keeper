import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    const pets = await prisma.pet.findMany({
      where: { userId: userId },
    });

    if (pets) {
      return NextResponse.json(pets, { status: 200 });
    } else {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
