export default interface PetType {
  id: number;
  name: string;
  petType: string;
  gender: string;
  breed: string;
  birthday: string;
  image: { data: number[] };
}
