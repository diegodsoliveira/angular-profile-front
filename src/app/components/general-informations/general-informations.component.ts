import { IUser } from './../../interfaces/user/user.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-informations',
  templateUrl: './general-informations.component.html',
  styleUrl: './general-informations.component.scss'
})
export class GeneralInformationsComponent {
  @Input({ required: true }) user: IUser | undefined = {} as IUser;

}
