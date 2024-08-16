import CalendarType from "@/types/CalendarType";
import axios from "axios";
import React from "react";

interface PropsType {
  onClose: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
  onEdit: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
  modalContent: CalendarType;
}

const EventModal: React.FC<PropsType> = ({ onClose, onEdit, modalContent }) => {
  const startTime = modalContent.startTime
    ? new Date(modalContent.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const endTime = modalContent.endTime
    ? new Date(modalContent.endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await axios.delete("/api/pet/delete-event", {
          data: {
            id: modalContent.id,
          },
        });
        if (response.status === 200) {
          console.log("Event Deleted Successfully");
        }
      } catch (error) {
        console.error("Error deleting event", error);
      }
    } else {
      console.log("Delete action cancelled");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="w-1/2 h-1/2 bg-white border-8 border-customBlue2 p-6 rounded-lg z-10">
        <div className="text-right">
          <button onClick={onClose} className="text-3xl">
            x
          </button>
        </div>
        <h2 className="text-2xl mb-4">Event Detail</h2>
        <div className="flex flex-col justify-center p-5">
          <h2 className="text-xl font-bold">
            {modalContent.event}{" "}
            <span className="text-md font-medium">
              {startTime}~{endTime}
            </span>
          </h2>

          <p className="mt-8">{modalContent.description}</p>
        </div>
        {/* <form className="flex flex-col justify-center p-5">
          <div className="pt-2">
            <label className="block text-xl">Title</label>
            <select required className="border border-slate-400">
              <option value="" className="text-slate-300">
                Select a Event
              </option>
              <option value="walking">Walking</option>
              <option value="veterinary">Veterinary</option>
              <option value="grooming">Grooming</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="pt-2 text-xl">
            <label className="block">Time</label>
          </div>
          <div className="pt-2 ">
            <label className="block text-xl">Detail</label>
            <textarea cols={80} rows={4} className="border border-slate-400" />
          </div>
        </form> */}
        <div className="px-3 inline-block">
          <button
            onClick={onEdit}
            className="text-xl bg-customBlue2 text-black py-2 px-5 rounded mt-4 hover:bg-customBlue2/80"
          >
            Edit
          </button>
        </div>
        <div className="px-3 inline-block">
          <button
            onClick={handleDelete}
            className="text-xl bg-red-600 text-white py-2 px-4 rounded mt-4 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
