import * as React from 'react';
import { IMyReactHooksProps } from './IMyReactHooksProps';
import PnPSPDataFromSPHook from './PnPSPDataFromSP/PnPSPDataFromSPHook';
import RequestToGraphHook from './RequestToGraph/RequestToGraphHook';

const MyReactHooks: React.FC<IMyReactHooksProps> = (props) => {
  //FC: FunctionComponent

  //OK WP con Hooks
  //OK Subir a GitHub
  //OK Leer de SP con PnPJs (https://sanlotest.sharepoint.com/sites/LearnSPPeich) [Hooks y Clases]
  //OK Datos de prueba con Enviroment
  //OK Petición a MS Graph (con la factoria) [Hooks y Clases]
  //Petición a MS Graph (con libreria de pnp)
  //React route
  //Lazy load
  //Jest
  //Azure function
  //Azure Devops
  //Office fabric components
  //Componentes de PnP
  //API Content (datos de las props)
  //Mirar lo del despliegue selectivo de componentes (comentar el config)
  //Lo de la mejora del tiempo del bundle y serve

  return (
    <>
      <h1>Functional component (Hooks)</h1>
      <PnPSPDataFromSPHook description={props.description}></PnPSPDataFromSPHook>
      <RequestToGraphHook msGraphClientFactory={props.msGraphClientFactory}></RequestToGraphHook>
    </>
  );
};

export default MyReactHooks;