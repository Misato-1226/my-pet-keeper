import PetCard from "@/app/components/my_pets/pet_card";
import Link from "next/link";

const fakePets = [
  {
    name: "wanko",
    petType: "dog",
    breed: "beagle",
    gender: "female",
    age: 3,
    weight: 10,
  },
  {
    name: "wanko",
    petType: "dog",
    breed: "beagle",
    gender: "female",
    age: 3,
    weight: 10,
  },
  {
    name: "wanko",
    petType: "dog",
    breed: "beagle",
    gender: "female",
    age: 3,
    weight: 10,
  },
  {
    name: "wanko",
    petType: "dog",
    breed: "beagle",
    gender: "female",
    age: 3,
    weight: 10,
  },
];

export default function Mypets() {
  return (
    <>
      <div className="flex justify-end p-8">
        <Link
          href="/mypets/register"
          className="text-gray-900 bg-customGrey1 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Register a New Pet
        </Link>
      </div>
      <h1 className="text-center">My Pets</h1>
      <div className="md:grid grid-cols-2 justify-center gap-24 p-32 md:p-20 lg:p-52">
        {fakePets.map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
      </div>
    </>
  );
}
