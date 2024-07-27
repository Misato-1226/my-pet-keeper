"use client";

import Link from "next/link";
import Image from "next/image";
import { MdLogout } from "react-icons/md";
import { useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };
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

            <nav className="text-xl space-x-6 hidden md:flex">
              <Link href="/">Home</Link>
              <Link href="/mypets">My Pets</Link>
              <Link href="/calender">Calender</Link>
            </nav>
          </div>

          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-full border-2 border-gray-300 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 hidden md:block"
          >
            <Link href="/login" className="flex items-center gap-x-2">
              <p>Log out</p>
              <MdLogout className="h-5 w-5" />
            </Link>
          </button>
          <div className="md:hidden">
            <button
              onClick={handleMenuOpen}
              type="button"
              className="relative z-20 space-y-2"
            >
              <div
                className={
                  openMenu
                    ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-in-out"
                    : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
                }
              />
              <div
                className={
                  openMenu
                    ? "opacity-0 transition duration-500 ease-in-out"
                    : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
                }
              />
              <div
                className={
                  openMenu
                    ? "w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-in-out"
                    : "w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out"
                }
              />
            </button>
          </div>
          <nav
            className={
              openMenu
                ? "text-left fixed bg-slate-50 right-0 top-0 w-8/12 h-screen flex flex-col justify-start pt-8 px-3 z-10"
                : "fixed right-[-100%] z-10"
            }
          >
            <ul className="text-xl mt-36 ml-14 flex flex-col gap-y-8">
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/mypets">My Pets</Link>
              </li>
              <li>
                <Link href="/calender">Calender</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
