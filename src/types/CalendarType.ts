export default interface CalendarType {
  id: string;
  date?: string | Date;
  startTime?: string;
  endTime?: string;
  event: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  editable?: boolean;
  //   backgroundColor: string;
  //   editable: true;
}
