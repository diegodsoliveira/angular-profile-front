import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { PhonesList } from "../../types/phones-list";

export interface IUser {
  name: string;
  email: string;
  country: string;
  state: string;
  maritalStatus: number;
  monthlyIncome: number;
  birthDate: string;
  phoneList: PhonesList;
  addressList: AddressList;
  dependentsList: DependentsList;
}
