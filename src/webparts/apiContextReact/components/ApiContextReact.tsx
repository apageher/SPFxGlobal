import * as React from 'react';
import styles from './ApiContextReact.module.scss';
import { IApiContextReactProps } from './IApiContextReactProps';

export interface IApiContextReactState {
  clicks: number;
}

interface IMyContext{
  clicks: number;
  addClicks: any;
}

//Ejemplo de comunicación entre componentes con la API Context de React (desde la v.16)
//Recibir información desde el componente Padre al Nieto y emitir información desde el componente Nieto al Padre, sin pasarle por Hijo la información mediante props

//Primero creamos el objeto context
const MyContext = React.createContext<IMyContext>(undefined); 
//const { Provider, Consumer } = React.createContext(undefined); //Nos devuelve dos objetos Provider y Consumer que los podríamos sacar con destructuración

export default class ApiContextReact extends React.Component<IApiContextReactProps, IApiContextReactState> {

  constructor(prop: IApiContextReactProps) {
    super(prop);
    this.state = {
      clicks: 0
    };
  }

  addClicks = () => {
    this.setState(state => ({
      clicks: state.clicks + 1
    }))
  }

  public render(): React.ReactElement<IApiContextReactProps> {
    return (
      <MyContext.Provider value={{
        clicks: this.state.clicks,
        addClicks: this.addClicks
      }}>
        <div className={styles.boxStyles}>
          <Header></Header>
          <Hijo description='hola'></Hijo>
        </div>
      </MyContext.Provider>
    );
  }
}

export class Hijo extends React.Component<IApiContextReactProps, {}> {
  public render(): React.ReactElement<IApiContextReactProps> {

    return (
      <div className={styles.boxStyles}>
        <p>Hijo</p>
        <Nieto></Nieto>
        <Nieto2></Nieto2>
      </div>
    );
  }
}

//Consumer recibe como primer hijo una función que se pasa entre llaves y devuelve el marcado
export const Nieto = () => {
  return (
    <MyContext.Consumer>
      { (context) => (
        <div className={styles.boxStyles}>
          <p>Primer nieto</p>
          <button onClick={context.addClicks}>Disparar ({context.clicks})</button>
        </div>
      )}
    </MyContext.Consumer>
  )
}

//Existe el hook useContext para consumir el contexto de una manera mucho más simple y limpia
export const Nieto2 = () => {
  const context = React.useContext(MyContext)

  return (
    <div className={styles.boxStyles}>
      <p>Segundo nieto</p>
      <button onClick={context.addClicks}>Disparar ({context.clicks})</button>
    </div>
  )
}


const Header = () => {
  return (
    <header className={styles.headerStyles}>
      <div className={styles.subtitleStyles}>
        React API Context
        <span role='img' aria-label='flame' >
          🔥
        </span>
      </div>
    </header>
  )
}
