import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../interfaces/user/user.interface";
import { PhonesList } from "../../types/phones-list";
import { AddressList } from "../../types/address-list";
import { state } from "@angular/animations";
import { DependentsList } from "../../types/dependents-list";

export class UserFormController {
  userForm!: FormGroup;

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
    this.fulFilGeneralInformations(user);

    this.fulFilPhoneList(user.phoneList);

    this.fulFilAddressList(user.addressList);

    this.fulFilDependentsList(user.dependentsList);
    console.log(this.userForm);
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
    userAddressList.forEach((address) => {
      this.addressList.push(this._fb.group({
        type: [address.type, Validators.required],
        street: [address.street, Validators.required],
        complement: [address.complement, Validators.required],
        country: [address.country, Validators.required],
        state: [address.state, Validators.required],
        city: [address.city, Validators.required],
      }));
    });
  }
  private fulFilPhoneList(userPhoneList: PhonesList) {
    userPhoneList.forEach((phone) => {
      this.phoneList.push(this._fb.group({
        type: [phone.type, Validators.required],
        areaCode: [phone.areaCode, Validators.required],
        internationalCode: [phone.internationalCode, Validators.required],
        number: [phone.number, Validators.required],
      }));
    });
  }

  private fulFilGeneralInformations(user: IUser) {
    this.generalInformations.patchValue(user);
  }

  private createUserForm() {
    this.userForm = this._fb.group({
      generalInformations: this._fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
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
