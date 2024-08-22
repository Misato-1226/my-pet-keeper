"use client";

import MedicalCard from "@/app/components/medical_records/MedicalCard";
import MedicalEditForm from "@/app/components/medical_records/MedicalEditForm";
import MedicalForm from "@/app/components/medical_records/MedicalForm";
import MedicalModal from "@/app/components/medical_records/MedicalModal";
import MedicalRecordType from "@/types/MedicalRecordType";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MedicalRecords = () => {
  const { id } = useParams() as { id: string };
  const [isClick, setIsClick] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordType[]>();
  const [activeRecordId, setActiveRecordId] = useState<number | null>(null);
  const [recordToEdit, setRecordToEdit] = useState<MedicalRecordType>();
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const petId = parseInt(id, 10);

  useEffect(() => {
    const getMedicalRecord = async () => {
      if (petId) {
        try {
          const response = await axios.get(
            `/api/pet/get-all-medical-records/${petId}`
          );

          if (response.status === 200) {
            console.log("Get Medical Records successfully", response.data);
            setMedicalRecords(response.data);
          } else {
            console.log("Failed to get Medical Records");
          }
        } catch (error) {
          console.error("Error fetching Medical Records", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getMedicalRecord();
  }, [petId, formMessage, editMessage]);

  const handleClick = () => {
    setIsClick(true);
    setIsEdit(false);
  };

  const handleClose = () => {
    setIsClick(false);
    setIsEdit(false);
  };

  const handleModalOpen = (recordId: number) => {
    setActiveRecordId(recordId);
    setIsModal(true);
  };

  const handleModalClose = () => {
    setActiveRecordId(null);
    setIsModal(false);
  };

  const handleEditOpen = (record: MedicalRecordType) => {
    setRecordToEdit(record);
    setIsEdit(true);
    setIsClick(false);
  };

  const handleFormSubmit = (message: string, formType: string) => {
    if (formType === "new") {
      setFormMessage(message);
    } else {
      setEditMessage(message);
    }
    setIsClick(false);
    setIsEdit(false);
    setTimeout(() => {
      setFormMessage(null);
      setEditMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold p-16">
        Medical Records
      </h1>
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
      <div className="px-48 text-right">
        <button
          onClick={handleClick}
          className="text-xl text-gray-900 bg-gray-300 hover:bg-gray-400 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 "
        >
          New Medical Record
        </button>
      </div>

      {isClick && (
        <MedicalForm onClose={handleClose} onFormSubmit={handleFormSubmit} />
      )}
      {recordToEdit && isEdit && (
        <MedicalEditForm
          record={recordToEdit}
          onClose={handleClose}
          onFormSubmit={handleFormSubmit}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[500px]">
          <p className="p-12 text-center">Loading...</p>
        </div>
      ) : medicalRecords && medicalRecords.length > 0 ? (
        <div className="flex justify-center flex-col">
          {medicalRecords.map((record) => (
            <div key={record.id}>
              <div
                className="px-3 md:p-10 lg:px-48 py-6"
                onClick={() => handleModalOpen(record.id)}
              >
                <MedicalCard
                  record={record}
                  onEdit={() => handleEditOpen(record)}
                  onFormSubmit={handleFormSubmit}
                />
              </div>
              {isModal && activeRecordId === record.id && (
                <MedicalModal
                  record={record}
                  onModalClose={handleModalClose}
                  onEdit={() => handleEditOpen(record)}
                  onFormSubmit={handleFormSubmit}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[500px]">
          <p className="text-center mt-10">No Medical Records found</p>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
