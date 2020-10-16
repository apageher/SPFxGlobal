import * as React from 'react';
import { IMyReactHooksProps } from './IMyReactHooksProps';
import PnPSPDataFromSPHook from './PnPSPDataFromSP/PnPSPDataFromSPHook';
import RequestToGraphHook from './RequestToGraph/RequestToGraphHook';

const MyReactHooks: React.FC<IMyReactHooksProps> = (props) => {
  //FC: FunctionComponent

  return (
    <>
      <h1>Functional component (Hooks)</h1>
      <PnPSPDataFromSPHook description={props.description}></PnPSPDataFromSPHook>
      <RequestToGraphHook msGraphClientFactory={props.msGraphClientFactory}></RequestToGraphHook>
    </>
  );
};

export default MyReactHooks;