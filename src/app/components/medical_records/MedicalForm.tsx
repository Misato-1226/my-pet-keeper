"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  veterinaryClinic: z.string().optional(),
  veterinarian: z.string().optional(),
  notes: z.string().optional(),
  date: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

// Component for managing medical records
const MedicalForm = ({
  onClose,
  onFormSubmit,
}: {
  onClose: MouseEventHandler;
  onFormSubmit: (message: string, formType: string) => void;
}) => {
  const { id } = useParams() as { id: string };
  const [isClose, setIsClose] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("/api/pet/medical_record", {
        title: values.title,
        veterinaryClinic: values.veterinaryClinic,
        veterinarian: values.veterinarian,
        notes: values.notes,
        date: values.date,
        petId: parseInt(id, 10),
      });
      if (response.status === 200) {
        onFormSubmit("Medical Record added successfully", "new");
        console.log("Medical Record Registration success");
      } else {
        onFormSubmit("Failed to add Medical Record", "new");
        console.log("Medical Record Registration failed");
      }
    } catch (error) {
      onFormSubmit("Error adding Medical Record", "new");
      console.error("Medical Record Registration error", error);
    }
  };

  if (!isClose) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Medical Records
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="date"
            {...register("date")}
            className="form-input px-4 py-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="form-input ml-2 px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title.message}</p>
          )}
          <input
            type="text"
            placeholder="Veterinary Clinic"
            {...register("veterinaryClinic")}
            className="form-input ml-2 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Veterinarian"
            {...register("veterinarian")}
            className="form-input ml-2 px-4 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            {...register("notes")}
            cols={10}
            rows={10}
            placeholder="Details about the medical record"
            className="form-textarea mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
          />

          <button
            type="button"
            className="
          px-4
          py-2
          bg-slate-400
          text-white
          rounded-md
          hover:bg-slate-500
          mt-2
          "
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="ml-3 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 mt-2"
          >
            Add Record
          </button>
        </form>
      </div>
    );
  }
};

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2); // Asegúrate de que el mes sea de dos dígitos
  const day = `0${today.getDate()}`.slice(-2); // Asegúrate de que el día sea de dos dígitos
  return `${year}-${month}-${day}`;
}

export default MedicalForm;
