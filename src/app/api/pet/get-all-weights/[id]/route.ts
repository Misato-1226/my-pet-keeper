import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const weights = await prisma.weight.findMany({
      where: { petId: parseInt(id, 10) },
    });
    return NextResponse.json(weights, { status: 200 });
  } catch (error) {
    console.error("Error fetching weights:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
};
