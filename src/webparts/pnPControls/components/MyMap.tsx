import * as React from 'react';
import { Map, ICoordinates, MapType } from "@pnp/spfx-controls-react/lib/Map";

const MyMap: React.FC = () => {

    const [direction, setDirection] = React.useState('Madrid');

    return (
        <>
            <h1>My Map</h1>
            <Map titleText="Mapa de Madrid"
                coordinates={{ latitude: 40.4167047, longitude: -3.7035825 }}
                enableSearch={true}
                mapType={MapType.standard}
                onUpdateCoordinates={(coord: ICoordinates) => { setDirection(coord.displayName)}} />
            <p>La dirección es: {direction}</p>
        </>
    )
}

export default MyMap