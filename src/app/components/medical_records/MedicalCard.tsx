import MedicalRecordType from "@/types/MedicalRecordType";
import axios from "axios";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

interface PropsType {
  onEdit: () => void;
  record: MedicalRecordType;
  onFormSubmit: (message: string, formType: string) => void;
}

const MedicalCard = (props: PropsType) => {
  const { onEdit, record, onFormSubmit } = props;
  const [isModal, setIsModal] = useState(false);

  const handleModalOpen = () => {
    setIsModal(true);
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation(); // イベントのバブリングを防ぐ
    if (confirm("Are you sure you want to delete this medical record?")) {
      try {
        const response = await axios.delete(`/api/pet/delete-medical-record`, {
          data: {
            id: record.id,
          },
        });
        if (response.status === 200) {
          onFormSubmit("Medical record deleted successfully", "delete");
          console.log("Medical Record Deleted Successfully!");
        }
      } catch (error) {
        onFormSubmit("Not found medical record", "delete");
        console.error("Error deleting medical record", error);
      }
    } else {
      onFormSubmit("Failed to delete medical record", "delete");
      console.log("Delete action cancelled");
    }
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation(); // イベントのバブリングを防ぐ
    onEdit();
  };

  return (
    <div
      onClick={handleModalOpen}
      className="bg-white border border-black p-8 hover:scale-105 cursor-pointer duration-500"
    >
      <h1 className="text-xl font-semibold">{record.title}</h1>
      <h2>{record.date}</h2>
      <div className="flex justify-end gap-x-3">
        <FaRegEdit onClick={handleEdit} className="h-8 w-8 hover:opacity-50" />
        <MdOutlineDelete
          onClick={handleDelete}
          className="h-8 w-8 hover:opacity-50"
        />
      </div>
    </div>
  );
};

export default MedicalCard;
