"use client";

import PetCard from "@/app/components/my_pets/pet_card";
import PetType from "@/types/PetType";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

// Fetch pets data from server
export default function Mypets() {
  const [pets, setPets] = useState<PetType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await axios.get("/api/pet/get-all-pets");
        if (response.status === 200) {
          console.log("Get Pets Successfully", response.data);
          setPets(response.data);
        } else {
          console.error("Failed to get pets");
        }
      } catch (error) {
        console.error("Failed to fetch pets", error);
      } finally {
        setLoading(false);
      }
    };
    getPets();
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
      <div className=" p-4 rounded-lg shadow-md md:px-3">
        {loading ? (
          <div className="flex justify-center items-center min-h-[510px]">
            <p className="text-center">Loading...</p>
          </div>
        ) : pets.length > 0 ? (
          <div className="justify-center items-center md:grid grid-cols-2 gap-24 p-12 md:p-12 lg:py-52 lg:px-20">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl mt-36">No pet registered</p>
        )}
      </div>
    </>
  );
}
