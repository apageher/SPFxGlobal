import { IDateTimeFieldValue } from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";

export interface IPersonalPropertyPaneProps {
  name: string;
  surname: string;
  DNI: string;
  adult: boolean;
  gender: string;
  age: number;
  countryBirth: string;
  company: string;
  aboutMe: string;
  layout: string;
  shape: string;
  htmlCode: string;
  collectionData: any[];
  color: string;
  datetime: IDateTimeFieldValue;
  multiSelect: string[];
}
