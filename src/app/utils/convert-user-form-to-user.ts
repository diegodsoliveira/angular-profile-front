import { formatNumber } from './format-number';
import {
  IUserForm,
  IUserFormAddress,
  IUserFormDependent,
  IUserFormGeneralInformations,
  IUserFormPhone,
} from '../interfaces/user-form.interface';
import { IUser } from '../interfaces/user/user.interface';
import { AddressList } from '../types/address-list';
import { DependentsList } from '../types/dependents-list';
import { PhonesList } from '../types/phones-list';
import { convertDateObjToPtBrDate } from './convert-date-obj-to-pt-br-date';

export const convertUserFormToUser = (userForm: IUserForm): IUser => {
  let newUser: Partial<IUser> = {} as IUser;

  newUser = { ...convertGeneralInformations(userForm.generalInformations) };
  newUser.phoneList = [
    ...convertPhoneList(userForm.contactInformations.phoneList),
  ];
  newUser.addressList = [
    ...convertAddressList(userForm.contactInformations.addressList),
  ];
  newUser.dependentsList = [...convertDependentsList(userForm.dependentsList)];

  return newUser as IUser;
};

const convertGeneralInformations = (
  generalInformations: IUserFormGeneralInformations
): Partial<IUser> => {
  return {
    name: generalInformations.name,
    email: generalInformations.email,
    country: generalInformations.country,
    state: generalInformations.state,
    maritalStatus: generalInformations.maritalStatus,
    monthlyIncome: generalInformations.monthlyIncome,
    birthDate: convertDateObjToPtBrDate(generalInformations.birthDate),
  };
};

const convertPhoneList = (phoneList: IUserFormPhone[]): PhonesList => {
  const newUserPhoneList: PhonesList = phoneList
    .map((phone) => ({
      type: phone.type,
      internationalCode: '+' + phone.phoneNumber.substring(0, 2),
      areaCode: phone.phoneNumber.substring(2, 4),
      number: formatNumber(phone.phoneNumber.substring(4)),
    }))
    .filter((phone) => phone.areaCode !== '');

  return newUserPhoneList;
};

const convertAddressList = (addressList: IUserFormAddress[]): AddressList => {
  const newUserAddressList: AddressList = addressList
    .map((address) => ({
      type: address.type,
      street: address.street,
      complement: address.complement,
      city: address.city,
      state: address.state,
      country: address.country,
    }))
    .filter((address) => address.street !== '');

  return newUserAddressList;
};

const convertDependentsList = (
  dependentsList: IUserFormDependent[]
): DependentsList => {
  const newUserDependentList: DependentsList = dependentsList.map(
    (dependent) => ({
      name: dependent.name,
      age: Number(dependent.age),
      document: Number(dependent.document),
    })
  );

  return newUserDependentList;
};
