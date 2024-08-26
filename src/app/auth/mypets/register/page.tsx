"use client";

import { useState, useEffect } from "react"; // new code
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

//new code

interface Breed {
  name: string;
  [key: string]: any;
}

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  petType: z.enum(["DOG", "CAT"], {
    errorMap: () => ({ message: "Pet type is required" }),
  }),
  breed: z.union([z.string(), z.array(z.string())]).optional(),
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

  // new code
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [petType, setPetType] = useState<"DOG" | "CAT" | "">("");

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
  }, [petType]); // Este efecto se ejecuta cuando cambia el tipo de mascota

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
      const breedArray = Array.isArray(values.breed)
        ? values.breed
        : values.breed
        ? [values.breed]
        : [];
      // breedArray.forEach((breed) => {
      //   formData.append("breed", breed);
      // });
      const breedToString = breedArray.join(", ");

      formData.append("breed", breedToString);
      formData.append("gender", values.gender);
      formData.append("birthday", values.birthday || "");

      if (binaryImage && imageType) {
        // imageType が null でないことを確認
        formData.append("image", new Blob([binaryImage], { type: imageType }));
      }

      const response = await axios.post("/api/pet", formData);

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
      <h1 className="mt-24 text-3xl font-bold text-center">Register New Pet</h1>
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
                  onClick={() => setPetType("DOG")} // new code
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
                  onClick={() => setPetType("CAT")} // new code
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
          <div className="flex flex-col w-full md:w-2/4 mt-5 mx-auto text-center">
            <button
              type="submit"
              className="text-xl bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Register New Pet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
