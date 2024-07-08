import { CountriesList } from "../../types/countries-list";
import { IbaseCountriesResponse } from "../base-countries-response.interface";

export interface ICountriesResponse extends IbaseCountriesResponse {
  data: CountriesList;
}
