import MedicalRecordType from "@/types/MedicalRecordType";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import { MdOutlineDelete } from "react-icons/md";

interface PropsType {
  onEdit: () => void;
  record: MedicalRecordType;
}

const MedicalCard = (props: PropsType) => {
  const { onEdit, record } = props;

  const [isModal, setIsModal] = useState(false);

  const handleModalOpen = () => {
    setIsModal(true);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this medical record?")) {
      try {
        const response = await axios.delete(`/api/pet/delete-medical-record`, {
          data: {
            id: record.id,
          },
        });
        if (response.status === 200) {
          console.log("Medical Record Deleted Successfully");
        }
      } catch (error) {
        console.error("Error deleting medical record", error);
      }
    } else {
      console.log("Delete action cancelled");
    }
  };

  return (
    <div
      onClick={handleModalOpen}
      className="bg-white border border-black p-8 hover:scale-105 cursor-pointer duration-500"
    >
      <h1 className="text-xl font-semibold">{record.title}</h1>
      <h2>{record.date}</h2>
      <div className="flex justify-end gap-x-3">
        <FaRegEdit onClick={onEdit} className="h-8 w-8 hover:opacity-50" />

        <MdOutlineDelete
          onClick={handleDelete}
          className="h-8 w-8 hover:opacity-50"
        />
      </div>
    </div>
  );
};

export default MedicalCard;
