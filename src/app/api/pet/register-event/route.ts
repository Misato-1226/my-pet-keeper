import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { z } from "zod";

const EventSchema = z.object({
  event: z.enum(["WALKING", "VETERINARY", "GROOMING", "OTHER"], {
    errorMap: () => ({ message: "Event name is required" }),
  }),
  description: z.string().optional(),
  date: z.string(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = Number(session.user.id);
    const body = await req.json();
    const { event, description, date, startTime, endTime } =
      EventSchema.parse(body);

    const newEvent = await prisma.calendar.create({
      data: {
        event,
        description: description || "",
        date: date,
        startTime: startTime || "",
        endTime: endTime || "",
        userId: userId,
      },
    });
    return NextResponse.json(
      { newEvent, message: "New Medical Record created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create medical record" },
      { status: 500 }
    );
  }
};
