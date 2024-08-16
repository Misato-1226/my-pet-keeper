"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";

import PetType from "@/types/PetType";
import axios from "axios";

//ここでcontextを使うか、データをフェッチしてくるか。
export default function PetDetail() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pet, setPet] = useState<PetType>();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    const getPet = async () => {
      try {
        const response = await axios.get(`/api/pet/get-pet/${id}`);
        if (response.status === 200) {
          console.log(response.data);
          setPet(response.data);
        } else {
          console.log("Failed to get pet");
        }
      } catch (error) {
        console.log("Failed to fetch pet", error);
      }
    };

    getPet();
  }, [id]);

  useEffect(() => {
    if (pet?.image && pet.image.data) {
      const imageBlob = new Blob([new Uint8Array(pet.image.data)], {
        type: "image/*",
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(imageBlob);
    }
  }, [pet?.image]);

  return (
    <div className="">
      <div className="flex justify-end p-5">
        <Link
          href={`${id}/edit`}
          className="text-left flex items-center gap-x-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <FaRegEdit className="h-8 w-8" />
          <p>Edit</p>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="md:flex items-center gap-32">
          {imageSrc ? (
            <Image
              className="mb-3 rounded-full shadow-lg w-52 h-52 object-cover"
              src={imageSrc}
              alt="Pet"
              width={200}
              height={200}
            />
          ) : (
            <p>Loading...</p>
          )}
          <h1 className="text-4xl text-center">{pet?.name}</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 gap-x-20 p-16 text-xl">
          <div className="text-left font-bold">Birthday:</div>
          <div>{pet?.birthday}</div>
          <div className="text-left font-bold">Pet Type:</div>
          <div>{pet?.petType}</div>
          <div className="text-left font-bold">Gender:</div>
          <div>{pet?.gender}</div>
          <div className="text-left font-bold">Breed:</div>
          <div>{pet?.breed}</div>
        </div>

        <div className="flex flex-col space-y-8 p-4 md:w-2/5">
          <Link
            href={`${id}/weight-tracking`}
            className=" w-full flex justify-between items-center bg-gray-200 px-6 py-4 rounded-full shadow-lg text-lg text-black hover:bg-gray-300 transition duration-300"
          >
            Weight Tracking <span>&gt;</span>
          </Link>
          <Link
            href={`${id}/medical-record`}
            className="flex justify-between items-center bg-gray-200 px-6 py-4 rounded-full shadow-lg text-lg text-black hover:bg-gray-300 transition duration-300"
          >
            Medical Records <span>&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
