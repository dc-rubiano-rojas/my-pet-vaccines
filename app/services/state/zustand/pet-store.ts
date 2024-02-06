import { create } from "zustand";
import { Pet, UserToRegister } from "../../../utils/types";

type PetState = {
  pets: Array<Pet>;
};

type PetAction = {
  updatePet: (pet: Pet) => void;
};

// Create your store, which includes both state and (optionally) actions
const usePetStore = create<PetState & PetAction>((set) => ({
  pets: [],
  updatePet: (pet: Pet) =>
    set((state) => ({
      pets: [
        ...state.pets,
        {
          name: pet.name,
          age: pet.age,
          gender: pet.gender,
          weight: pet.weight,
          breed: pet.breed,
          color: pet.color,
        },
      ],
    })),
}));

export default usePetStore;
