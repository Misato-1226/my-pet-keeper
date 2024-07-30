"use client";
import { useCallback, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick
import Modal from "@/app/components/calendar/Modal";

export default function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const events = [
    {
      id: "a", // ユニークID
      start: "2024-07-02T05:20:00", // イベント開始日
      end: "", // イベント終了日
      title: "Grooming", // イベントのタイトル
      description: "", // イベントの詳細
      backgroundColor: "blue", // 背景色
      borderColor: "blue", // 枠線色
      editable: true, // イベント操作の可否
    },
    // 省略
  ];

  const handleCustomButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="p-12">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          editable={true}
          customButtons={{
            customButton: {
              text: "Add Event",
              click: handleCustomButtonClick,
            },
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "customButton",
          }}
        />
      </div>

      {isModalOpen && <Modal onClose={handleCustomButtonClick} />}
    </>
  );
}
