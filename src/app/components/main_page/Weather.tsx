"use client";

import { useEffect, useState } from "react";
import DailyWeatherWidget from "./DailyWeatherWidget";
import HourlyWeatherWidget from "./HourlyWeatherWidget";
import { getUserLocation } from "@/utils/geolocation";

export default function Weather() {
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
    <div className="p-12 lg:px-36">
      <h2 className="text-2xl font-bold mb-6">Weather</h2>
      <div className="weather-widgets 2xl:flex justify-center items-center space-x-4 2xl:mt-6">
        {location && (
          <>
            <div className="p-5">
              <HourlyWeatherWidget location={location} />
            </div>
            <div className="p-5">
              <DailyWeatherWidget location={location} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
