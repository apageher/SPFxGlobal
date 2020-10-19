import * as React from 'react';
import { IFluentUiControlsProps } from './IFluentUiControlsProps';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import Tab1 from './Tab1';

//SUSTITUCIÓN DE CARGA SINCRONA DEL SUBCOMPONENTE POR DINAMICA
// Code Splitting - Importacion dinamica
// import Tab2 from './Tab2';
// import Tab3 from './Tab3';
const Tab2 = React.lazy(() => import('./Tab2'));
const Tab3 = React.lazy(() => import('./Tab3'));


const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export default class FluentUiControls extends React.Component<IFluentUiControlsProps, {}> {
  public render(): React.ReactElement<IFluentUiControlsProps> {
    return (
      <Pivot aria-label="Basic Pivot Example">
        <PivotItem
          headerText="Pestaña 1"
          headerButtonProps={{
            'data-order': 1,
            'data-title': 'Pestaña 1',
          }}
        >
          <Tab1 tab={1}></Tab1>
        </PivotItem>
        <PivotItem headerText="Pestaña 2">
          <React.Suspense fallback={<h3>Cargando...</h3>}>
            <Tab2 tab={2} />
          </React.Suspense>
        </PivotItem>
        <PivotItem headerText="Pestaña 3">
          <React.Suspense fallback={<h3>Cargando...</h3>}>
            <Tab3 tab={3} />
          </React.Suspense>
        </PivotItem>
      </Pivot>
    );
  }
}
