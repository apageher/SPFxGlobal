import { MSGraphClientFactory } from '@microsoft/sp-http';

export interface IMyReactHooksProps {
  description: string;
  msGraphClientFactory: MSGraphClientFactory;
}
