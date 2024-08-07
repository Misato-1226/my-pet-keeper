import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeightRecord {
  id: number;
  date: string;
  weight: number; // be sure to use the correct type for the weight
  note?: string;
}

const WeightTracking = () => {
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
  const [newRecord, setNewRecord] = useState({ date: "", weight: 0, note: "" });
  const [unit, setUnit] = useState("kg"); // 'kg' for kilograms, 'lb' for pounds

  const handleAddRecord = () => {
    if (!newRecord.date || newRecord.weight <= 0) return;
    const newId = weightRecords.length + 1;
    const updatedRecords = [
      ...weightRecords,
      {
        ...newRecord,
        id: newId,
        weight: parseFloat(newRecord.weight.toString()),
      },
    ];
    updatedRecords.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ); // Sorting the records by date
    setWeightRecords(updatedRecords);
    setNewRecord({ date: "", weight: 0, note: "" });
  };

  const handleDeleteRecord = (id: number) => {
    setWeightRecords(weightRecords.filter((record) => record.id !== id));
  };

  // Ensure data is sorted before using it to set up the graph
  useEffect(() => {
    setWeightRecords((currentRecords) => {
      // Create a copy of the current records and sort them by date
      const sortedRecords = [...currentRecords];
      sortedRecords.sort((a, b) => {
        // convert the date strings to timestamps and compare them
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
      return sortedRecords; // return the sorted records
    });
  }, []);

  const data = {
    labels: weightRecords.map((record) => record.date),
    datasets: [
      {
        label: "Weight",
        data: weightRecords.map((record) => ({
          x: record.date,
          y: unit === "kg" ? record.weight : record.weight * 2.20462, // Convert kg to lb if necessary
        })),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Weight Tracking</h1>
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="kg">Kilograms</option>
        <option value="lb">Pounds</option>
      </select>
      <input
        type="date"
        value={newRecord.date}
        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
      />
      <input
        type="number"
        value={newRecord.weight.toString()} // be sure to convert the weight to a string
        onChange={(e) =>
          setNewRecord({
            ...newRecord,
            weight: parseFloat(e.target.value) || 0,
          })
        } // manage invalid input
      />
      <input
        type="text"
        value={newRecord.note}
        onChange={(e) => setNewRecord({ ...newRecord, note: e.target.value })}
        placeholder="Optional note"
      />
      <button onClick={handleAddRecord}>Add Record</button>
      <ul>
        {weightRecords.map((record) => (
          <li key={record.id}>
            {record.date} - {record.weight} {unit} - {record.note}
            <button onClick={() => handleDeleteRecord(record.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightTracking;
