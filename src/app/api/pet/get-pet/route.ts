import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    // `id`を使用してデータベースからデータを取得
    const pet = await prisma.pet.findUnique({
      where: { id: Number(id) },
    });

    if (pet?.image) {
      return new NextResponse(pet.image, {
        headers: {
          "Content-Type": "image/*", // 適切なMIMEタイプを設定
        },
      });
    } else {
      return new NextResponse("Image not found", { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
