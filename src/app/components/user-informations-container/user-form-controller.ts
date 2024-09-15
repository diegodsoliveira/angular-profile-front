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
import { requiredAddressValidator } from "../../utils/user-form-validators/required-address-validator";
import { IDependent } from "../../interfaces/user/dependent.interface";
import { UserFormRawValueService } from "../../services/user-form-raw-value.service";

export class UserFormController {
  userForm!: FormGroup;

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private readonly _fb = inject(FormBuilder);
  private readonly _userFormRawValueService = inject(UserFormRawValueService);

  constructor() {
    this.createUserForm();

    this.watchUserFormValueChangesAndUpdateService();
  }

  get generalInformations(): FormGroup {
    return this.userForm.get('generalInformations') as FormGroup;
  }

  get contactInformations(): FormGroup {
    return this.userForm.get('contactInformations') as FormGroup;
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

  get generalInformationsValid(): boolean {
    return this.generalInformations.valid;
  }

  get contactInformationsValid(): boolean {
    return this.contactInformations.valid;
  }

  get dependentsListValid(): boolean {
    return this.dependentsList.valid;
  }

  fulFilUserForm(user: IUser) {
    this.resetUserForm();
    this.fulFilGeneralInformations(user);

    this.fulFilPhoneList(user.phoneList);

    this.fulFilAddressList(user.addressList);

    this.fulFilDependentsList(user.dependentsList);

    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();
  }

  removeDependent(dependentIndex: number) {
    this.dependentsList.removeAt(dependentIndex);
    this.dependentsList.markAsDirty();
  }

  addDependent() {
    this.dependentsList.push(this.createDependentGroup());
    this.userForm.markAllAsTouched();
    this.dependentsList.markAsDirty();
  }

  private watchUserFormValueChangesAndUpdateService() {
    this.userForm.valueChanges.subscribe(() => this._userFormRawValueService.userFormRawValue = this.userForm.getRawValue());
  }

  private createDependentGroup(dependent: IDependent | null = null) {
    if (!dependent) {
      return this._fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        document: ['', Validators.required],
      });
    }
    return this._fb.group({
      name: [dependent.name, Validators.required],
      age: [dependent.age.toString(), Validators.required],
      document: [dependent.document.toString(), Validators.required],
    });
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
      this.dependentsList.push(this.createDependentGroup(dependent));
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
      }, {
        validators: requiredAddressValidator
      }));
    });
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
