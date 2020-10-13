import * as React from 'react';
import { ILazyLoadHookProps } from './ILazyLoadHookProps';

//SUSTITUCIÓN DE CARGA SINCRONA DEL SUBCOMPONENTE POR DINAMICA
//import ImageCustom from './Image';
// Code Splitting - Importacion dinamica
const ImageCustom = React.lazy(() => import('./Image'));

const LazyLoadHook: React.FC<ILazyLoadHookProps> = (props) => {

  const [show, setShow] = React.useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <h1>Hola {props.description}</h1>
      <h2>{show}</h2>
      <button onClick={handleShow}>{show ? 'Ocultar' : 'Mostrar'}</button>
      { show && (
        <React.Suspense fallback={<h1>Cargando...</h1>}>
          <ImageCustom />
        </React.Suspense>
      )}
    </>
  );
};

export default LazyLoadHook;