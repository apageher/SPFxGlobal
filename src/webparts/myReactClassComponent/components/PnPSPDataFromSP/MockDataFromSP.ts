import { ICountry } from './PnPSPDataFromSP';

export default class MockDataFromSP {

    private static countries: Array<ICountry> = [
        { name: 'España', continent: 'Europa' },
        { name: 'Canada', continent: 'America' },
        { name: 'Kenia', continent: 'Africa' },
        { name: 'India', continent: 'Asia' },
        { name: 'Nueva Zelanda', continent: 'Oceania' }];

    public static getCountries(): Promise<Array<ICountry>>{
        return new Promise<Array<ICountry>>((resolve) => {
            resolve(MockDataFromSP.countries);
        });
    }
}