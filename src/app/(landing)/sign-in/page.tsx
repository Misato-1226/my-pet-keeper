"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have more than 6 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      router.push("/auth/main");
    }
  };
  return (
    <div className="md:flex justify-center items-center min-h-screen bg-customBlue1">
      <div className="flex flex-1 md:h-screen justify-center">
        <div className="relative w-full h-full hidden md:block">
          <Image
            src="/landing2.png"
            alt="My Pets Keeper"
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
        <form
          className="space-y-6 w-3/4"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Log in to our platform
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              href="/sign-up"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
