import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider"; // import修正
import { PetsProvider } from "./contexts/Pets";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PetsProvider>
          <Provider>{children}</Provider>
        </PetsProvider>
      </body>
    </html>
  );
}
