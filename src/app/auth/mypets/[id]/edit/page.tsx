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
import { log } from "console";

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

interface Breed {
  name: string;
  [key: string]: any;
}

export default function Register() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [petType, setPetType] = useState<"DOG" | "CAT" | "">("");

  const { id } = useParams() as { id: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pet, setPet] = useState<PetType>();

  useEffect(() => {
    if (petType === "CAT") {
      const url = `https://api.thecatapi.com/v1/breeds`;
      const api_key =
        "live_Mh2eS2NfWT60T1AANJ4PV4wnwWB8k3kYzwkabksUUeNRBjIMiR93fgnvVP5huhDR";

      fetch(url, {
        headers: {
          "x-api-key": api_key,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setBreeds(data.filter((breed: { name: string }) => breed.name));
        })
        .catch((error) => {
          console.error("Error fetching cat breeds:", error.message || error);
        });
    } else if (petType === "DOG") {
      const url = `https://api.thedogapi.com/v1/breeds`;
      const api_key =
        "live_AHX3qC4g9vCFEJyXX6GzB3vgb1khxUgCmMwnxRbsZeT8UWdPc0qSUFzZWyDlFw8C";

      fetch(url, {
        headers: {
          "x-api-key": api_key,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setBreeds(data.filter((breed: { name: string }) => breed.name));
        })
        .catch((error) => {
          console.error("Error fetching dog breeds:", error.message || error);
        });
    }
  }, [petType]); // petTypeに依存

  useEffect(() => {
    const getPet = async () => {
      try {
        const response = await axios.get(`/api/pet/get-pet/${id}`);
        if (response.status === 200) {
          setPet(response.data);
          setPetType(response.data.petType.toUpperCase() as "DOG" | "CAT");
        } else {
          console.log("Failed to get pet");
        }
      } catch (error) {
        console.log("Failed to fetch pet", error);
      }
    };

    const getPetImage = async () => {
      try {
        const response = await axios.get(`/api/pet/get-pet/${id}`);
        if (response.data.image && response.data.image.data) {
          const base64Flag = `data:image/jpeg;base64,${bufferToBase64(
            response.data.image.data
          )}`;
          setImageSrc(base64Flag);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getPet();
    getPetImage();
  }, [id]);

  useEffect(() => {
    if (pet) {
      setValue("name", pet.name);
      setValue("petType", pet.petType.toUpperCase() as "DOG" | "CAT");
      setValue("breed", pet.breed || "");
      setValue(
        "gender",
        pet.gender.toUpperCase() as "MALE" | "FEMALE" | "UNKNOWN"
      );
      setValue("birthday", pet.birthday || "");
    }
    console.log(pet?.image);
  }, [pet, setValue, breeds]);

  const bufferToBase64 = (buffer: Buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
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
      const breedArray = Array.isArray(values.breed)
        ? values.breed
        : values.breed
        ? [values.breed]
        : [];
      breedArray.forEach((breed) => {
        formData.append("breed[]", breed);
      });
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
        console.log("Update pet failed");
      }
    } catch (error) {
      console.error("Update pet error", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this pet profile?")) {
      try {
        const petId = parseInt(id, 10);
        const response = await axios.delete(`/api/pet/delete-pet`, {
          data: {
            petId: petId,
          },
        });
        if (response.status === 200) {
          console.log("Delete pet successfully");
          router.push("/auth/mypets");
        } else {
          console.log("Not found pet");
        }
      } catch (error) {
        console.log("Failed to delete pet");
      }
    } else {
      console.log("Delete action cancelled");
    }
  };

  return (
    <div>
      <h1 className="mt-24 text-3xl font-bold text-center">
        Edit Pet Information
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
            {imageSrc ? (
              <Image
                src={imageSrc}
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
              multiple
              size={10}
            >
              <option value="">Select a breed</option>
              {breeds.map((breed, index) => (
                <option key={index} value={breed.name}>
                  {breed.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-2/4 mx-auto mt-5 text-center">
            <button
              type="submit"
              className="text-xl bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Update Profile
            </button>
            <p
              onClick={handleDelete}
              className="text-xl text-red-600 mt-10 py-2 px-4 underline cursor-pointer"
            >
              Delete Profile
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
