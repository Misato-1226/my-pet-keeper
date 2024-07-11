"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { getWeatherData } from "@/api/weatherApi";

interface HourlyWeatherProps {
  location: string;
}

const HourlyWeatherWidget: FC<HourlyWeatherProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData(location);
        if (!data || !data.days || !data.days[0].hours) {
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
    <div className="hourly-weather-widget p-4 bg-blue-500 rounded-lg shadow-md text-white">
      <h2 className="widget-header text-xl font-bold mb-4">Hourly Weather</h2>
      <div className="widget-content flex justify-between">
        {weatherData.days[0].hours
          .slice(0, 6)
          .map((hour: any, index: number) => (
            <div
              key={index}
              className="weather-item flex flex-col items-center mx-2"
            >
              <span>
                {new Date(hour.datetimeEpoch * 1000).toLocaleTimeString(
                  "en-US",
                  { hour: "numeric", minute: "2-digit" }
                )}
              </span>
              <Image
                src={`/icons/1st-set-color/${hour.icon}.png`}
                alt={hour.icon}
                width={100}
                height={100}
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-weather-icon.png";
                }}
              />
              <span>{hour.temp}°</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HourlyWeatherWidget;
