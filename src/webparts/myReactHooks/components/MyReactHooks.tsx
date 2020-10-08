import * as React from 'react';
import { IMyReactHooksProps } from './IMyReactHooksProps';
import PnPSPDataFromSPHook from './PnPSPDataFromSP/PnPSPDataFromSPHook';

const MyReactHooks: React.FC<IMyReactHooksProps> = (props) => {
  //FC: FunctionComponent

  //OK Leer de SP con PnPJs (https://sanlotest.sharepoint.com/sites/LearnSPPeich) [Hooks y Clases]
  //Datos de prueba con Enviroment
  //Petición a MS Graph
  //Hooks
  //React route
  //Lazy
  //Jest
  //Azure function
  //OK Subir a GitHub
  //Azure Devops
  //Office fabric components
  //Componentes de PnP
  //API Content (datos de las props)

  return (
    <>
      <h1>Functional component (Hooks)</h1>
      <PnPSPDataFromSPHook description={props.description}></PnPSPDataFromSPHook>
    </>
  );
};

export default MyReactHooks;