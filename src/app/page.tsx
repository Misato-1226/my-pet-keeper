"use client";

import Link from "next/link";
import News from "./components/main_page/News";
import PetPreviewBar from "./components/main_page/PetPreviewBar";
import Weather from "./components/main_page/Weather";
import UpcomingTask from "./components/main_page/UpcomingEvent";

export default function Page() {
  return (
    <>
      <Link href="/home">Go to home</Link>
      <div className="flex flex-col gap-y-20">
        <PetPreviewBar />
        <Weather />
        <News />
        <UpcomingTask />
      </div>
    </>
  );
}
