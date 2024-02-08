import { create } from "zustand";
import { Pet, UserToRegister } from "../../../utils/types";

type PetState = {
  pets: Array<Pet>;
};

type PetAction = {
  addPet: (pet: Pet, uid: string) => void;
  reducePet: (pet: Pet) => void;
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
        },
      ],
    })),
  reducePet: (pet: Pet) =>
    set((state) => {
      return {
        pets: state.pets.filter((p) => p.pid !== pet.pid),
      };
    }),
}));

export default usePetStore;
