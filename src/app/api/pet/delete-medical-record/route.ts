import prisma from "@/utils/db";
import { NextResponse } from "next/server";

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
