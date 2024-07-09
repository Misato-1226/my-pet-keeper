"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import News from "./components/main_page/News";
import PetPreviewBar from "./components/main_page/PetPreviewBar";
import HourlyWeatherWidget from "./components/main_page/HourlyWeatherWidget";
import DailyWeatherWidget from "./components/main_page/DailyWeatherWidget";
import { getUserLocation } from "../utils/geolocation"; // Asegúrate de crear este archivo y función

const pets = [
  { name: "Dog1", icon: "🐶" },
  { name: "Cat1", icon: "🐱" },
  { name: "Dog2", icon: "🐶" },
  { name: "Cat2", icon: "🐱" },
];

export default function Page() {
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    getUserLocation()
      .then(({ latitude, longitude }) => {
        setLocation(`${latitude},${longitude}`);
      })
      .catch((error) => {
        console.error("Error getting location:", error);
        setLocation("Vancouver, BC"); // Default location if geolocation fails
      });
  }, []);

  return (
    <>
      <Link href="/home">Go to home</Link>
      <PetPreviewBar pets={pets} />
      <div className="weather-widgets flex space-x-4 mt-6">
        {location && (
          <>
            <div className="flex-1">
              <HourlyWeatherWidget location={location} />
            </div>
            <div className="flex-2">
              <DailyWeatherWidget location={location} />
            </div>
          </>
        )}
      </div>
      <News />
    </>
  );
}
