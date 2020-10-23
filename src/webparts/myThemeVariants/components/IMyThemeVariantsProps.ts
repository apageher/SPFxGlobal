import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IMyThemeVariantsProps {
  description: string;
  themeVariant: IReadonlyTheme | undefined;
}
