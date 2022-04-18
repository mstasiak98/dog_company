export interface RegistrationData {
  account_data: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNo: string,
  };
  personal_data: {
    city: string,
    street: string,
    zipCode: string,
    houseNo: string,
    flatNo: string,
  };
  additional_data: {
    info: string,
  };
}
