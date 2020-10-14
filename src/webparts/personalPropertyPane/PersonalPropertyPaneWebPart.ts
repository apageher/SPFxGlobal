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
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel,
  PropertyPaneChoiceGroup,
  IPropertyPaneGroup,
  IPropertyPaneConditionalGroup,
  IPropertyPaneTextFieldProps,
  IPropertyPaneToggleProps,
  IPropertyPaneField
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
  conversationSource: 'Group' | 'User' | 'Topic' | 'Home';
  searchCriteria: string;
  numberOfConversations: number;
  btnNormal: string;
  btnPrimary: string;
  btnHero: string;
  btnCommand: string;
  btnCompound: string;
  btnIcon: string;
  textoTest: string;
  toggleAllEvents: boolean;

  headerType:string;
  title: string;
  subTitle?: string;
  enabled?: boolean;
  descriptionCustom?: string;
}

//OK Añadir todos los tipos de propiedades
//OK Usar validaciones
//Añadir propiedades de PnP https://pnp.github.io/sp-dev-fx-property-controls
//OK Usar fichero LOC
//Crear un componente personalizado
//OK Nombre del WP dependiendo del idioma

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
// OK Button
// OK Condicionales
// Custom
// Opciones del PropertyPaneChoiceGroup dinamicas (carga de lista o items de SP) https://docs.microsoft.com/es-es/sharepoint/dev/spfx/web-parts/guidance/use-cascading-dropdowns-in-web-part-properties


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

  private readonly headerTypeOptions: Array<IPropertyPaneDropdownOption> = [
    {
      index: 0,
      key: strings.Option1,
      text: strings.Option1,
      type: PropertyPaneDropdownOptionType.Normal
    },
    {
      index: 1,
      key: strings.Option2,
      text: strings.Option2,
      type: PropertyPaneDropdownOptionType.Normal
    },
    {
      index: 2,
      key: strings.Option3,
      text: strings.Option3,
      type: PropertyPaneDropdownOptionType.Normal
    }
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
        shape: this.properties.shape,
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
      return strings.ErrorValidationString;
    } else {
      return "";
    }
  }

  private WPPropButtonClick(): void {
    console.log("Botón pulsado");
  }

  private heroButtonClick(oldVal: any): any {
    if (oldVal === "Something old") {
      console.log("Algo");
    }
    return "Something new";
  }

  private ButtonClick(oldVal: any): any {
    this.properties.textoTest = "Actualizado";
    return "test";
  }

  private getPropertyPaneCustomConfiguration = (): Array<IPropertyPaneGroup | IPropertyPaneConditionalGroup> => {

    let collectionDataGroupFields: Array<IPropertyPaneField<IPropertyPaneTextFieldProps | IPropertyPaneToggleProps | void>> = [
      PropertyPaneDropdown('headerType', {
        label: strings.HeaderType,
        options: this.headerTypeOptions
      })
    ];

    let collectionDataGroup: IPropertyPaneGroup | IPropertyPaneConditionalGroup = {
      isCollapsed: false,
      groupName: strings.CollectionDataGroupName,
      groupFields: collectionDataGroupFields
    };

    let result: Array<IPropertyPaneGroup | IPropertyPaneConditionalGroup> = [
      collectionDataGroup
    ];

    const { headerType } = this.properties;

    collectionDataGroup.groupFields = collectionDataGroupFields.concat(this.createHeaderPropertyPane(headerType));

    return result;
  }


  private createHeaderPropertyPane = (headerType: string): Array<IPropertyPaneField<IPropertyPaneTextFieldProps | IPropertyPaneToggleProps | void>> => {
    let result: Array<IPropertyPaneField<IPropertyPaneTextFieldProps | IPropertyPaneToggleProps | void>> = [];

    const commonProperties = this.getCommonProperties();

    switch (headerType) {
      case this.headerTypeOptions[0].key:
        const sectionHeaderSimpleOnlyTitleProperties: Array<IPropertyPaneField<IPropertyPaneTextFieldProps | IPropertyPaneToggleProps | void>> = [
          PropertyPaneToggle('enabled', {
            label: strings.Enabled,
            checked: true,
            onText: strings.EnabledOnText,
            offText: strings.EnabledOffText,
          })
        ];
        result = commonProperties.concat(sectionHeaderSimpleOnlyTitleProperties);
        break;
      case this.headerTypeOptions[1].key:
        const sectionHeaderSubtitleProperties: Array<IPropertyPaneField<IPropertyPaneTextFieldProps | IPropertyPaneToggleProps | void>> = [
          PropertyPaneTextField('subTitle', {
            label: strings.SubTitleLabel
          })
        ];
        result = commonProperties.concat(sectionHeaderSubtitleProperties);
        break;
      case this.headerTypeOptions[2].key:
        const sectionHeaderSimpleTitleLinkProperties: Array<IPropertyPaneField<IPropertyPaneTextFieldProps | IPropertyPaneToggleProps | void>> = [
          PropertyPaneTextField('descriptionCustom', {
            label: strings.DescriptionCustomLabel
          })
        ];
        result = commonProperties.concat(sectionHeaderSimpleTitleLinkProperties);
        break;
    }
    return result;
  }


  private getCommonProperties = () => {
    let result: Array<IPropertyPaneField<IPropertyPaneTextFieldProps | IPropertyPaneToggleProps | void>> = [
      PropertyPaneTextField('title', {
        label: strings.TitleLabel
      }),
    ];
    return result;
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    //Ejemplo de PropertyPaneChoiceGroup con imagenes
    const layoutBrick: string = require('./assets/brick.svg');
    const layoutGrid: string = require('./assets/grid.svg');
    const layoutCarousel: string = require('./assets/carousel.svg');

    //Ejemplo de controles condicionales (Page 3)
    let allEventsUrl: any;
    if (this.properties.toggleAllEvents) {
      allEventsUrl = PropertyPaneSlider('maxEvents', {
        label: "Max events",
        min: 1,
        max: 10,
        value: 1,
        showValue: true,
        step: 1
      });
    }
    else {
      allEventsUrl = PropertyPaneLabel('emptyLabel', {
        text: ""
      });
    }



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
                  maxLength: 9
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
        },
        {
          header: {
            description: strings.ConditionalFieldDescription
          },
          displayGroupsAsAccordion: false,
          groups: [
            {
              groupFields: [
                PropertyPaneDropdown('conversationSource', {
                  label: strings.CFconversationSource,
                  selectedKey: this.properties.conversationSource,
                  options: [
                    {
                      key: "Group",
                      text: "Group"
                    },
                    {
                      key: "User",
                      text: "User"
                    },
                    {
                      key: "Topic",
                      text: "Topic"
                    },
                    {
                      key: "Home",
                      text: "Home"
                    },
                  ]
                }),
                this.properties.conversationSource !== "Home" && PropertyPaneTextField('searchCriteria', {
                  label: strings.CFsearchCriteria,
                  placeholder: strings.CFsearchCriteriaPlaceHolder,
                }),
                PropertyPaneDropdown('numberOfConversations', {
                  disabled: this.properties.conversationSource !== "Home",
                  label: strings.CFnumberConversations,
                  selectedKey: this.properties.conversationSource,
                  options: [
                    {
                      key: 4,
                      text: "Small - 4 conversations"
                    },
                    {
                      key: 8,
                      text: "Medium - 8 conversations"
                    },
                    {
                      key: 12,
                      text: "Large - 12 conversations"
                    }
                  ]
                })
              ]
            },
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('toggleAllEvents', {
                  key: 'toggleAllEvents',
                  label: '',
                  checked: false,
                  onText: "Some text",
                  offText: "Some other text",
                }),
                allEventsUrl
              ]
            }
          ]
        },
        {
          header: {
            description: strings.ConditionalFieldDescriptionTwo
          },
          displayGroupsAsAccordion: false,
          groups: this.getPropertyPaneCustomConfiguration()
        },
        {
          header: {
            description: strings.MyButtons,
          },
          displayGroupsAsAccordion: false,
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('textoTest', {
                  label: strings.ChangeMe
                }),
                PropertyPaneButton('btnNormal', {
                  text: strings.BtnNormalButton,
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.ButtonClick.bind(this)
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneButton('btnPrimary', {
                  text: strings.BtnPrimaryButton,
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: this.WPPropButtonClick
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneButton('btnHero', {
                  text: strings.BtnHeroButton,
                  buttonType: PropertyPaneButtonType.Hero,
                  icon: 'Add',
                  onClick: this.heroButtonClick,
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneButton('btnCommand', {
                  text: strings.BtnCommandButton,
                  buttonType: PropertyPaneButtonType.Command,
                  onClick: this.WPPropButtonClick,
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneButton('btnCompound', {
                  text: strings.BtnCompoundButton,
                  buttonType: PropertyPaneButtonType.Compound,
                  description: strings.BtnCompoundButtonDescripcion,
                  onClick: this.WPPropButtonClick,
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneButton('btnIcon', {
                  text: strings.BtnIconButton,
                  buttonType: PropertyPaneButtonType.Icon,
                  icon: 'AddFriend',
                  onClick: this.WPPropButtonClick
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
