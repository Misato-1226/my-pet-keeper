import MedicalRecordType from "@/types/MedicalRecordType";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

interface PropsType {
  record: MedicalRecordType;
  onClose: () => void;
  onFormSubmit: (message: string, formType: string) => void;
}

const MedicalEditForm = (props: PropsType) => {
  const { record, onClose, onFormSubmit } = props;
  useEffect(() => {
    setValue("date", record.date);
    setValue("veterinaryClinic", record.veterinaryClinic);
    setValue("veterinarian", record.veterinarian);
    setValue("title", record.title);
    setValue("notes", record.notes);
  }, [record]);

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
        onFormSubmit("Medical record updated successfully", "update");
        console.log("Medical Record Update success");
      } else {
        onFormSubmit("Not found medical record", "update");
        console.log("Medical Record Update failed");
      }
    } catch (error) {
      onFormSubmit("Failed to updated medical record", "update");
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
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
        >
          Update Record
        </button>
      </form>
    </div>
  );
};

export default MedicalEditForm;
