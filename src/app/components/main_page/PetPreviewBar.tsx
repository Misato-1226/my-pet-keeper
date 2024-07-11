"use client";

import { FC } from "react";

interface Pet {
  name: string;
  icon: string; // Cambiado a `icon` para usar emojis
}

interface PetPreviewBarProps {
  pets: Pet[];
}

const PetPreviewBar: FC<PetPreviewBarProps> = ({ pets }) => {
  return (
    <div className="p-12">
      <h2 className="text-2xl font-bold mb-6">My Pets</h2>
      <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
        {pets.map((pet, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <div className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-gray-300 mb-2 text-4xl">
              {pet.icon}
            </div>
            <p className="text-sm">{pet.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetPreviewBar;
