declare interface ISample1Strings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'sample1Strings' {
  const strings: ISample1Strings;
  export = strings;
}
