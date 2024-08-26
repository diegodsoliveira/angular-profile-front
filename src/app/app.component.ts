import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CitiesService } from './services/cities.service';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { UsersService } from './services/users.service';
import { UsersListResponse } from './types/users-list-response';
import { IUser } from './interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;
  isInEditMode: boolean = false;

  title = 'angular-profile-front';
  usersList: UsersListResponse = [];

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService,
  ) { }
  ngOnInit() {
    // this._countriesService.getCountries().subscribe((countriesResponse) => {
    //   console.log('countriesResponse', countriesResponse);
    // });
    // this._statesService.getStates('Brazil').subscribe((statesResponse) => {
    //   console.log('statesResponse', statesResponse);
    // })
    // this._citiesService.getCities('Brazil', 'Bahia').subscribe((citiesResponse) => {
    //   console.log('citiesResponse', citiesResponse);
    // })
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
    this.isInEditMode = false;
  }
  onCancelButton() {
    this.isInEditMode = false;
  }
  onEditButton() {
    this.isInEditMode = true;
  }
}
