import Link from "next/link";
import Image from "next/image";
import { MdLogout } from "react-icons/md";

export default function Header() {
  return (
    <header className="fixed w-full bg-customBlue2 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image
                src="/header_icon.png"
                alt="My Pet Keeper"
                width={175}
                height={50}
              />
            </Link>
            <nav className="space-x-6">
              <Link href="/">Home</Link>
              <Link href="/mypets">My Pets</Link>
              <Link href="/calender">Calender</Link>
            </nav>
          </div>

          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-300 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <Link href="/login" className="flex items-center gap-x-2">
              <p>Log out</p>
              <MdLogout className="h-5 w-5" />
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
}
