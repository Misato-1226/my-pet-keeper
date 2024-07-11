import PetPreviewBar from "@/app/components/main_page/PetPreviewBar";
import Header from "../../components/Header";
import News from "../../components/main_page/News";
import UpcomingTask from "../../components/main_page/UpcomingTask";
import Weather from "@/app/components/main_page/Weather";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-24 my-28">
      <PetPreviewBar />

      <Weather />

      <News />

      <UpcomingTask />
    </div>
  );
}
