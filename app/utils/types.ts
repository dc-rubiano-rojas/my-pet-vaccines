export type DataFormMyType = {
  Name: string;
  Lastname: string;
  Email: string;
  "Confirm Email": string;
  Password: string;
  "Confirm Password": string;
};

export type FormDataToRegisterAPet = {
  Age: string;
  Breed: string;
  Color: string;
  Gender: string;
  Height: string;
  Name: string;
  Weight: string;
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
  name: "";
  lastName: "";
  email: "";
  contactNumber: "";
};