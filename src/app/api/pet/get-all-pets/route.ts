import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const pets = await prisma.pet.findMany({});

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
