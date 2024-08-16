"use client";

import CalendarType from "@/types/CalendarType";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UpcomingEvent() {
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarType[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("/api/pet/get-all-events");
        if (response.status === 200) {
          console.log("Get Events Successfully");
          const allEvents: CalendarType[] = response.data;

          // 今日の日付を取得
          const today = new Date();

          // 今日以降のイベントをフィルタリングし、日付順にソート
          const upcoming = allEvents
            .filter((event) => {
              const eventDate = event.date ? new Date(event.date) : null;
              return eventDate && eventDate >= today;
            })
            .sort((a, b) => {
              const dateA = a.date ? new Date(a.date).getTime() : 0;
              const dateB = b.date ? new Date(b.date).getTime() : 0;
              return dateA - dateB; // ミリ秒で比較
            })
            .slice(0, 4); // 直近4件のイベントを取得

          setUpcomingEvents(upcoming);
        } else {
          console.log("Failed to get events");
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    getEvents();
  }, []);

  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString(); // ローカライズされた日付文字列に変換
  };

  const getIconSrc = (event: string) => {
    switch (event) {
      case "WALKING":
        return "https://img.icons8.com/?size=100&id=7qJ-AxBO6Mkj&format=png&color=000000";
      case "GROOMING":
        return "https://img.icons8.com/?size=100&id=10677&format=png&color=000000";
      case "OTHER":
        return "https://img.icons8.com/?size=100&id=106514&format=png&color=000000";
      case "VETERINARY":
        return "https://img.icons8.com/?size=100&id=LugsCp8gaLMP&format=png&color=000000";
      default:
        return "https://img.icons8.com/?size=100&id=9141&format=png&color=000000"; // デフォルトのアイコン
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 px-12 lg:px-36">Upcoming Task</h2>
      <div className="flex justify-center items-center">
        <div className="grid md:grid-cols-2 gap-6 p-8 w-9/12">
          {upcomingEvents.map((event, index) => (
            <Link key={index} href="/pet/calendar">
              <div className="bg-cyan-200 rounded-2xl flex justify-between items-center p-5 hover:scale-95 cursor-pointer duration-500">
                <Image
                  src={getIconSrc(event.event)} // デフォルト画像を指定
                  alt="event icon"
                  width={75}
                  height={75}
                />
                <div>
                  <h1 className="text-lg font-semibold">{event.event}</h1>
                  <h2>{formatDate(event.date)}</h2>
                </div>
                {event.startTime && event.endTime && (
                  <span>
                    {event.startTime}~{event.endTime}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
