import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    const { id, date, event, description, startTime, endTime } =
      await req.json();
    const updateEvent = await prisma.calendar.updateMany({
      where: {
        userId: userId,
        id: parseInt(id, 10),
      },
      data: {
        event,
        description,
        date,
        startTime,
        endTime,
      },
    });
    return NextResponse.json({ status: 200, updateEvent });
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json({ status: 500, error: "Failed to update record" });
  }
};
