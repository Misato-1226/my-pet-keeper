"use client";

import PetPreviewBar from "@/app/components/main_page/PetPreviewBar";

import News from "../../components/main_page/News";
import UpcomingTask from "../../components/main_page/UpcomingTask";
import Weather from "@/app/components/main_page/Weather";
import { useEffect, useState } from "react";

import axios from "axios";
import PetType from "@/types/PetType";

export default function Home() {
  const [pets, setPets] = useState<PetType[]>([]);
  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await axios.get("/api/pet/get-all-pets");
        if (response.status === 200) {
          console.log("Get Pets Successfully", response.data);
          setPets(response.data);
        } else {
          console.log("Failed to get pets");
        }
      } catch (error) {
        console.log("Failed to fetching pets");
      }
    };
    getPets();
  }, []);
  return (
    <div className="flex flex-col gap-y-24 my-28">
      <PetPreviewBar pets={pets} />

      <Weather />

      <News />

      <UpcomingTask />
    </div>
  );
}
