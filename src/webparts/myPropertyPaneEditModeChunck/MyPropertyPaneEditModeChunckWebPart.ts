import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MyPropertyPaneEditModeChunckWebPartStrings';
import MyPropertyPaneEditModeChunck from './components/MyPropertyPaneEditModeChunck';
import { IMyPropertyPaneEditModeChunckProps } from './components/IMyPropertyPaneEditModeChunckProps';

//En vez de importarlo, se carga solo cuando se está en modo edición del WP
//import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';

export interface IMyPropertyPaneEditModeChunckWebPartProps {
  description: string;
  numberValue: number;
}

export default class MyPropertyPaneEditModeChunckWebPart extends BaseClientSideWebPart<IMyPropertyPaneEditModeChunckWebPartProps> {
  private propertyFieldNumber;

  public render(): void {
    const element: React.ReactElement<IMyPropertyPaneEditModeChunckProps> = React.createElement(
      MyPropertyPaneEditModeChunck,
      {
        description: this.properties.description,
        value: this.properties.numberValue
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
  

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components

    const { PropertyFieldNumber } = await import (
      /* webpackChunkName: 'pnp-propcontrols-number' */
      '@pnp/spfx-property-controls/lib/propertyFields/number'
    );
    this.propertyFieldNumber = PropertyFieldNumber;
  }
  
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
                }),
                this.propertyFieldNumber('numberValue', {
                  key: "numberValue",
                  label: "Number value only",
                  value: this.properties.numberValue,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
