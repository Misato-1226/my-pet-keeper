"use client";

import MedicalRecordType from "@/types/MedicalRecordType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  notes: z.string().optional(),
  date: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

// Component for managing medical records
const MedicalForm = ({ onClose }: { onClose: MouseEventHandler }) => {
  const { id } = useParams();
  const [isClose, setIsClose] = useState(false);
  const [records, setRecords] = useState<MedicalRecordType[]>([]);

  //const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  // const [showPetsDropdown, setShowPetsDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post("/api/pet/register-medical-record", {
        title: values.title,
        notes: values.notes,
        date: values.date,
        petId: parseInt(id, 10),
      });
      if (response.status === 200) {
        console.log("Medical Record Registration success");
      } else {
        console.log("Medical Record Registration failed");
      }
    } catch (error) {
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

          <textarea
            {...register("notes")}
            cols={10}
            rows={10}
            placeholder="Details about the medical record"
            className="form-textarea mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          {/* <button
          onClick={() => setShowPetsDropdown(!showPetsDropdown)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
        >
          {selectedPet ? selectedPet.name : "Select Pet"}
        </button>
        {showPetsDropdown && (
          <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
            {samplePets.map((pet) => (
              <li
                key={pet.id}
                onClick={() => selectPet(pet)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {pet.name}
              </li>
            ))}
          </ul>
        )} */}

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
          >
            Add Record
          </button>
          <button
            className="
          px-4
          py-2
          bg-green-500
          text-white
          rounded-md
          hover:bg-green-600
          mt-2
          "
            onClick={onClose}
          >
            Close
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
