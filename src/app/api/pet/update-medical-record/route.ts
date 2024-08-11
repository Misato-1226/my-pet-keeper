import prisma from "@/utils/db";
import { NextResponse } from "next/server";

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
