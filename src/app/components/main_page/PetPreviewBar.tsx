"use client";

import { useContext } from "react";
import Link from "next/link";
import { PetsContext } from "@/app/contexts/Pets"; // Ajusta la ruta según tu estructura de proyecto

const PetPreviewBar = () => {
  const Pets = useContext(PetsContext);

  if (!Pets || Pets.Pets.length === 0) {
    return <p>No pets found.</p>;
  }

  return (
    <div className="lg:px-36">
      <Link href="/auth/mypets">
        <h2 className="text-2xl font-bold mb-6 px-12 lg:p-0">My Pets</h2>
        <div className="">
          <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md md:px-36">
            {Pets.Pets.slice(0, 4).map((pet) => (
              <div
                key={pet.id}
                className="flex flex-col items-center md:mx-4 mx-2 hover:scale-110 duration-200"
              >
                <Link href={`/auth/mypets/${pet.id}`}>
                  <div className="md:w-28 md:h-28 w-16 h-16 flex justify-center items-center rounded-full border-2 border-gray-300 mb-2 bg-gray-200">
                    {pet.image ? (
                      <img
                        src={`data:image/*;base64,${pet.image}`}
                        alt={`${pet.name}'s photo`}
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <span>🐾</span> // Placeholder if no image
                    )}
                  </div>
                  <p className="text-sm md:text-lg">{pet.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PetPreviewBar;
