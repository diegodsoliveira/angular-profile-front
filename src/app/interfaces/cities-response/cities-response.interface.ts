import { CitiesList } from "../../types/cities-list";
import { IbaseCountriesResponse } from "../base-countries-response.interface";

export interface ICitiesResponse extends IbaseCountriesResponse {
  data: CitiesList;
}
