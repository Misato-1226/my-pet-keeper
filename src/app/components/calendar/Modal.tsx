import React from "react";

type ModalProps = {
  onClose: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
};

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="w-1/2 h-1/2 bg-white border-8 border-customBlue2 p-6 rounded-lg z-10">
        <h2 className="text-2xl mb-4">Add Event</h2>
        <form className="flex flex-col justify-center p-5">
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
        </form>
        <div className="px-3 inline-block">
          <button className="text-xl bg-customBlue2 text-black py-2 px-5 rounded mt-4 hover:bg-customBlue2/80">
            Add
          </button>
        </div>
        <div className="px-3 inline-block">
          <button
            className="text-xl bg-customGrey1 text-black py-2 px-4 rounded mt-4 hover:bg-customGrey1/80"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
