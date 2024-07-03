import Header from "../components/Header";
import News from "../components/main_page/News";
import UpcomingTask from "../components/main_page/UpcomingTask";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <h1>News</h1>
        <News />
        <h1>Upcoming Task</h1>
        <UpcomingTask />
      </main>
    </>
  );
}
