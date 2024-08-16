"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PetType from "@/types/PetType";

const PetPreviewBar: FC<{ pets: PetType[] }> = ({ pets }) => {
  const [imageSrcs, setImageSrcs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (pets.length === 0) return;

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
        };
        reader.readAsDataURL(imageBlob);
      }
    });
  }, [pets]);

  return (
    <div className="lg:px-36">
      <h2 className="text-2xl font-bold mb-6 px-12 lg:p-0">
        <Link href="/auth/mypets">My Pets</Link>
      </h2>
      <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md md:px-36">
        {pets.map((pet, index) => (
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
                    width={200} // md:w-28 = 7rem = 112px
                    height={50} // md:h-28 = 7rem = 112px
                    className="md:w-32 md:h-32 mb-3 rounded-full shadow-lg w-16 h-16 object-cover"
                  />
                ) : (
                  <div className="mb-3 rounded-full shadow-lg bg-gray-200 w-[200px] h-[200px]" />
                )}
              </div>
              <p className="text-sm md:text-lg text-center">{pet.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetPreviewBar;
