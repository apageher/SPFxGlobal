import * as React from 'react';
import styles from './PnPSPDataFromSPHook.module.scss';
import { IPnPSPDataFromSPHookProps } from './IPnPSPDataFromSPHookProps';
import { escape } from '@microsoft/sp-lodash-subset';

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

    const iniComponent = async () => {
        try {
            let data = Array<ICountry>();
            const items: any[] = await sp.web.lists.getByTitle("Countries").items.get();
            items.forEach((item) => {
                data.push({
                    name: item.Title,
                    continent: item.Continent
                });
            });
            setCountries(data);
        } catch (error) {
            console.warn("######## ERROR MIO ########");
            console.error(error);
        }
    };

    React.useEffect(()=>{
        iniComponent();
    },[]);

    return (
        <div className={styles.pnPSPDataFromSPHook}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <p className={styles.description}>{escape(props.description)}</p>
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