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

import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import { IDateTimeFieldValue } from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";
import { PropertyFieldMessage } from '@pnp/spfx-property-controls/lib/PropertyFieldMessage';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonalPropertyPaneWebPartStrings';
import PersonalPropertyPane from './components/PersonalPropertyPane';
import { IPersonalPropertyPaneProps } from './components/IPersonalPropertyPaneProps';
// import { DayOfWeek } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
// import { MessageBarType } from 'office-ui-fabric-react/lib/components/MessageBar';
import { DayOfWeek, MessageBarType } from 'office-ui-fabric-react';

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

  headerType: string;
  title: string;
  subTitle?: string;
  enabled?: boolean;
  descriptionCustom?: string;

  //Propiedades de los controles de PnP
  htmlCode: string;
  collectionData: any[];
  color: string;
  datetime: IDateTimeFieldValue;
  multiSelect: string[];
  toggleInfoHeaderValue: boolean;
}

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
        htmlCode:this.properties.htmlCode,
        collectionData: this.properties.collectionData,
        color: this.properties.color,
        datetime: this.properties.datetime,
        multiSelect: this.properties.multiSelect
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
        },
        {
          header: {
            description: strings.PnPPropertyControlsDescription,
          },
          displayGroupsAsAccordion: false,
          groups: [
            {
              groupFields: [
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'Edit HTML Code',
                  panelTitle: 'Edit HTML Code',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML
                }),
                PropertyPaneHorizontalRule(),
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "Title",
                      title: "Firstname",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "Lastname",
                      title: "Lastname",
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: "Age",
                      title: "Age",
                      type: CustomCollectionFieldType.number,
                      required: true
                    },
                    {
                      id: "City",
                      title: "Favorite city",
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: "antwerp",
                          text: "Antwerp"
                        },
                        {
                          key: "helsinki",
                          text: "Helsinki"
                        },
                        {
                          key: "montreal",
                          text: "Montreal"
                        }
                      ],
                      required: true
                    },
                    {
                      id: "Sign",
                      title: "Signed",
                      type: CustomCollectionFieldType.boolean
                    }
                  ],
                  disabled: false
                }),
                PropertyPaneHorizontalRule(),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyPaneHorizontalRule(),
                PropertyFieldDateTimePicker('datetime', {
                  label: 'Select the date and time',
                  initialDate: this.properties.datetime,
                  dateConvention: DateConvention.DateTime,
                  timeConvention: TimeConvention.Hours24,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId',
                  showLabels: false,
                  firstDayOfWeek: DayOfWeek.Monday
                }),
                PropertyPaneHorizontalRule(),
                PropertyFieldMessage("", {
                  key: "MessageKey",
                  text: "Something went wrong... try later.",
                  messageType: MessageBarType.error,
                  isVisible: true
                }),
                PropertyPaneHorizontalRule(),
                PropertyFieldMultiSelect('multiSelect', {
                  key: 'multiSelect',
                  label: "Multi select field",
                  options: [
                    {
                      key: "EN",
                      text: "EN"
                    },
                    {
                      key: "FR",
                      text: "FR"
                    },
                    {
                      key: "NL",
                      text: "NL"
                    }
                  ],
                  selectedKeys: this.properties.multiSelect
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneWebPartInformation({
                  description: `This is a <strong>demo webpart</strong>, used to demonstrate all the <a href="https://aka.ms/sppnp">PnP</a> property controls`,
                  moreInfoLink: `https://pnp.github.io/sp-dev-fx-property-controls/`,
                  videoProperties: {
                    embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                    properties: { allowFullScreen: true}
                  },
                  key: 'webPartInfoId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
