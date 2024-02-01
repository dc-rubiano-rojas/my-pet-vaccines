export type DataFormMyType = {
  Name: string;
  Lastname: string;
  Email: string;
  "Confirm Email": string;
  Password: string;
  "Confirm Password": string;
};

export type FormDataToRegisterAPet = {
  Age: string,
  Breed: string,
  Color: string,
  Gender: string,
  Height: string,
  Name: string,
  Weight: string
}

export type User = {
  displayName?: string | null;
  email: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId: string | null; // Password
  uid: string | null; // email
};
