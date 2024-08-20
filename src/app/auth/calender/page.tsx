"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import type { EventClickArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FormModal from "@/app/components/calendar/FormModal";
import EventModal from "@/app/components/calendar/EventModal";
import CalendarType from "@/types/CalendarType";
import axios from "axios";
import { EditModal } from "@/app/components/calendar/EditModal";

export default function Calendar() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);
  const [modalContent, setModalContent] = useState<CalendarType>();
  const [events, setEvents] = useState<CalendarType[]>([]);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState<string | null>(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await axios.get("/api/pet/get-all-events");
        if (response.status === 200) {
          console.log("Get All Events Successfully", response);
          const events = response.data;
          const transformedEvents = events.map(transformEvent);
          setEvents(transformedEvents);
          //setEvents(events);
        } else {
          console.log("Failed to Get All Events");
        }
      } catch (error) {
        console.log("Something Went Wrong", error);
      }
    };

    const transformEvent = (event: CalendarType) => {
      const defaultTime = "09:00";
      return {
        id: event.id.toString(),
        start: `${event.date}T${event.startTime || defaultTime}`,
        end: `${event.date}T${event.endTime || defaultTime}`,
        title: event.event,
        description: event.description || "",
        backgroundColor: "blue", // 必要に応じて色を設定
        borderColor: "blue", // 必要に応じて色を設定
        editable: true, // 必要に応じて設定
      };
    };
    getEvent();
  }, [formMessage, editMessage]);

  const handleEditModal = () => {
    setIsEdit(!isEdit);
    setIsEventModalOpen(false);
  };

  const handleCustomButtonClick = () => {
    setIsFormModalOpen(!isFormModalOpen);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    //const description = clickInfo.event.extendedProps.description;
    const { description } = clickInfo.event.extendedProps;
    const id = clickInfo.event.id;
    const { title } = clickInfo.event;
    let startTime: string | undefined;
    let endTime: string | undefined;

    // `null`チェックを行う
    if (clickInfo.event._instance) {
      startTime = clickInfo.event._instance.range.start.toString();
      endTime = clickInfo.event._instance.range.end.toString();
    }

    const eventDetail = {
      id,
      description,
      event: title,
      startTime: startTime,
      endTime: endTime,
    };

    setModalContent(eventDetail);
    setIsEventModalOpen(!isEventModalOpen);
  };

  const handleEventModalClose = () => {
    setIsEventModalOpen(false);
  };

  const handleFormSubmit = (message: string, formType: string) => {
    if (formType === "new") {
      setFormMessage(message);
    } else {
      setEditMessage(message);
    }
    setIsFormModalOpen(false);
    setIsEdit(false);
    setTimeout(() => {
      setFormMessage(null);
      setEditMessage(null);
    }, 5000);
    console.log("triggered handleFormSubmit");
  };
  return (
    <>
      {formMessage && (
        <p className="text-center text-xl font-semibold mt-4 text-blue-600">
          {formMessage}
        </p>
      )}
      {editMessage && (
        <p className="text-center text-xl font-semibold mt-4 text-red-600">
          {editMessage}
        </p>
      )}
      <div className="p-12">
        <FullCalendar
          key={calendarKey}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          displayEventTime={false}
          displayEventEnd={false}
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
          eventClick={handleEventClick}
        />
      </div>

      {isFormModalOpen && (
        <FormModal
          onClose={handleCustomButtonClick}
          onFormSubmit={handleFormSubmit}
        />
      )}
      {isEventModalOpen && modalContent && (
        <EventModal
          onClose={handleEventModalClose}
          modalContent={modalContent}
          onEdit={handleEditModal}
        />
      )}
      {isEdit && (
        <EditModal
          onEdit={handleEditModal}
          modalContent={modalContent}
          onFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
