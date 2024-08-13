"use client";

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
import WeightRecordType from "@/types/WeightRecordType";
import axios from "axios";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { log } from "console";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  weight: z.string().optional(),
  notes: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const WeightTracking = () => {
  const { id } = useParams() as { id: string };

  //useEffectで体重データを取得。
  useEffect(() => {
    const getWeights = async () => {
      try {
        const response = await axios.get(`/api/pet/get-all-weights/${id}`);
        const weights = response.data;
        weights.sort(
          (a: WeightRecordType, b: WeightRecordType) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        ); // Sorting the records by date
        setWeightRecords(weights);

        if (response.status === 200) {
          console.log("Get Weights Successfully", weights);
        } else {
          console.log("Failed to fetch Weights");
        }
      } catch (error) {
        console.log("Error fetching Weights", error);
      }
    };
    getWeights();
  }, [id]);

  const [weightRecords, setWeightRecords] = useState<WeightRecordType[]>([]);
  const [newRecord, setNewRecord] = useState({ date: "", weight: 0, note: "" });
  const [unit, setUnit] = useState("kg"); // 'kg' for kilograms, 'lb' for pounds

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const handleAddRecord = async (values: z.infer<typeof FormSchema>) => {
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

    try {
      const response = await axios.post("/api/pet/register-weight", {
        date: values.date,
        weight: values.weight,
        notes: values.notes,
        petId: parseInt(id, 10),
      });
      if (response.status === 200) {
        console.log("Weights Added Successfully");
      } else {
        console.log("Weights Added Failed");
      }
    } catch (error) {
      console.log("Something Went Wrong");
    }
  };

  const handleDeleteRecord = async (id: number) => {
    if (confirm("Are you sure you want to delete this weight record?")) {
      try {
        const response = await axios.delete("/api/pet/delete-weight", {
          data: {
            id,
          },
        });
        if (response.status === 200) {
          console.log("Weight Deleted Successfully");
        } else {
          console.log("Weight not Found");
        }
        setWeightRecords(weightRecords.filter((record) => record.id !== id));
      } catch (error) {
        console.log("Weight Delete Failed", error);
      }
    } else {
      console.log("Delete action cancelled");
    }
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
    <>
      <h1 className="text-center text-3xl font-semibold p-16">
        Weights Tracking
      </h1>
      <div className="p-20">
        <select
          className="text-2xl"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option className="text-2xl" value="kg">
            Kilograms
          </option>
          <option className="text-2xl" value="lb">
            Pounds
          </option>
        </select>
        <div>
          <input
            className="text-2xl mt-3"
            type="date"
            {...register("date")}
            onChange={(e) =>
              setNewRecord({ ...newRecord, date: e.target.value })
            }
          />
          <input
            type="number"
            {...register("weight")}
            className="text-2xl ml-6"
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                weight: parseFloat(e.target.value) || 0,
              })
            } // manage invalid input
          />
        </div>
        <button
          onClick={handleSubmit(handleAddRecord)}
          className="bg-customBlue2 text-white text-lg px-3 py-2 rounded-lg hover:opacity-70"
        >
          Add Record
        </button>

        <Line data={data} options={options} />
        <ul>
          {weightRecords.map((record) => (
            <li key={record.id} className="text-xl py-2">
              {record.date} - {record.weight} {unit} - {record.notes}
              <button
                onClick={() => handleDeleteRecord(record.id)}
                className="text-red-600 hover:opacity-65"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WeightTracking;
