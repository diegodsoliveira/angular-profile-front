import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PhoneTypeEnum } from "../../enums/phone-type.enum";
import { IUser } from "../../interfaces/user/user.interface";
import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { PhonesList } from "../../types/phones-list";
import { convertPtBrDateToDateObj } from "../../utils/convert-pt-br-date-to-date-obj";
import { preparePhoneList } from "../../utils/prepare-phone-list";
import { prepareAddressList } from "../../utils/prepare-address-list";

export class UserFormController {
  userForm!: FormGroup;

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private _fb = inject(FormBuilder);

  constructor() {
    this.createUserForm();
  }

  get generalInformations(): FormGroup {
    return this.userForm.get('generalInformations') as FormGroup;
  }

  get phoneList(): FormArray {
    return this.userForm.get('contactInformations.phoneList') as FormArray;
  }

  get addressList(): FormArray {
    return this.userForm.get('contactInformations.addressList') as FormArray;
  }

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }

  fulFilUserForm(user: IUser) {
    this.resetUserForm();
    this.fulFilGeneralInformations(user);

    this.fulFilPhoneList(user.phoneList);

    this.fulFilAddressList(user.addressList);

    this.fulFilDependentsList(user.dependentsList);
  }

  private resetUserForm() {
    this.userForm.reset();

    this.generalInformations.reset();

    this.phoneList.reset()
    this.phoneList.clear();

    this.addressList.reset()
    this.addressList.clear();

    this.dependentsList.reset()
    this.dependentsList.clear();

  }
  private fulFilDependentsList(userDependentsList: DependentsList) {
    userDependentsList.forEach((dependent) => {
      this.dependentsList.push(this._fb.group({
        name: [dependent.name, Validators.required],
        age: [dependent.age, Validators.required],
        document: [dependent.document, Validators.required],
      }));
    });

  }
  private fulFilAddressList(userAddressList: AddressList) {
    prepareAddressList(userAddressList, false, (address) => {
      this.addressList.push(this._fb.group({
        type: [address.type],
        typeDescription: [{ value: address.typeDescription, disabled: true }],
        street: [address.street],
        complement: [address.complement],
        country: [address.country],
        state: [address.state],
        city: [address.city],
      }));
    });
    console.log('addressList', this.addressList);

  }
  private fulFilPhoneList(userPhoneList: PhonesList) {
    preparePhoneList(userPhoneList, false, (phone) => {
      const phoneValidators = phone.type === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];

      this.phoneList.push(this._fb.group({
        type: [phone.type],
        typeDescription: [phone.typeDescription],
        phoneNumber: [phone.phoneNumber, phoneValidators]
      }));
    });

    console.log('formPhoneList', this.phoneList);

  }

  private fulFilGeneralInformations(user: IUser) {
    const newUser = {
      ...user,
      birthDate: convertPtBrDateToDateObj(user.birthDate)
    };

    this.generalInformations.patchValue(newUser);
  }

  private createUserForm() {
    this.userForm = this._fb.group({
      generalInformations: this._fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        country: ['', Validators.required],
        state: ['', Validators.required],
        maritalStatus: [null, Validators.required],
        monthlyIncome: [null, Validators.required],
        birthDate: [null, Validators.required],
      }),
      contactInformations: this._fb.group({
        phoneList: this._fb.array([]),
        addressList: this._fb.array([]),
      }),
      dependentsList: this._fb.array([]),
    });
  }
}
