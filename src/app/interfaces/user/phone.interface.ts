export interface IPhone {
  type: number;
  areaCode: string;
  internationalCode: string;
  number: string;
}

export interface IAddress {
  type: number;
  street: string;
  complement: string;
  country: string;
  state: string;
  city: string;
}

export interface IDependent {
  name: string;
  age: number;
  document: number;
}
