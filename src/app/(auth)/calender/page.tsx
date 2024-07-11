"use client";
import { useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; // needed for dayClick

export default function Calendar() {
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

  const handleDateClick = useCallback((arg: DateClickArg) => {
    alert(arg.dateStr);
  }, []);
  return (
    <div className="p-12">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={true}
        editable={true}
        dateClick={handleDateClick}
      />
    </div>
  );
}
