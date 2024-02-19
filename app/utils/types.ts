

export type FormDataToRegisterAPet = {
  pid?: string
  Age: string;
  Breed: string;
  Color: string;
  Gender: string;
  Height: string;
  Name: string;
  Weight: string;
  uid: string[];
};

export type User = {
  uid: string | null; // email
  displayName?: string | null;
  email: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId: string | null; // Password
};

export type UserToRegister = {
  uid: any;
  name: "";
  lastname: "";
  email: "";
  contactNumber: "";
  petsId: []
};
export type UserToUpdate = {
  uid: any;
  name: string;
  lastname: string;
  email: string;
  contactNumber: string;
  petsId: []
};

export type Pet = {
  pid?: "",
  name: "";
  age: "";
  gender: "";
  weight: "";
  breed: "";
  color: "";
  uid: [""];
  image: ""
};

export enum ToastType {
  success = 'success',
  error = 'error',
  info = 'info'
}
