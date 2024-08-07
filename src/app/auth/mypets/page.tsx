"use client";

import PetCard from "@/app/components/my_pets/pet_card";
import PetType from "@/types/PetType";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PetsContext } from "@/app/contexts/Pets";

//fetch pets data from server

export default function Mypets() {
  const Pets = useContext(PetsContext);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await axios.get(`/api/pet/get-all-pets`);
        if (response.status === 200) {
          const pets = response.data;
          console.log(pets);
          Pets?.setPets(pets);
        } else {
          console.error("Failed to fetch pets");
        }
      } catch (error) {
        console.error("Error fetching image", error);
      }
    }

    fetchPets();
  }, []);
  return (
    <>
      <div className="flex justify-end p-8">
        <Link
          href="/auth/mypets/register"
          className="text-xl text-gray-900 bg-customGrey1 border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Register a New Pet
        </Link>
      </div>
      <h1 className="text-center text-4xl font-bold">My Pets</h1>
      <div className="md:grid grid-cols-2 justify-center gap-24 p-12 md:p-12 lg:p-52">
        {Pets?.Pets.map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
      </div>
    </>
  );
}
