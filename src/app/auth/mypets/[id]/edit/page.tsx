"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import PetType from "@/types/PetType";
import { useEffect, useContext, useState } from "react";
import { PetsContext } from "@/app/contexts/Pets";
import { useParams } from "next/navigation";

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
  image: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function Register() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const Pets = useContext(PetsContext);
  const { id } = useParams() as { id: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    console.log(id);

    const foundPet = Pets?.Pets.find((p) => p.id === parseInt(id, 10));
    console.log(foundPet);

    if (foundPet) {
      setValue("name", foundPet.name);
      setValue("petType", foundPet.petType.toUpperCase() as "DOG" | "CAT");
      setValue("breed", foundPet.breed || "");
      setValue(
        "gender",
        foundPet.gender.toUpperCase() as "MALE" | "FEMALE" | "UNKNOWN"
      );
      setValue("birthday", foundPet.birthday || "");

      if (foundPet.image && foundPet.image.data) {
        const imageBlob = new Blob([new Uint8Array(foundPet.image.data)], {
          type: "image/*",
        });
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(imageBlob);
      }
    }
  }, [Pets, id, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("petType", values.petType);
      formData.append("breed", values.breed || "");
      formData.append("gender", values.gender);
      formData.append("birthday", values.birthday || "");

      if (image) {
        const base64String = image.split(",")[1];
        const binaryString = atob(base64String);
        const binaryData = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          binaryData[i] = binaryString.charCodeAt(i);
        }
        formData.append("image", new Blob([binaryData], { type: "image/*" }));
      }

      const numberId = parseInt(id, 10);
      const response = await axios.put(`/api/pet/${numberId}`, formData);
      if (response.status === 200) {
        router.push("/auth/mypets");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Update error", error);
    }
  };

  return (
    <div>
      <h1 className="mt-24 text-3xl font-bold text-center">
        Update Pet Information
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
              <Image
                src={image}
                width={150}
                height={150}
                alt="Uploaded Preview"
                className="h-36 w-36 object-cover border border-slate-300 rounded-full hover:opacity-70"
              />
            ) : (
              <Image
                alt="upload image"
                width={150}
                height={150}
                src="/default-image.png"
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
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter name"
              className="border border-gray-300 p-2 rounded w-full mb-8"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
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
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
