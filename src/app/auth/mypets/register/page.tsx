"use client";

import { useState } from "react";
import Image from "next/image";

export default function Register() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <h1 className="mt-24 text-3xl font-bold text-center">
        Register a New Pet
      </h1>
      <form className="max-w-full p-12 md:mx-52 lg:mx-80">
        <div className="flex flex-col justify-center items-center mb-10">
          <label className="cursor-pointer flex flex-col justify-center items-center">
            <input
              type="file"
              onChange={handleImageUpload}
              id="file-upload"
              className="opacity-0 w-0"
              accept="image/*"
            />

            {image ? (
              <img
                src={image}
                alt="Uploaded Preview"
                className="h-36 w-36 object-cover border border-slate-300 rounded-full hover:opacity-70"
              />
            ) : (
              <Image
                alt="upload image"
                width={150}
                height={150}
                src="https://img.icons8.com/?size=100&id=hAyHNAngD4aQ&format=png&color=000000"
                className="border border-slate-300 rounded-full hover:opacity-60"
              />
            )}
          </label>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-full mx-auto">
            <label className="block text-gray-700 font-bold text-xl text-left">
              Pet Type
            </label>
            <div className="flex gap-x-10 mb-8">
              <div className="flex items-center">
                <input id="dog" type="radio" name="petType" className="mr-2" />
                <label htmlFor="dog" className="text-xl text-gray-700">
                  Dog
                </label>
              </div>
              <div className="flex items-center">
                <input id="cat" type="radio" name="petType" className="mr-2" />
                <label htmlFor="cat" className="text-xl text-gray-700">
                  Cat
                </label>
              </div>
            </div>
          </div>
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 font-bold text-xl text-left"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              className="border border-gray-300 p-2 rounded w-full mb-8"
            />
          </div>
          <div className="w-full mx-auto">
            <label className="block text-gray-700 font-bold text-xl text-left">
              Gender
            </label>
            <div className="flex gap-x-10 mb-8">
              <div className="flex items-center">
                <input id="male" type="radio" name="gender" className="mr-2" />
                <label htmlFor="male" className="text-xl text-gray-700">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  className="mr-2"
                />
                <label htmlFor="female" className="text-xl text-gray-700">
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="unknown"
                  type="radio"
                  name="gender"
                  className="mr-2"
                />
                <label htmlFor="unknown" className="text-xl text-gray-700">
                  Unknown
                </label>
              </div>
            </div>
          </div>
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 font-bold text-xl text-left"
              htmlFor="birthday"
            >
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              className="border border-gray-300 p-2 rounded w-full mb-8"
            />
          </div>
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 font-bold text-xl text-left"
              htmlFor="breed"
            >
              Breed
              <span className="font-normal px-2">※choose pet type first</span>
            </label>
            <select
              id="breed"
              className="border border-gray-300 p-2 rounded w-full mb-8"
            >
              <option value="">Select a breed</option>
              <option value="breed1">Breed 1</option>
              <option value="breed2">Breed 2</option>
            </select>
          </div>
          <div className="w-full mx-auto text-center">
            <button
              type="submit"
              className="text-xl bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
