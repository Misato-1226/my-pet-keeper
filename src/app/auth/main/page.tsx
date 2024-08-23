"use client";

import PetPreviewBar from "@/app/components/main_page/PetPreviewBar";

import News from "../../components/main_page/News";
import Weather from "@/app/components/main_page/Weather";
import { useEffect, useState } from "react";

import axios from "axios";
import PetType from "@/types/PetType";
import UpcomingEvent from "../../components/main_page/UpcomingEvent";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-24 mt-28">
      <PetPreviewBar />
      <UpcomingEvent />
      <Weather />

      <News />
    </div>
  );
}
