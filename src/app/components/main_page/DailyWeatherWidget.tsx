"use client";

import { FC, useEffect, useState } from "react";
import { getWeatherData } from "@/api/weatherApi";
import Image from "next/image";

interface DailyWeatherProps {
  location: string;
}

const DailyWeatherWidget: FC<DailyWeatherProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData(location);
        if (!data || !data.days) {
          throw new Error("Invalid weather data");
        }
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setError("Failed to fetch weather data");
      }
    };

    fetchWeatherData();
  }, [location]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="daily-weather-widget p-4 bg-blue-500 rounded-lg shadow-md text-white">
      <h2 className="widget-header text-xl font-bold mb-4">Daily Weather</h2>
      <div className="widget-content flex justify-between">
        {weatherData.days.slice(0, 7).map((day: any, index: number) => (
          <div
            key={index}
            className="weather-item flex flex-col items-center mx-2"
          >
            <span>
              {new Date(day.datetimeEpoch * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </span>
            <Image
              src={`/icons/1st-set-color/${day.icon}.png`}
              alt={day.icon}
              width={100}
              height={100}
              className="w-8 h-8"
              onError={(e) => {
                e.currentTarget.src = "/fallback-weather-icon.png";
              }}
            />
            <span>
              {day.tempmax}° / {day.tempmin}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWeatherWidget;
