import * as React from 'react';
import { Carousel, CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape } from "@pnp/spfx-controls-react/lib/Carousel";
import { ImageFit } from 'office-ui-fabric-react/lib/components/Image/Image.types';
import styles from './PnPControls.module.scss';


interface sampleItem {
    Question: string;
    Response: string;
    Langue: string;
}


interface IMySlideProps {
    title: string;
    content: string;
}

export const MySlide: React.FC<IMySlideProps> = (props) => {
    return (
        <div>
            <h4>El título de la diapositiva es: {props.title}</h4>
            <p>El contenido de la diapositiva es: {props.content}</p>
        </div>
    )
}


const MyCarousel: React.FC = () => {


    const element1: React.ReactElement<IMySlideProps> = React.createElement(
        MySlide,
        {
            title: 'El pasaje estándar Lorem Ipsum, usado desde el año 1500.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    );
    const element2: React.ReactElement<IMySlideProps> = React.createElement(
        MySlide,
        {
            title: '¿Qué caracteriza al escarabajo diabólico?',
            content: 'Hay dos cosas que caracterizan al escarabajo diabólico acorazado: su nombre, que es bien fachero (no me digas que no), y su extraordinaria resistencia. Este insecto es capaz de sobrevivir al atropello de un coche, y ahora sabemos cómo'
        }
    );
    const element3: React.ReactElement<IMySlideProps> = React.createElement(
        MySlide,
        {
            title: 'La NASA aterriza en un asteroide',
            content: 'Por primera vez, una nave de la NASA ha aterrizado con éxito en un asteroide, esquivando con ello rocas del tamaño de edificios, con el fin de recolectar un puñado de escombros cósmicos para analizarlos en la Tierra.'
        }
    );
    const carouselElements: React.ReactElement<IMySlideProps>[] = [];
    carouselElements.push(element1);
    carouselElements.push(element2);
    carouselElements.push(element3);


    return (
        <>
            <h1>My Carousel</h1>
            {
                <>
                    <h3>Primer carrusel</h3>
                    <Carousel
                        key={1}
                        buttonsLocation={CarouselButtonsLocation.top}
                        buttonsDisplay={CarouselButtonsDisplay.block}
                        contentContainerStyles={styles.carouselContent}
                        // containerButtonsStyles={styles.carouselButtonsContainer}
                        isInfinite={true}
                        element={carouselElements}
                        onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
                        onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
                    />
                    {/* <h3>Segundo carrusel</h3>
                    <Carousel
                        key={2}
                        buttonsLocation={CarouselButtonsLocation.bottom}
                        buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
                        contentContainerStyles={styles.carouselContent}
                        // containerButtonsStyles={styles.carouselButtonsContainer}
                        canMoveNext={true}
                        canMovePrev={true}
                        //triggerPageEvent={this.triggerNextElement}
                        element={carouselElements}
                    /> */}
                    <h3>Otro carrusel</h3>
                    <Carousel
                        key={3}
                        buttonsLocation={CarouselButtonsLocation.center}
                        buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
                        contentContainerStyles={styles.carouselImageContent}
                        isInfinite={true}
                        indicatorShape={CarouselIndicatorShape.circle}
                        pauseOnHover={true}

                        element={[
                            {
                                imageSrc: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80',
                                title: 'Colosseum',
                                description: 'This is Colosseum',
                                url: 'https://en.wikipedia.org/wiki/Colosseum',
                                showDetailsOnHover: true,
                                imageFit: ImageFit.cover,
                            },
                            {
                                imageSrc: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80',
                                title: 'Colosseum',
                                description: 'This is Colosseum',
                                url: 'https://en.wikipedia.org/wiki/Colosseum',
                                showDetailsOnHover: true,
                                imageFit: ImageFit.cover
                            },
                            {
                                imageSrc: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3078&q=80',
                                title: 'Colosseum',
                                description: 'This is Colosseum',
                                url: 'https://en.wikipedia.org/wiki/Colosseum',
                                showDetailsOnHover: true,
                                imageFit: ImageFit.cover
                            }
                        ]}
                        onMoveNextClicked={(index: number) => { console.log(`Next button clicked: ${index}`); }}
                        onMovePrevClicked={(index: number) => { console.log(`Prev button clicked: ${index}`); }}
                    />
                </>
            }
        </>
    )
}

export default MyCarousel