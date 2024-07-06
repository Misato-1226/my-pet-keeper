import Image from "next/image";

export default function SignIn() {
  return (
    <div className="md:flex justify-center items-center min-h-screen bg-customBlue1">
      <div className="flex flex-1 md:h-screen justify-center">
        <div className="relative w-full h-full hidden md:block">
          <Image
            src="/landing2.png"
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="block p-10 mb-5 md:hidden ">
          {/*image for smaller than md screen*/}
          <Image
            src="/landing_mobile2.png"
            alt="My Pets Keeper"
            width={400}
            height={200}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <form className="space-y-6 w-3/4" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Welcome to My Pet Keeper!
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Enter your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create a new account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have a account?{" "}
            <a
              href="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Log in here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
