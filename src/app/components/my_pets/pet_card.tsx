"use client";
import Image from "next/image";
import Link from "next/link";

export default function PetCard({ pet }: { pet: any }) {
  return (
    <div className="mb-28 md:mb-0 bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-105 duration-500">
      <Link href={`/mypets/${pet.name}`}>
        <div className="flex flex-col items-center pt-10">
          <Image
            className=" mb-3 rounded-full shadow-lg"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
            width={200}
            height={200}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {pet.name}
          </h5>

          <div className=" grid grid-cols-2 gap-x-24 text-sm text-gray-500 dark:text-gray-400 mx-40 leading-5">
            <div className="">Pet Type:</div>
            <div>{pet.petType}</div>
            <div className="">Breed:</div>
            <div>{pet.breed}</div>
            <div className="">Gender:</div>
            <div>{pet.gender}</div>
            <div className="">Age:</div>
            <div>{pet.age}</div>
            <div className="">Weight:</div>
            <div>{pet.weight}</div>
          </div>
        </div>
      </Link>
      <div className="flex justify-center my-4 md:mt-6">
        <Link
          href={`/mypets/${pet.name}/edit`}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
