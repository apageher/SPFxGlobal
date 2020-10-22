import { DisplayMode } from '@microsoft/sp-core-library';
import { IPropertyPaneAccessor } from '@microsoft/sp-webpart-base';

export interface IPnPControlsProps {
  description: string;
  propertyPane: IPropertyPaneAccessor;
  displayMode: DisplayMode;
  showAccordion: boolean;
  showCarousel:  boolean;
  showGridLayout: boolean;
  showMap:  boolean;
}
