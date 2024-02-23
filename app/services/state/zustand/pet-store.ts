import { create } from "zustand";
import { Pet } from "../../../utils/types";

type PetState = {
  pets: Array<Pet>;
};

type PetAction = {
  addPet: (pet: Pet) => void;
  reducePets: () => void;
};

// Create your store, which includes both state and (optionally) actions
const usePetStore = create<PetState & PetAction>((set) => ({
  pets: [],
  addPet: (pet: Pet) =>
    set((state) => ({
      pets: [
        ...state.pets,
        {
          pid: pet.pid,
          name: pet.name,
          age: pet.age,
          gender: pet.gender,
          weight: pet.weight,
          breed: pet.breed,
          color: pet.color,
          uid: pet.uid,
          image: pet.image,
        },
      ],
    })),
  reducePets: () =>
    set((state) => {
      return {
        pets: [],
      };
    }),
}));

export default usePetStore;
