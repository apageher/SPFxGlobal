declare interface IPersonalPropertyPaneWebPartStrings {
  // PropertyPaneDescription: string;
  // BasicGroupName: string;
  DescriptionFieldLabel: string;

  PersDataDescription: string;
  PersData_GrGeneralInfo: string;
  PersData_GrMoreInfo: string;
  NameFieldLabel: string;
  SurnameFieldLabel: string;
  DNIFieldLabel: string;
  AdultFieldLabel: string;
  AdultFieldOn: string;
  AdultFieldOff: string
  GendersFieldLabel: string;
  AgeFieldLabel: string;
  AgeMinValue: number;
  AgeMaxValue: number;
  CountryBirthLabel: string;
  LinkLabel: string;


  LaboralDataDescription: string;
  LaboralData_GrGeneralInfo: string;
  LaboralData_GrMoreInfo: string;

  Spain: string;
  France: string;
  EEUU: string;
  Germany: string;

  Male: string;
  Female: string;

  CompanyFieldLabel: string;
  AboutMeFieldLabel: string;

  Layout: string;
  Shape: string;
}

declare module 'PersonalPropertyPaneWebPartStrings' {
  const strings: IPersonalPropertyPaneWebPartStrings;
  export = strings;
}
