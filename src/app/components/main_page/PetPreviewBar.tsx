"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PetType from "@/types/PetType";
import axios from "axios";

const PetPreviewBar = () => {
  const [imageSrcs, setImageSrcs] = useState<{ [key: string]: string }>({});
  const [pets, setPets] = useState<PetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await axios.get("/api/pet/get-all-pets");
        if (response.status === 200) {
          console.log("Get Pets Successfully", response.data);
          setPets(response.data);
        } else {
          console.log("Failed to get pets");
          setError(true);
        }
      } catch (error) {
        console.log("Failed to fetching pets");
      } finally {
        setLoading(false);
      }
    };
    getPets();
    const newImageSrcs: { [key: string]: string } = {};

    pets.forEach((pet) => {
      if (pet.image && pet.image.data) {
        const imageBlob = new Blob([new Uint8Array(pet.image.data)], {
          type: "image/*",
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          newImageSrcs[pet.name] = reader.result as string;
          setImageSrcs((prevSrcs) => ({ ...prevSrcs, ...newImageSrcs }));
          setLoading(false);
        };
        reader.readAsDataURL(imageBlob);
      } else {
        setLoading(false);
      }
    });
  }, [pets]);

  return (
    <div className="lg:px-36">
      <h2 className="text-2xl font-bold mb-6 px-12 lg:p-0">
        <Link href="/auth/mypets">My Pets</Link>
      </h2>

      <div className="flex justify-center items-center bg-white p-4 rounded-xl shadow-md md:px-36">
        {loading ? (
          <p className="p-12">Loading...</p>
        ) : error ? (
          <p className="p-12">Pet not Found</p>
        ) : (
          pets.map((pet, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:mx-4 mx-2 hover:scale-110 duration-200"
            >
              <Link href={`mypets/${pet.id}`}>
                <div className="flex justify-center items-center">
                  {imageSrcs[pet.name] ? (
                    <Image
                      src={imageSrcs[pet.name]}
                      alt={pet.name}
                      width={200}
                      height={200}
                      className="md:w-32 md:h-32 mb-3 rounded-full shadow-lg w-16 h-16 object-cover"
                    />
                  ) : (
                    <div className="mb-3 rounded-full shadow-lg bg-gray-200 w-[200px] h-[200px]" />
                  )}
                </div>
                <p className="text-sm md:text-lg text-center">{pet.name}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetPreviewBar;
