import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IUser } from './interfaces/user/user.interface';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;
  isInEditMode: boolean = false;
  enableSaveButton: boolean = false;
  userFormUpdated: boolean = false;

  title = 'angular-profile-front';
  usersList: UsersListResponse = [];

  constructor(
    private readonly _usersService: UsersService,
    private readonly _matDialog: MatDialog
  ) { }
  ngOnInit() {
    this._usersService.getUsers().pipe(take(1)).subscribe((usersListResponse) => this.usersList = usersListResponse);
  }

  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];
    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);
    }
  }
  onSaveButton() {
    this.openConfirmationDialog({
      title: 'Confirmar alteração de dados',
      message: 'Deseja realmente salvar os valores alterados?'
    },
      (value: boolean) => {
        if (!value) return;
        this.saveUserInfos();
        this.isInEditMode = false;
        this.userFormUpdated = false;
      }
    );

    console.log('onSaveButton');
  }

  onCancelButton() {
    if (this.userFormUpdated) {
      this.openConfirmationDialog({
        title: 'O formulário foi alterado',
        message: 'Deseja realmente cancelar as alterações feitas no formulário?'
      },
        (value: boolean) => {
          if (!value) return;
          this.isInEditMode = false;
          this.userFormUpdated = false;
        }
      );
    } else {
      this.isInEditMode = false;
    }
  }
  onEditButton() {
    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() => this.enableSaveButton = formStatus, 0);
  }

  onUserFormFirstChange() {
    this.userFormUpdated = true;;
  }

  private openConfirmationDialog(data: IDialogConfirmationData, callback: (value: boolean) => void) {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(callback);
  }

  private saveUserInfos() {
    console.log('Valores alterados!');
  }
}
