import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ペットのidからそのペットの診療記録を取得する。
    const petId = parseInt(params.id);

    const medicalRecords = await prisma.medicalRecord.findMany({
      where: { petId: petId }, // 修正ポイント
    });

    return NextResponse.json(medicalRecords, { status: 200 });
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
