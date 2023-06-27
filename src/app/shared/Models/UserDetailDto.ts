export class UserDetailDto {
    customerId: string = '';
    fromName: string = '';
    fromProfilePic: string = '';
    fromFullName:string = '';
    customerDetails: CustomerDetailDto[] = [];
    secondaryProfiles: SecondaryProfileDto[] = [];
  }

  export class CustomerDetailDto {
    email: string = '';
    phoneNumber: string = '';
    landlinenumber: string = '';
    address: string = '';
    organization: string = '';
    role: string = '';
    city: string = '';
    country: string = '';
    fatherName: string = '';
    education: string = '';
    bloodGroup: string = '';
  }

  export class SecondaryProfileDto {
    customerUniqueId: string = '';
    platform: string = '';
  }