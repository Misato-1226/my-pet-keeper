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
        }
      }
    };

    getMedicalRecord();
  }, [petId]);

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

  return (
    <div>
      <h1 className="text-center text-3xl font-semibold p-16">
        Medical Records
      </h1>
      <div className="px-48 text-right">
        <button
          onClick={handleClick}
          className="text-xl text-gray-900 bg-customGrey1 border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          New Medical Record
        </button>
      </div>

      {isClick && <MedicalForm onClose={handleClose} />}
      {recordToEdit && isEdit && (
        <MedicalEditForm record={recordToEdit} onClose={handleClose} />
      )}

      {medicalRecords && medicalRecords.length > 0 ? (
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
                />
              </div>
              {isModal && activeRecordId === record.id && (
                <MedicalModal
                  record={record}
                  onModalClose={handleModalClose}
                  onEdit={() => handleEditOpen(record)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No Medical Records found</p>
      )}
    </div>
  );
};

export default MedicalRecords;
