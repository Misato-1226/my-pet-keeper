import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ModalProps = {
  onClose: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
  onFormSubmit: (message: string, formType: string) => void;
};

const FormSchema = z.object({
  event: z.enum(["WALKING", "VETERINARY", "GROOMING", "OTHER"], {
    errorMap: () => ({ message: "Event name is required" }),
  }),
  description: z.string().optional(),
  date: z.string(),
  startTime: z.string().optional(), // 修正: ここは string に変更
  endTime: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const FormModal: React.FC<ModalProps> = ({ onClose, onFormSubmit }) => {
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("/api/pet/register-event", {
        event: values.event,
        date: values.date,
        description: values.description,
        startTime: values.startTime,
        endTime: values.endTime,
      });
      console.log(
        values.event,
        values.date,
        values.description,
        values.startTime,
        values.endTime
      );

      if (response.status === 200) {
        onFormSubmit("Event added successfully", "new");
        console.log("Event Added Successfully");
      } else {
        onFormSubmit("Not found Event", "new");
        console.log("Event Added Failed");
      }
    } catch (error) {
      onFormSubmit("Failed to add event", "new");
      console.log("Something Went Wrong");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="w-1/2 bg-white border-8 border-customBlue2 p-6 rounded-lg z-10">
        <h2 className="text-2xl mb-4">Add Event</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center p-5"
        >
          <div className="pt-2">
            <label className="block text-xl">Event</label>
            <select
              {...register("event")}
              required
              className="border border-slate-400"
            >
              <option value="" className="text-slate-300">
                Select a Event
              </option>
              <option value="WALKING">Walking</option>
              <option value="VETERINARY">Veterinary</option>
              <option value="GROOMING">Grooming</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          {errors.event && (
            <p className="text-red-600 text-sm">{errors.event.message}</p>
          )}
          <div className="pt-2 text-xl">
            <label className="block">Date</label>
            <input {...register("date")} type="date" />
          </div>
          {errors.date && (
            <p className="text-red-600 text-sm">{errors.date.message}</p>
          )}
          <div className="pt-2 text-xl">
            <label className="block">Time</label>
            <span>Start</span>
            <input {...register("startTime")} type="time" />
            <span>End</span>
            <input {...register("endTime")} type="time" />
          </div>
          <div className="pt-2 ">
            <label className="block text-xl">Description</label>
            <textarea
              {...register("description")}
              cols={80}
              rows={4}
              className="border border-slate-400"
            />
          </div>

          <div className="px-3 inline-block">
            <button
              type="submit"
              className="text-xl bg-customBlue2 text-black py-2 px-5 rounded mt-4 hover:bg-customBlue2/80"
            >
              Add
            </button>
            <button
              className="text-xl ml-3 bg-customGrey1 text-black py-2 px-4 rounded mt-4 hover:bg-customGrey1/80"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
