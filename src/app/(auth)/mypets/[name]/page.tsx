"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";

export default function PetDetail() {
  const { name } = useParams();

  return (
    <div className="">
      <div className="flex justify-end p-5">
        <Link
          href={`/mypets/${name}/edit`}
          className="text-left flex items-center gap-x-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <FaRegEdit className="h-8 w-8" />
          <p>Edit</p>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="md:flex items-center gap-32">
          <Image
            className="mb-3 rounded-full shadow-lg"
            src="/"
            alt="something"
            height={200}
            width={200}
          />
          <h1 className="text-4xl text-center">wanko</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 gap-x-20 p-16 text-xl">
          <div className="text-left font-bold">Age:</div>
          <div>3</div>
          <div className="text-left font-bold">Pet Type:</div>
          <div>Dog</div>
          <div className="text-left font-bold">Gender:</div>
          <div>Female</div>
          <div className="text-left font-bold">Breed:</div>
          <div>Beagle</div>
        </div>

        <div className="flex flex-col space-y-8 p-4 md:w-2/5">
          <Link
            href="#"
            className=" w-full flex justify-between items-center bg-gray-200 px-6 py-4 rounded-full shadow-lg text-lg text-black hover:bg-gray-300 transition duration-300"
          >
            Weight Tracking <span>&gt;</span>
          </Link>
          <Link
            href="#"
            className="flex justify-between items-center bg-gray-200 px-6 py-4 rounded-full shadow-lg text-lg text-black hover:bg-gray-300 transition duration-300"
          >
            Vaccination Records <span>&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
