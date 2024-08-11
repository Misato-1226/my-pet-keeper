import MedicalRecordType from "@/types/MedicalRecordType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  notes: z.string().optional(),
  date: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const MedicalEditForm = ({ record }: { record: MedicalRecordType }) => {
  useEffect(() => {
    setValue("date", record.date);
    setValue("title", record.title);
    setValue("notes", record.notes);
  }, []);
  const { id } = useParams() as { id: string };
  const [newRecord, setNewRecord] = useState({
    date: record.date,
    title: record.title,
    notes: record.notes,
    petId: parseInt(id, 10),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.put("/api/pet/update-medical-record", {
        id: record.id,
        title: values.title,
        notes: values.notes,
        date: values.date,
      });
      if (response.status === 200) {
        console.log("Medical Record Update success");
      } else {
        console.log("Medical Record Update failed");
      }
    } catch (error) {
      console.error("Medical Record Update error", error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Medical Records</h1>
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
          className="
            px-4
            py-2
            bg-green-500
            text-white
            rounded-md
            hover:bg-green-600
            mt-2
            "
          //onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
        >
          Update Record
        </button>
      </form>
    </div>
  );
};

export default MedicalEditForm;
