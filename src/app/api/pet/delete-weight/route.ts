import prisma from "@/utils/db";
import { NextResponse } from "next/server";

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
