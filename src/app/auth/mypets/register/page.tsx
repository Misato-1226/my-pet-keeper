"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  petType: z.enum(["DOG", "CAT"], {
    errorMap: () => ({ message: "Pet type is required" }),
  }),
  breed: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  birthday: z.string().optional(),
  image: z.string().optional(), // 修正: ここは string に変更
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Register() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [binaryImage, setBinaryImage] = useState<Uint8Array | null>(null);
  const [imageType, setImageType] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);

          const base64String = reader.result.split(",")[1];
          const binaryString = atob(base64String);
          const binaryData = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            binaryData[i] = binaryString.charCodeAt(i);
          }
          setBinaryImage(binaryData);
          setImageType(file.type);
          console.log(`MIME Type: ${file.type}`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("petType", values.petType);
      formData.append("breed", values.breed || "");
      formData.append("gender", values.gender);
      formData.append("birthday", values.birthday || "");

      if (binaryImage && imageType) {
        // imageType が null でないことを確認
        formData.append("image", new Blob([binaryImage], { type: imageType }));
      }

      const response = await axios.post("/api/pet/register-pet", formData);

      if (response.status === 200) {
        router.push("/auth/mypets");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div>
      <h1 className="mt-24 text-3xl font-bold text-center">
        Register a New Pet
      </h1>
      <form
        className="max-w-full p-12 md:mx-52 lg:mx-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-center mb-10">
          <label className="cursor-pointer flex flex-col justify-center items-center">
            <input
              type="file"
              id="file-upload"
              className="opacity-0 w-0"
              accept="image/*"
              onChange={handleImageUpload}
            />

            {image ? (
              <img
                src={image}
                alt="Uploaded Preview"
                className="h-36 w-36 object-cover border border-slate-300 rounded-full hover:opacity-70"
              />
            ) : (
              <Image
                alt="upload image"
                width={150}
                height={150}
                src="https://img.icons8.com/?size=100&id=hAyHNAngD4aQ&format=png&color=000000"
                className="border border-slate-300 rounded-full hover:opacity-60"
              />
            )}
          </label>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-full mx-auto">
            <label className="block text-gray-700 font-bold text-xl text-left">
              Pet Type
            </label>
            <div className="flex gap-x-10 mb-8">
              <div className="flex items-center">
                <input
                  id="dog"
                  type="radio"
                  value="DOG"
                  {...register("petType")}
                  className="mr-2"
                />
                <label htmlFor="dog" className="text-xl text-gray-700">
                  Dog
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cat"
                  type="radio"
                  value="CAT"
                  {...register("petType")}
                  className="mr-2"
                />
                <label htmlFor="cat" className="text-xl text-gray-700">
                  Cat
                </label>
              </div>
              {errors.petType && (
                <p className="text-red-600 text-sm">{errors.petType.message}</p>
              )}
            </div>
          </div>
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 font-bold text-xl text-left"
              htmlFor="name"
            >
              Name
            </label>
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter name"
              className="border border-gray-300 p-2 rounded w-full mb-8"
            />
          </div>

          <div className="w-full mx-auto">
            <label className="block text-gray-700 font-bold text-xl text-left">
              Gender
            </label>
            <div className="flex gap-x-10 mb-8">
              <div className="flex items-center">
                <input
                  id="male"
                  type="radio"
                  value="MALE"
                  {...register("gender")}
                  className="mr-2"
                />
                <label htmlFor="male" className="text-xl text-gray-700">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  value="FEMALE"
                  {...register("gender")}
                  className="mr-2"
                />
                <label htmlFor="female" className="text-xl text-gray-700">
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="unknown"
                  type="radio"
                  value="UNKNOWN"
                  {...register("gender")}
                  className="mr-2"
                />
                <label htmlFor="unknown" className="text-xl text-gray-700">
                  Unknown
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-600 text-sm">{errors.gender.message}</p>
              )}
            </div>
          </div>
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 font-bold text-xl text-left"
              htmlFor="birthday"
            >
              Birthday
            </label>
            <input
              type="date"
              {...register("birthday")}
              className="border border-gray-300 p-2 rounded w-full mb-8"
            />
          </div>
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 font-bold text-xl text-left"
              htmlFor="breed"
            >
              Breed
              <span className="font-normal px-2">※choose pet type first</span>
            </label>
            <select
              id="breed"
              {...register("breed")}
              className="border border-gray-300 p-2 rounded w-full mb-8"
            >
              <option value="">Select a breed</option>
              <option value="breed1">Breed 1</option>
              <option value="breed2">Breed 2</option>
            </select>
          </div>
          <div className="w-full mx-auto text-center">
            <button
              type="submit"
              className="text-xl bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
