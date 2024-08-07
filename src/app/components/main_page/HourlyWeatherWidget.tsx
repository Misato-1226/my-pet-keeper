"use client";

import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { getWeatherData } from "@/api/weatherApi";

interface HourlyWeatherProps {
  location: string;
}

const HourlyWeatherWidget: FC<HourlyWeatherProps> = ({ location }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const currentHourRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (currentHourRef.current) {
      currentHourRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [weatherData]);

  const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const currentHour = getCurrentHour();

  return (
    <div className="hourly-weather-widget p-4 bg-blue-500 rounded-lg shadow-md text-white max-w-full overflow-hidden">
      <h2 className="widget-header text-xl font-bold mb-4">Hourly Weather</h2>
      <div className="widget-content flex overflow-x-auto space-x-4">
        {weatherData.days[0].hours.map((hour: any, index: number) => (
          <div
            key={index}
            ref={new Date(hour.datetimeEpoch * 1000).getHours() === currentHour ? currentHourRef : null}
            className={`weather-item flex flex-col items-center mx-2 p-2 rounded-lg min-w-[80px] ${
              new Date(hour.datetimeEpoch * 1000).getHours() === currentHour
                ? "bg-yellow-500"
                : ""
            }`}
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
              width={50}
              height={50}
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
