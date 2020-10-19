import * as React from 'react';
import styles from './MyPropertyPaneEditModeChunck.module.scss';
import { IMyPropertyPaneEditModeChunckProps } from './IMyPropertyPaneEditModeChunckProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class MyPropertyPaneEditModeChunck extends React.Component<IMyPropertyPaneEditModeChunckProps, {}> {
  public render(): React.ReactElement<IMyPropertyPaneEditModeChunckProps> {
    return (
      <div className={ styles.myPropertyPaneEditModeChunck }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }>Number: {this.props.value}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
