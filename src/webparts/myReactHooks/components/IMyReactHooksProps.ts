import { MSGraphClientFactory, AadHttpClientFactory } from '@microsoft/sp-http';


export interface IMyReactHooksProps {
  description: string;
  msGraphClientFactory: MSGraphClientFactory;
  aadHttpClientFactory: AadHttpClientFactory;
}
