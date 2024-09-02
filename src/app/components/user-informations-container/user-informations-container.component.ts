import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges {
  currentTabIndex: number = 2;

  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) userSelected: IUser = {} as IUser;

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTabIndex = 0;

    const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      this.fulFilUserForm(this.userSelected);
    }

  }
}
