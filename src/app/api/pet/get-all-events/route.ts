import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    console.log("userId: ", userId);

    const calendarEvents = await prisma.calendar.findMany({
      where: { userId: userId },
    });

    if (calendarEvents.length === 0) {
      return NextResponse.json(
        { message: "No calendar events found" },
        { status: 404 }
      );
    }

    return NextResponse.json(calendarEvents, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error });
  }
};
