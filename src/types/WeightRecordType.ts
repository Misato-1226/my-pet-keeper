export default interface WeightRecordType {
  id: number;
  date: string;
  weight: number; // be sure to use the correct type for the weight
  note?: string;
}
