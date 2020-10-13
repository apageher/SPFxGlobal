declare interface ILazyLoadHookWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'LazyLoadHookWebPartStrings' {
  const strings: ILazyLoadHookWebPartStrings;
  export = strings;
}
