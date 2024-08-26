import { authOptions } from "@/utils/auth";
import prisma from "@/utils/db";
import { handleSession } from "@/utils/session";
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

export const GET = async () => {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve events" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { event, description, date, startTime, endTime } =
      EventSchema.parse(body);

    const newEvent = await prisma.calendar.create({
      data: {
        event,
        description: description || "",
        date,
        startTime: startTime || "",
        endTime: endTime || "",
        userId,
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

export const PUT = async (req: Request) => {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, date, event, description, startTime, endTime } =
      await req.json();

    const updateEvent = await prisma.calendar.updateMany({
      where: {
        userId,
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
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (userId !== null) {
      const deleteRecord = await prisma.calendar.deleteMany({
        where: {
          userId,
          id: parseInt(id, 10),
        },
      });

      return NextResponse.json(
        { message: "Event deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
};
