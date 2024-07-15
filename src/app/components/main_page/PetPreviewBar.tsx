"use client";

import { FC } from "react";

interface Pet {
  name: string;
  icon: string; // Cambiado a `icon` para usar emojis
}

interface PetPreviewBarProps {
  pets: Pet[];
}

const pets = [
  { name: "Dog1", icon: "🐶" },
  { name: "Cat1", icon: "🐱" },
  { name: "Dog2", icon: "🐶" },
  { name: "Cat2", icon: "🐱" },
];

const PetPreviewBar = () => {
  return (
    <div className="lg:px-36">
      <h2 className="text-2xl font-bold mb-6 px-12 lg:p-0">My Pets</h2>
      <div className="">
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md md:px-36">
          {pets.map((pet, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:mx-4 mx-2"
            >
              <div className="md:w-28 md:h-28 w-16 h-16 flex justify-center items-center rounded-full border-2 border-gray-300 mb-2 text-4xl">
                {pet.icon}
              </div>
              <p className="text-sm md:text-lg">{pet.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetPreviewBar;
