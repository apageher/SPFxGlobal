import * as React from 'react';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";

interface sampleItem {
    Question: string;
    Response: string;
    Langue: string;
}

const MyAccordion: React.FC = () => {

    const sampleItems: sampleItem[] = [
        {
            Question: 'El pasaje estándar Lorem Ipsum, usado desde el año 1500.',
            Response: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
            Langue: 'Latín'
        },
        {
            Question: '¿Qué caracteriza al escarabajo diabólico?',
            Response: 'Hay dos cosas que caracterizan al escarabajo diabólico acorazado: su nombre, que es bien fachero (no me digas que no), y su extraordinaria resistencia. Este insecto es capaz de sobrevivir al atropello de un coche, y ahora sabemos cómo',
            Langue: 'Español'
        },
        {
            Question: 'La NASA aterriza en un asteroide',
            Response: 'Por primera vez, una nave de la NASA ha aterrizado con éxito en un asteroide, esquivando con ello rocas del tamaño de edificios, con el fin de recolectar un puñado de escombros cósmicos para analizarlos en la Tierra.',
            Langue: 'Español'
        },
        {
            Question: 'Por qué los delfines, los gatos y otros carnívoros no son capaces de sentir el sabor dulce',
            Response: 'La mayoría de los mamíferos, incluidos los humanos, tienen receptores gustativos que pueden detectar sabores dulces, salados, ácidos, amargos y salados. El delfín mular que ves arriba ha perdido la capacidad para detectar azúcares. Una investigación recién publicada revela que no es el único.',
            Langue: 'Español'
        }
    ];

    return (
        <>
            <h1>My Accordion</h1>
            {
                sampleItems.map((item, index) => (
                    <Accordion title={item.Question} defaultCollapsed={true} className={"itemCell"} key={index}>
                        <div className={"itemContent"}>
                            <div className={"itemResponse"}>{item.Response}</div>
                            <div className={"itemIndex"}>{`Langue :  ${item.Langue}`}</div>
                        </div>
                    </Accordion>
                ))
            }
        </>
    )
}

export default MyAccordion