import { create } from "zustand";
import { UserToRegister } from "../../../utils/types";

type PetState = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  contactNumber: string;
};

type PetAction = {
  updatePet: (user: UserToRegister) => void;
};

// Create your store, which includes both state and (optionally) actions
const usePetStore = create<PetAction & PetState>((set) => ({
  id: "",
  name: "",
  lastName: "",
  email: "",
  contactNumber: "",
  updatePet: (user: UserToRegister) =>
    set((state) => ({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
    })),
}));

export default usePetStore;
