export default function Register() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-24">Register a New Pet</h1>
      <form>
        {/* <input type="file" name="image" accept="image/png, image/jpeg" /> */}

        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <label className="flex flex-col items-center justify-center text-center">
          <svg
            className="w-12 h-12 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm7 1a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V7a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-gray-500">Upload Image</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-24 gap-8">
          <div>
            <label className="block text-gray-700 font-bold mb-8 text-xl">
              Pet Type
            </label>
            <div className="flex gap-x-10">
              <div className="flex items-center mb-4">
                <input id="dog" type="radio" name="petType" className="mr-2" />
                <label htmlFor="dog" className="text-gray-700">
                  Dog
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input id="cat" type="radio" name="petType" className="mr-2" />
                <label htmlFor="cat" className="text-gray-700">
                  Cat
                </label>
              </div>
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-8 text-xl"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-8 text-xl">
              Gender
            </label>
            <div className="flex gap-x-10">
              <div className="flex items-center mb-4">
                <input id="male" type="radio" name="gender" className="mr-2" />
                <label htmlFor="male" className="text-gray-700">
                  Male
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  className="mr-2"
                />
                <label htmlFor="female" className="text-gray-700">
                  Female
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="unknown"
                  type="radio"
                  name="gender"
                  className="mr-2"
                />
                <label htmlFor="unknown" className="text-gray-700">
                  Unknown
                </label>
              </div>
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-8 text-xl"
              htmlFor="breed"
            >
              Breed
              <span className="font-normal px-2">choose pet type first</span>
            </label>
            <select
              id="breed"
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select a breed</option>
              <option value="breed1">Breed 1</option>
              <option value="breed2">Breed 2</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
