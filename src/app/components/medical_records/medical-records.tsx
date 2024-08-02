import { useState } from 'react';

interface MedicalRecord {
  id: number;
  date: string;
  note: string;
  petName: string;
}

interface Pet {
  id: number;
  name: string;
}

// example data
const samplePets: Pet[] = [
  { id: 1, name: 'Rex' },
  { id: 2, name: 'Whiskers' }
];

// Component for managing medical records
const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [newRecord, setNewRecord] = useState({ date: getCurrentDate(), note: '', petName: '' });
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showPetsDropdown, setShowPetsDropdown] = useState(false);

  const handleAddRecord = () => {
    if (!newRecord.note || !selectedPet) return;
    const newId = records.length + 1;
    setRecords([...records, { ...newRecord, id: newId, petName: selectedPet.name }]);
    setNewRecord({ date: getCurrentDate(), note: '', petName: '' }); // reset the form
    setSelectedPet(null);
  };

  const handleDeleteRecord = (id: number) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const selectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setShowPetsDropdown(false);  // close the dropdown
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Medical Records</h1>
      <div>
        <input
          type="date"
          value={newRecord.date}
          onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
          className="form-input px-4 py-2 border border-gray-300 rounded-md"
        />
        <textarea
          value={newRecord.note}
          onChange={(e) => setNewRecord({ ...newRecord, note: e.target.value })}
          placeholder="Details about the medical record"
          className="form-textarea mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={() => setShowPetsDropdown(!showPetsDropdown)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
        >
          {selectedPet ? selectedPet.name : "Select Pet"}
        </button>
        {showPetsDropdown && (
          <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
            {samplePets.map(pet => (
              <li key={pet.id} onClick={() => selectPet(pet)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {pet.name}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleAddRecord} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2">
          Add Record
        </button>
      </div>
      <ul className="list-disc pl-5">
        {records.map((record) => (
          <li key={record.id} className="mb-2">
            {record.date}: {record.note} (For {record.petName})
            <button onClick={() => handleDeleteRecord(record.id)} className="text-red-500 hover:text-red-700 ml-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (`0${today.getMonth() + 1}`).slice(-2); // Asegúrate de que el mes sea de dos dígitos
  const day = (`0${today.getDate()}`).slice(-2); // Asegúrate de que el día sea de dos dígitos
  return `${year}-${month}-${day}`;
}

export default MedicalRecords;
