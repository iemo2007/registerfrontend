import { Address } from "./address.model";

export interface Account {
    firstName: string;
    middleName: string;
    lastName: string;
    mobileNumber: string;
    birthDate: Date;
    email: string;
    addresses: Address[];
}
