import News from "../components/main_page/News";
import UpcomingTask from "../components/main_page/UpcomingTask";

export default function Home() {
  return (
    <>
      <h1>News</h1>
      <News />
      <h1>Upcoming Task</h1>
      <UpcomingTask />
    </>
  );
}
