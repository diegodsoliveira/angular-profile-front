import { Injectable } from "@angular/core";
import { IUserForm } from "../interfaces/user-form.interface";

@Injectable({
  providedIn: 'root',
})
export class UserFormRawValueService {
  userFormRawValue: IUserForm = {} as IUserForm;


}
