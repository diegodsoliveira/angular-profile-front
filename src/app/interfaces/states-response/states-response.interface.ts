import { IbaseCountriesResponse } from "../base-countries-response.interface";

export interface IStatesResponse extends IbaseCountriesResponse {
  data: IStateResponseData;
}

export interface IStateResponseData {
  name: string;
  iso3: string;
  states: IState[];
}

export interface IState {
  name: string;
  state_code: string;
}
