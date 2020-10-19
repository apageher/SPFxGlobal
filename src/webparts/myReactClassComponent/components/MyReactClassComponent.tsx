import * as React from 'react';
import { IMyReactClassComponentProps } from './IMyReactClassComponentProps';
import PnPSPDataFromSP from './PnPSPDataFromSP/PnPSPDataFromSP';
import RequestToGraph from './RequestToGraph/RequestToGraph';
import RequestToGraphWithPnp from './RequestToGraphWithPnP/RequestToGraphWithPnP';

export default class MyReactClassComponent extends React.Component<IMyReactClassComponentProps> {

  public render(): React.ReactElement<IMyReactClassComponentProps> {

    return (
      <>
        <h1>Class component</h1>
        <PnPSPDataFromSP description={this.props.description}></PnPSPDataFromSP>
        <RequestToGraph msGraphClientFactory={this.props.msGraphClientFactory}></RequestToGraph>
        <RequestToGraphWithPnp></RequestToGraphWithPnp>
      </>
    );
  }
}
