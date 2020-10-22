import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPControlsWebPartStrings';
import PnPControls from './components/PnPControls';
import { IPnPControlsProps } from './components/IPnPControlsProps';

export interface IPnPControlsWebPartProps {
  description: string;
  showAccordion: boolean,
  showCarousel: boolean,
  showGridLayout: boolean,
  showMap: boolean
}

export default class PnPControlsWebPart extends BaseClientSideWebPart<IPnPControlsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPnPControlsProps> = React.createElement(
      PnPControls,
      {
        description: this.properties.description,
        propertyPane: this.context.propertyPane,
        displayMode: this.displayMode,
        showAccordion: this.properties.showAccordion,
        showCarousel: this.properties.showCarousel,
        showGridLayout: this.properties.showGridLayout,
        showMap: this.properties.showMap
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneToggle('showAccordion', {
                  label: strings.ShowAccordion,
                  onText: strings.Yes,
                  offText: strings.No
                }),
                PropertyPaneToggle('showCarousel', {
                  label: strings.ShowCarousel,
                  onText: strings.Yes,
                  offText: strings.No
                }),
                PropertyPaneToggle('showGridLayout', {
                  label: strings.ShowGridLayout,
                  onText: strings.Yes,
                  offText: strings.No
                }),
                PropertyPaneToggle('showMap', {
                  label: strings.ShowMap,
                  onText: strings.Yes,
                  offText: strings.No
                })
              ]
            }
          ]
        }
      ]
    };
  }
}


