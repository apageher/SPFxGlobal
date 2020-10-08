import * as React from 'react';
import styles from './MyReactHooks.module.scss';
import { IMyReactHooksProps } from './IMyReactHooksProps';
import { escape } from '@microsoft/sp-lodash-subset';

// import { sp } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";


const MyReactHooks: React.FC<IMyReactHooksProps> = (props) => {
//FC: FunctionComponent

//Leer de SP con PnPJs (https://sanlotest.sharepoint.com/sites/LearnSPPeich)
//Datos de prueba con Enviroment
//Petición a MS Graph
//Hooks
//React route
//Lazy
//Jest
//Azure function
//Subir a GitHub/Azure Devops
//Office fabric components
//Componentes de PnP


  return(
      <div className={styles.myReactHooks}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Functional component!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyReactHooks;