// src/app/components/WeightTracking.tsx
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeightRecord {
  id: number;
  date: string;
  weight: number;
  note?: string;
}

const WeightTracking = () => {
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
  const [newRecord, setNewRecord] = useState({ date: '', weight: 0, note: '' });
  const [unit, setUnit] = useState('kg'); // 'kg' for kilograms, 'lb' for pounds

  const handleAddRecord = () => {
    if (!newRecord.date || newRecord.weight <= 0) return;
    const newId = weightRecords.length + 1;
    setWeightRecords([...weightRecords, { ...newRecord, id: newId }]);
    setNewRecord({ date: '', weight: 0, note: '' });
  };

  const handleDeleteRecord = (id: number) => {
    setWeightRecords(weightRecords.filter(record => record.id !== id));
  };

  const data = {
    labels: weightRecords.map(record => record.date),
    datasets: [{
      label: 'Weight',
      data: weightRecords.map(record => ({
        x: record.date,
        y: unit === 'kg' ? record.weight : record.weight * 2.20462 // Convert kg to lb if necessary
      })),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
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
        onChange={e => setNewRecord({ ...newRecord, date: e.target.value })}
      />
      <input
        type="number"
        value={newRecord.weight}
        onChange={e => setNewRecord({ ...newRecord, weight: parseFloat(e.target.value) })}
      />
      <input
        type="text"
        value={newRecord.note}
        onChange={e => setNewRecord({ ...newRecord, note: e.target.value })}
        placeholder="Optional note"
      />
      <button onClick={handleAddRecord}>Add Record</button>
      <ul>
        {weightRecords.map(record => (
          <li key={record.id}>
            {record.date} - {record.weight} kg - {record.note}
            <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightTracking;
