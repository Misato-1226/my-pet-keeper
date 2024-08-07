"use client";

import PetType from "@/types/PetType";
import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type ContextState = {
  Pets: PetType[];
  setPets: React.Dispatch<React.SetStateAction<PetType[]>>;
};

export const PetsContext = createContext<ContextState | undefined>(undefined);

export const PetsProvider = ({ children }: Props) => {
  const [Pets, setPets] = useState<PetType[]>([]);
  return (
    <PetsContext.Provider value={{ Pets, setPets }}>
      {children}
    </PetsContext.Provider>
  );
};
