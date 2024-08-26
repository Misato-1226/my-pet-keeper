import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const pets = await prisma.pet.findMany({
      where: { userId: userId },
    });

    if (pets) {
      return NextResponse.json(pets, { status: 200 });
    } else {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { PetType, Gender } from "@prisma/client";

import { Buffer } from "buffer";
import { handleSession } from "@/utils/session";

export async function POST(req: NextRequest) {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const petType = formData.get("petType") as string;
    const breed = formData.get("breed") as string;
    const gender = formData.get("gender") as string;
    const birthday = formData.get("birthday") as string;
    const imageBlob = formData.get("image") as Blob | null;
    let image: Buffer | null = null;
    if (imageBlob) {
      const arrayBuffer = await imageBlob.arrayBuffer();
      image = Buffer.from(new Uint8Array(arrayBuffer));
    }
    const petTypeEnum = petType === "DOG" ? PetType.DOG : PetType.CAT;
    const genderEnum =
      gender === "FEMALE"
        ? Gender.FEMALE
        : gender === "MALE"
        ? Gender.MALE
        : Gender.UNKNOWN;
    console.log("breed:", breed);

    const pet = await prisma.pet.create({
      data: {
        name,
        petType: petTypeEnum,
        breed,
        gender: genderEnum,
        birthday,
        image,
        userId,
      },
    });

    return NextResponse.json(pet, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create pet" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req: Request) => {
  try {
    const { authorized, userId } = await handleSession();
    if (!authorized || userId === null) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { petId } = await req.json();
    await prisma.weight.deleteMany({
      where: { petId: parseInt(petId, 10), userId: userId },
    });
    await prisma.medicalRecord.deleteMany({
      where: {
        petId: parseInt(petId, 10),
        userId: userId,
      },
    });
    await prisma.pet.deleteMany({
      where: { id: parseInt(petId, 10), userId: userId },
    });

    return NextResponse.json(
      { message: "Pet deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete pet" },
      { status: 500 }
    );
  }
};
