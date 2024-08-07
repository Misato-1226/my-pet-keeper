// import { authOptions } from "@/utils/auth";
// import prisma from "@/utils/db";
// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { z } from "zod";
// import { Buffer } from "buffer";
// import IncomingForm from "formidable";

// export const petSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   petType: z.enum(["DOG", "CAT"]),
//   breed: z.string().optional(),
//   gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
//   birthday: z.string().optional(),
//   image: z.instanceof(Uint8Array).optional(),
// });

// export const config = {
//   api: {
//     bodyParser: false, // bodyParserを無効にして、ファイルのアップロードを許可
//   },
// };

// export async function POST(req: Request) {
//   const form = new IncomingForm();

//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();

//     const { name, petType, breed, gender, birthday, image } =
//       petSchema.parse(body);

//     const normalizedBirthday = birthday ?? "";
//     let imageBuffer: Buffer | null = null;
//     if (image) {
//       imageBuffer = Buffer.from(image); // Uint8Array から Buffer へ変換
//     }

//     const newPet = await prisma.pet.create({
//       data: {
//         name,
//         petType,
//         breed,
//         gender,
//         birthday: normalizedBirthday,
//         image: imageBuffer,
//         userId: Number(session.user.id),
//       },
//     });
//     return NextResponse.json(newPet, { status: 200 });
//   } catch (error) {
//     console.error("Error: ", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { PetType, Gender } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
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

    const pet = await prisma.pet.create({
      data: {
        name,
        petType: petTypeEnum,
        breed,
        gender: genderEnum,
        birthday,
        image,
        userId: Number(session.user.id),
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
