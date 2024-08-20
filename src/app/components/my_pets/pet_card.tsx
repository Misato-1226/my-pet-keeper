"use client";
import PetType from "@/types/PetType";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PetCard({ pet }: { pet: PetType }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (pet.image && pet.image.data) {
      const imageBlob = new Blob([new Uint8Array(pet.image.data)], {
        type: "image/*",
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(imageBlob);
    }
  }, [pet.image]);

  return (
    <div className="mb-28 md:mb-0 bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-105 duration-500">
      <Link href={`/auth/mypets/${pet.id}`}>
        <div className="flex flex-col items-center pt-10">
          {imageSrc ? (
            <Image
              className="mb-3 rounded-full shadow-lg w-52 h-52 object-cover"
              src={imageSrc}
              alt={`${pet.name}'s photo`}
              width={200}
              height={200}
            />
          ) : (
            <div className="mb-3 rounded-full shadow-lg bg-gray-200 w-[200px] h-[200px]" />
          )}

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {pet.name}
          </h5>
        </div>
        <div className="lg:mx-48 md:ml-10 mx-8 flex flex-col md:justify-center items-center text-sm text-gray-500 dark:text-gray-400 leading-5">
          <p className="lg:flex lg:justify-between w-full">
            Pet Type:<span className="lg:ml-0 ml-3">{pet.petType}</span>
          </p>
          <p className="lg:flex lg:justify-between w-full">
            Breed:<span className="lg:ml-0 ml-3">{pet.breed}</span>
          </p>
          <p className="lg:flex lg:justify-between w-full">
            Gender:<span className="lg:ml-0 ml-3">{pet.gender}</span>
          </p>
          <p className="lg:flex lg:justify-between w-full">
            Birthday:<span className="lg:ml-0 ml-3">{pet.birthday}</span>
          </p>
        </div>
      </Link>
      <div className="flex justify-center my-4 md:mt-6">
        <Link
          href={`/auth/mypets/${pet.id}/edit`}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
