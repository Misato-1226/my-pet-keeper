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
    const breed = formData.getAll("breed") as string[];
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
          breed: breed.join(", "),
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
