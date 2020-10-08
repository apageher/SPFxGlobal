import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'MyReactClassComponentWebPartStrings';
import MyReactClassComponent from './components/MyReactClassComponent';
import { IMyReactClassComponentProps } from './components/IMyReactClassComponentProps';

export interface IMyReactClassComponentWebPartProps {
  description: string;
}

import { sp } from "@pnp/sp";

export default class MyReactClassComponentWebPart extends BaseClientSideWebPart<IMyReactClassComponentWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  
  public render(): void {
    const element: React.ReactElement<IMyReactClassComponentProps> = React.createElement(
      MyReactClassComponent,
      {
        description: this.properties.description,
        msGraphClientFactory: this.context.msGraphClientFactory
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
