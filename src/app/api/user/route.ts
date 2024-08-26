import prisma from "@/utils/db";
import { handleSession } from "@/utils/session";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userMail = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (userMail) {
      return NextResponse.json(userMail, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "UserMail not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};
