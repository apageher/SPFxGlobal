import * as React from 'react';
import styles from './PnPControls.module.scss';
import { IPnPControlsProps } from './IPnPControlsProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { DisplayMode } from '@microsoft/sp-core-library';

//SUSTITUCIÓN DE CARGA SINCRONA DEL SUBCOMPONENTE POR DINAMICA
//import ImageCustom from './Image';
// Code Splitting - Importacion dinamica
const MyAccordion = React.lazy(() => import('./MyAccordion'));
const MyCarousel = React.lazy(() => import('./MyCarousel'));
const MyGridLayout = React.lazy(() => import('./MyGridLayout'));
const MyMap = React.lazy(() => import('./MyMap'));

const PnPControls: React.FC<IPnPControlsProps> = (props) => {

  const _onConfigure = () => {
    // Context of the web part
    props.propertyPane.open();
  }

  const { showAccordion, showCarousel, showGridLayout, showMap } = props;
  return (
    <div className={styles.pnPControls}>
      <div className={styles.container}>
        <div className={styles.row}>
          <Placeholder iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            hideButton={props.displayMode === DisplayMode.Read}
            onConfigure={_onConfigure} />
          {showAccordion &&
            <React.Suspense fallback={<h1>Cargando...</h1>}>
              <MyAccordion />
            </React.Suspense>
          }
          {showCarousel &&
            <React.Suspense fallback={<h1>Cargando...</h1>}>
              <MyCarousel />
            </React.Suspense>
          }
          {showGridLayout &&
            <React.Suspense fallback={<h1>Cargando...</h1>}>
              <MyGridLayout />
            </React.Suspense>
          }
          {showMap &&
            <React.Suspense fallback={<h1>Cargando...</h1>}>
              <MyMap />
            </React.Suspense>
          }
        </div>
      </div>
    </div>
  );
}

export default PnPControls