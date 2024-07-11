"use client";

import Image from "next/image";

const fakeTasks = [
  {
    title: "Walking",
    date: "2024/7/1",
    time: "13:00",
    icon: "https://img.icons8.com/?size=100&id=7qJ-AxBO6Mkj&format=png&color=000000",
  },
  {
    title: "Grooming",
    date: "2024/7/1",
    time: "13:00",
    icon: "https://img.icons8.com/?size=100&id=10677&format=png&color=000000",
  },
  {
    title: "Shower",
    date: "2024/7/1",
    time: "13:00",
    icon: "https://img.icons8.com/?size=100&id=9141&format=png&color=000000",
  },
  {
    title: "Veterinary",
    date: "2024/7/1",
    time: "13:00",
    icon: "https://img.icons8.com/?size=100&id=LugsCp8gaLMP&format=png&color=000000",
  },
];

export default function UpcomingTask() {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 px-12 lg:px-36">Upcoming Task</h2>
      <div className="flex justify-center items-center">
        <div className="grid md:grid-cols-2 gap-6 p-8 w-9/12 ">
          {fakeTasks.map((task, index) => (
            <div
              key={index}
              className="bg-cyan-200 rounded-2xl flex justify-between items-center p-5 hover:scale-95 cursor-pointer duration-500"
            >
              <Image src={task.icon} alt="something" width={75} height={75} />
              <div>
                <h1 className="text-lg font-semibold">{task.title}</h1>
                <h2>{task.date}</h2>
              </div>
              <span>{task.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
