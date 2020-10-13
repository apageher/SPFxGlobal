import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneDropdownOptionType,
  IPropertyPaneDropdownOption,
  IPropertyPaneChoiceGroupOption,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneLink,
  PropertyPaneHorizontalRule,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalPropertyPaneWebPartStrings';
import PersonalPropertyPane from './components/PersonalPropertyPane';
import { IPersonalPropertyPaneProps } from './components/IPersonalPropertyPaneProps';

export interface IPersonalPropertyPaneWebPartProps {
  name: string;
  surname: string;
  DNI: string;
  adult: boolean;
  gender: string;
  age: number;
  countryBirth: string;
  link: string;
  company: string;
  aboutMe: string;
  layout: 'Brick' | 'Grid' | 'Carousel'; //Puede ser un entero o un enum
  shape: 'Circle' | 'Square' | 'Triangle'; //Puede ser un entero o un enum
}

//OK Añadir todos los tipos de propiedades
//OK Usar validaciones
//Añadir propiedades de PnP https://pnp.github.io/sp-dev-fx-property-controls
//Usar fichero LOC
//Crear un componente personalizado
//¿Nombre del WP dependiendo del idioma?

// OK Choice group
// OK Choice group de iconos
// OK Choice group de imagenes
// OK Dropdown
// OK Label
// OK Link
// OK Slider
// OK Textbox
// OK Toggle
// OK Horizontal rule
// OK Multi-line Textbox
// Button
// Custom
// Condicionales
// Opciones del PropertyPaneChoiceGroup dinamicas y property dinámicos //Mirar lo de cajas que ya empecé



export default class PersonalPropertyPaneWebPart extends BaseClientSideWebPart<IPersonalPropertyPaneWebPartProps> {

  private readonly countries: Array<IPropertyPaneDropdownOption> = [
    { key: strings.Spain, text: strings.Spain, type: PropertyPaneDropdownOptionType.Normal },
    { key: strings.France, text: strings.France, type: PropertyPaneDropdownOptionType.Normal },
    { key: strings.EEUU, text: strings.EEUU, type: PropertyPaneDropdownOptionType.Normal },
    { key: strings.Germany, text: strings.Germany, type: PropertyPaneDropdownOptionType.Normal, }
  ];

  private readonly genders: Array<IPropertyPaneChoiceGroupOption> = [
    { key: strings.Male, text: strings.Male },
    { key: strings.Female, text: strings.Female },
  ];


  public render(): void {
    const element: React.ReactElement<IPersonalPropertyPaneProps> = React.createElement(
      PersonalPropertyPane,
      {
        name: this.properties.name,
        surname: this.properties.surname,
        DNI: this.properties.DNI,
        adult: this.properties.adult,
        gender: this.properties.gender,
        age: this.properties.age,
        countryBirth: this.properties.countryBirth,
        company: this.properties.company,
        aboutMe: this.properties.aboutMe,
        layout: this.properties.layout,
        shape: this.properties.shape
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


  private simpleTextBoxValidationMethod(value: string): string {
    if (value.length < 3) {
        return "Value must be more than 3 characters!";
    } else {
      return "";
    }
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const layoutBrick: string = require('./assets/brick.svg');
    const layoutGrid: string = require('./assets/grid.svg');
    const layoutCarousel: string = require('./assets/carousel.svg');

    return {
      pages: [
        {
          header: {
            description: strings.PersDataDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.PersData_GrGeneralInfo,
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField('name', {
                  label: strings.NameFieldLabel,
                  onGetErrorMessage: this.simpleTextBoxValidationMethod,
                  validateOnFocusOut: true
                }),
                PropertyPaneTextField('surname', {
                  label: strings.SurnameFieldLabel,
                  onGetErrorMessage: this.simpleTextBoxValidationMethod,
                  deferredValidationTime: 3000,
                }),
                PropertyPaneTextField('DNI', {
                  label: strings.DNIFieldLabel,
                  maxLength: 9,
                  // onGetErrorMessage: this.simpleTextBoxValidationMethod,
                  // errorMessage: "This is the error message",
                  //deferredValidationTime: 5000,
                  //validateOnFocusOut: true
                })
              ]
            },
            {
              groupName: strings.PersData_GrMoreInfo,
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('adult', {
                  label: strings.AdultFieldLabel,
                  onText: strings.AdultFieldOn,
                  offText: strings.AdultFieldOff
                }),
                PropertyPaneChoiceGroup('gender', {
                  label: strings.GendersFieldLabel,
                  options: this.genders
                }),
                PropertyPaneSlider('age', {
                  label: strings.AgeFieldLabel,
                  min: 1,
                  max: 100
                }),
                PropertyPaneDropdown('countryBirth', {
                  label: strings.CountryBirthLabel,
                  options: this.countries
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneLink('link', {
                  href: 'https://www.google.com',
                  text: strings.LinkLabel,
                  target: '_blank'
                })
              ]
            }
          ]
        },
        {
          header: {
            description: strings.LaboralDataDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.LaboralData_GrGeneralInfo,
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField('company', {
                  label: strings.CompanyFieldLabel
                }),
                PropertyPaneTextField('aboutMe', {
                  label: strings.AboutMeFieldLabel,
                  multiline: true,
                  rows: 4,
                  maxLength: 255
                })
              ]
            },
            {
              groupName: strings.LaboralData_GrMoreInfo,
              isCollapsed: true,
              groupFields: [
                PropertyPaneChoiceGroup('layout', {
                  label: strings.Layout,
                  options: [
                    {
                      key: 'Brick',
                      text: 'Brick',
                      selectedImageSrc: layoutBrick,
                      imageSrc: layoutBrick,
                    },
                    {
                      key: 'Grid',
                      text: 'Grid',
                      selectedImageSrc: layoutGrid,
                      imageSrc: layoutGrid,
                    },
                    {
                      key: 'Carousel',
                      text: 'Carousel',
                      selectedImageSrc: layoutCarousel,
                      imageSrc: layoutCarousel,
                    }
                  ]
                }),
                PropertyPaneChoiceGroup('shape', {
                  label: strings.Shape,
                  options: [
                    {
                      key: 'Circle',
                      text: 'Circle',
                      iconProps: {
                        officeFabricIconFontName: 'CircleShapeSolid'
                      }
                    },
                    {
                      key: 'Square',
                      text: 'Square',
                      iconProps: {
                        officeFabricIconFontName: 'SquareShapeSolid'
                      }
                    },
                    {
                      key: 'Triangle',
                      text: 'Triangle',
                      iconProps: {
                        officeFabricIconFontName: 'TriangleShapeSolid'
                      }
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
