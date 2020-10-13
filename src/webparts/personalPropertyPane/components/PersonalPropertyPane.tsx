import * as React from 'react';
import styles from './PersonalPropertyPane.module.scss';
import { IPersonalPropertyPaneProps } from './IPersonalPropertyPaneProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'PersonalPropertyPaneWebPartStrings';

export default class PersonalPropertyPane extends React.Component<IPersonalPropertyPaneProps, {}> {
  public render(): React.ReactElement<IPersonalPropertyPaneProps> {
    return (
      <div className={styles.personalPropertyPane}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{`${strings.NameFieldLabel}: ${escape(this.props.name)}`}</p>
              <p className={styles.description}>{`${strings.SurnameFieldLabel}: ${escape(this.props.surname)}`}</p>
              <p className={styles.description}>{`${strings.DNIFieldLabel}: ${escape(this.props.DNI)}`}</p>
              <p className={styles.description}>{`${strings.AdultFieldLabel}: ${this.props.adult}`}</p>
              <p className={styles.description}>{`${strings.GendersFieldLabel}: ${escape(this.props.gender)}`}</p>
              <p className={styles.description}>{`${strings.AgeFieldLabel}: ${this.props.age}`}</p>
              <p className={styles.description}>{`${strings.CountryBirthLabel}: ${escape(this.props.countryBirth)}`}</p>
              <p className={styles.description}>{`${strings.CompanyFieldLabel}: ${escape(this.props.company)}`}</p>
              <p className={styles.description}>{`${strings.AboutMeFieldLabel}: ${escape(this.props.aboutMe)}`}</p>
              <p className={styles.description}>{`${strings.Layout}: ${escape(this.props.layout)}`}</p>
              <p className={styles.description}>{`${strings.Shape}: ${escape(this.props.shape)}`}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
