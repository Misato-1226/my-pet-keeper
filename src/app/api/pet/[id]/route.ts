import prisma from "@/utils/db";
import { Gender, PetType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const idMatch = pathname.match(/\/api\/pet\/(\d+)/);
    const id = idMatch ? parseInt(idMatch[1], 10) : null;

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

    if (id) {
      const pet = await prisma.pet.update({
        where: {
          id: id,
        },
        data: {
          name,
          petType: petTypeEnum,
          breed,
          gender: genderEnum,
          birthday,
          image,
        },
      });
      return NextResponse.json(pet, { status: 200 });
    }
    if (!id)
      return NextResponse.json({ error: "ID not provided" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating pet" }, { status: 500 });
  }
}

import { authOptions } from "@/utils/auth";

import { getServerSession } from "next-auth/next";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const petId = parseInt(params.id, 10);

    if (isNaN(petId)) {
      return NextResponse.json({ message: "Invalid pet ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const pet = await prisma.pet.findFirst({
      where: { id: petId, userId: userId },
    });

    if (pet) {
      return NextResponse.json(pet, { status: 200 });
    } else {
      return NextResponse.json({ message: "Pet not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
