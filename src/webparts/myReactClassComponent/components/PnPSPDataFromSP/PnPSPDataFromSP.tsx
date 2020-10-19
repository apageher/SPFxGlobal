import * as React from 'react';
import styles from './PnPSPDataFromSP.module.scss';
import { IPnPSPDataFromSPProps } from './IPnPSPDataFromSPProps';
import MockDataFromSP from './MockDataFromSP';
import { Environment, EnvironmentType, Log } from '@microsoft/sp-core-library';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { ConsoleListener, FunctionListener, ILogEntry, Logger, LogLevel } from '@pnp/logging';
import ApplicationInsightsLoggerListener from '../../../../logging/ApplicationInsightsLoggerListener';

//Function Listener es el otro tipo de listener que proporciona PnP a parte del de Consola
let listener = new FunctionListener((entry: ILogEntry) => {
    //En este caso ese FunctionListener hacemos que también pinte en consola
    console.log(`CUSTOM_LOGGER: ${entry.message}`);
  });
//Suscribimos el listener que pinta en consola, listner personalizado que tb pinta en consola y listener que escribe en Application Insigths
Logger.subscribe(new ConsoleListener(), listener, new ApplicationInsightsLoggerListener);
Logger.activeLogLevel = LogLevel.Verbose;

export interface ICountry {
    name: string;
    continent: string;
}

export interface IPnPSPDataFromSPState {
    countries: Array<ICountry>;
}

export default class PnPSPDataFromSP extends React.Component<IPnPSPDataFromSPProps, IPnPSPDataFromSPState> {

    constructor(prop: IPnPSPDataFromSPProps) {
        super(prop);
        this.state = {
            countries: new Array<ICountry>()
        };
    }

    public async componentDidMount() {
        await this.iniComponent();
    }

    private iniComponent = async () => {
        try {

            Logger.write("En iniComponent");

            let data = Array<ICountry>();
            // Local environment
            if (Environment.type === EnvironmentType.Local) {
                data = await this.getMockData();
            }
            else if (Environment.type == EnvironmentType.SharePoint ||
                Environment.type == EnvironmentType.ClassicSharePoint) {
                data = await this.getData();
            }

            Logger.writeJSON(data, LogLevel.Info);

            // SIN DATOS DE MOCK
            // let data = Array<ICountry>();
            // const items: any[] = await sp.web.lists.getByTitle("Countries").items.get();
            // items.forEach((item) => {
            //     data.push({
            //         name: item.Title,
            //         continent: item.Continent
            //     });
            // });

            this.setState({
                countries: data
            });
        } catch (error) {
            console.warn("%c######## ERROR ########", 'color: blue');
            console.error(error);
        }
    }

    private getMockData(): Promise<Array<ICountry>> {
        return MockDataFromSP.getCountries()
            .then((data: Array<ICountry>) => {
                return data;
            }) as Promise<Array<ICountry>>;
    }

    private async getData(): Promise<Array<ICountry>> {
        let data = Array<ICountry>();
        const items: any[] = await sp.web.lists.getByTitle("Countries").items.get();
        items.forEach((item) => {
            data.push({
                name: item.Title,
                continent: item.Continent
            });
        });
        return data;
    }

    public render(): React.ReactElement<IPnPSPDataFromSPProps> {
        const { countries } = this.state;
        return (
            <div className={styles.pnPSPDataFromSP}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <p className={styles.description}>{this.props.description}</p>
                            {countries.map((country: ICountry, index: number) => {
                                return (<p className={styles.title} key={index}>{country.name} - {country.continent}</p>);
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}