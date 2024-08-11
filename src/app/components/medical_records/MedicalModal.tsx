import MedicalRecordType from "@/types/MedicalRecordType";
import axios from "axios";
import { useParams } from "next/navigation";

interface PropsType {
  onModalClose: () => void;
  onEdit: () => void;
  record: MedicalRecordType;
}

const MedicalModal = (props: PropsType) => {
  const { onModalClose, onEdit, record } = props;

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onModalClose}
      ></div>

      <div className="w-3/4 h-1/2 bg-white border-8 border-customBlue2 p-6 rounded-lg z-10 overflow-auto">
        <div className="text-right">
          <button onClick={onModalClose} className="text-3xl">
            x
          </button>
        </div>
        <h1 className="text-3xl mb-4 font-semibold">{record.title}</h1>
        <span>{record.date}</span>
        <p className="text-xl">{record.notes}</p>

        <div className="px-3 inline-block">
          <button
            onClick={onEdit}
            className="text-xl bg-customBlue2 text-white py-2 px-5 rounded mt-4 hover:bg-customBlue2/80"
          >
            Edit
          </button>
        </div>
        <div className="px-3 inline-block">
          <button
            onClick={handleDelete}
            className="text-xl bg-red-600 text-white py-2 px-5 rounded mt-4 hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalModal;
