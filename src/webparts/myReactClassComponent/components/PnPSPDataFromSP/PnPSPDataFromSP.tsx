import * as React from 'react';
import styles from './PnPSPDataFromSP.module.scss';
import { IPnPSPDataFromSPProps } from './IPnPSPDataFromSPProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


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
            let data = Array<ICountry>();
            const items: any[] = await sp.web.lists.getByTitle("Countries").items.get();
            items.forEach((item) => {
                data.push({
                    name: item.Title,
                    continent: item.Continent
                });
            });
            this.setState({
                countries: data
            });
            console.log(this.state.countries);
        } catch (error) {
            console.warn("######## ERROR MIO ########");
            console.error(error);
        }
    }

    public render(): React.ReactElement<IPnPSPDataFromSPProps> {
        const { countries } = this.state;
        return (
            <div className={styles.pnPSPDataFromSP}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <p className={styles.description}>{escape(this.props.description)}</p>
                            {countries.map((country: ICountry) => {
                                return(<p className={styles.title}>{country.name} - {country.continent}</p>);       
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
