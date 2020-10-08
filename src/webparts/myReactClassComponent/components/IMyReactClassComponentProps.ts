import { MSGraphClientFactory } from '@microsoft/sp-http';

export interface IMyReactClassComponentProps {
  description: string;
  msGraphClientFactory: MSGraphClientFactory;
}
