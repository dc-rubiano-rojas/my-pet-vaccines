import { create } from "zustand";
import { UserToRegister } from "../../../utils/types";

type UserState = {
  uid: any;
  name: string;
  lastName: string;
  email: string;
  contactNumber: string;
};

type UserAction = {
  updateUser: (user: UserToRegister) => void;
};

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<UserState & UserAction>((set) => ({
  uid: "",
  name: "",
  lastName: "",
  email: "",
  contactNumber: "",
  updateUser: (user: UserToRegister) =>
    set((state) => ({
      uid: user.uid,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      contactNumber: user.contactNumber,
    })),
}));

export default useUserStore;
