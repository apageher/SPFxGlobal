import * as React from 'react';
import { IMyReactClassComponentProps } from './IMyReactClassComponentProps';
import PnPSPDataFromSP from './PnPSPDataFromSP/PnPSPDataFromSP';


export default class MyReactClassComponent extends React.Component<IMyReactClassComponentProps> {

  public render(): React.ReactElement<IMyReactClassComponentProps> {

    return (
      <>
        <h1>Class component</h1>
        <PnPSPDataFromSP description={this.props.description}></PnPSPDataFromSP>
      </>
    );
  }
}
