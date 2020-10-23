import * as React from 'react';
import styles from './MyThemeVariants.module.scss';
import { IMyThemeVariantsProps } from './IMyThemeVariantsProps';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export default class MyThemeVariants extends React.Component<IMyThemeVariantsProps, {}> {

  public render(): React.ReactElement<IMyThemeVariantsProps> {

    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;
    console.log('semanticColors.bodyBackground: ', semanticColors.bodyBackground);
    console.log('semanticColors.bodyText: ', semanticColors.bodyText);
    return (
      <>
        <div className={styles.myThemeVariants}>
          <div className={styles.container}>
            <div className={styles.row2}>
              <div className={styles.column}>
                <div style={{ backgroundColor: semanticColors.bodyBackground, color: semanticColors.bodyText }}>
                  <span className={styles.title2}>Welcome to SharePoint!</span>
                  <p className={styles.subTitle2}>This web part is theme variant aware.</p>
                </div>
              </div>
            </div>
            <div className={styles.myClass1}>
              <p>Esto es una prueba</p>
            </div>
            <div className={styles.myClass2}>
              <p>Esto es otra prueba</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
