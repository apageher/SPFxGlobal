import * as React from 'react';
import styles from './PnPSPDataFromSPHook.module.scss';
import { IPnPSPDataFromSPHookProps } from './IPnPSPDataFromSPHookProps';
import MockDataFromSP from './MockDataFromSP';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface ICountry {
    name: string;
    continent: string;
}

export interface IPnPSPDataFromSPHookState {
    countries: Array<ICountry>;
}

const PnPSPDataFromSPHook: React.FC<IPnPSPDataFromSPHookProps> = (props) => {

    const [countries, setCountries] = React.useState([]);

    const getMockData = () => {
        return MockDataFromSP.getCountries()
            .then((data: Array<ICountry>) => {
                return data;
            }) as Promise<Array<ICountry>>;
    };

    const getData = async () => {
        let data = Array<ICountry>();
        const items: any[] = await sp.web.lists.getByTitle("Countries").items.get();
        items.forEach((item) => {
            data.push({
                name: item.Title,
                continent: item.Continent
            });
        });
        return data;
    };

    const iniComponent = async () => {
        try {
            // SIN DATOS DE MOCK
            // let data = Array<ICountry>();
            // const items: any[] = await sp.web.lists.getByTitle("Countries").items.get();
            // items.forEach((item) => {
            //     data.push({
            //         name: item.Title,
            //         continent: item.Continent
            //     });
            // });

            let data = Array<ICountry>();
            // Local environment
            if (Environment.type === EnvironmentType.Local) {
                data = await getMockData();
            }
            else if (Environment.type == EnvironmentType.SharePoint ||
                Environment.type == EnvironmentType.ClassicSharePoint) {
                data = await getData();
            }
            setCountries(data);
        } catch (error) {
            console.warn("%c######## ERROR ########", 'color: blue');
            console.error(error);
        }
    };

    React.useEffect(() => {
        iniComponent();
    }, []);

    return (
        <div className={styles.pnPSPDataFromSPHook}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <p className={styles.description}>{props.description}</p>
                        {countries.map((country: ICountry) => {
                            return (<p className={styles.title}>{country.name} - {country.continent}</p>);
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PnPSPDataFromSPHook;