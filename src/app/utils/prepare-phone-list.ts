import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/phone-to-display.interface";
import { IPhone } from "../interfaces/user/phone.interface";
import { PhonesList } from "../types/phones-list";
import { phoneTypeDescriptionMap } from "./phone-type-description-map";

export const preparePhoneList = (
  originalUserPhoneList: PhonesList, isDisplayPhone: boolean,
  callBack: (phone: IPhoneToDisplay) => void) => {

  Object.keys(phoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
    const phoneFound = originalUserPhoneList.find((userPhone: IPhone) => userPhone.type === phoneType);

    let phoneNumber = '';

    if (isDisplayPhone) {
      phoneNumber = phoneFound ? formatPhoneNumber(phoneFound) : '-';
    } else {
      phoneNumber = phoneFound ? formatPhoneNumberToEdit(phoneFound) : '';
    }

    callBack({
      type: phoneType,
      typeDescription: phoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
      phoneNumber,
    });
  });
};

const formatPhoneNumber = (phone: IPhone) => {
  return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
};

const formatPhoneNumberToEdit = (phone: IPhone) => {
  return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace(/[+\-]/g, '');
};
