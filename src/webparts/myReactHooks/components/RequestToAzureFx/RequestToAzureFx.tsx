import * as React from 'react';
import { IRequestToAzureFxProps } from './IRequestToAzureFx';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { AadHttpClient } from '@microsoft/sp-http';

const RequestToAzureFx: React.FC<IRequestToAzureFxProps> = (props) => {

    const [dataAzFx, setDataAzFx] = React.useState('');

    const clickme = async () => {
        try {
            //Azure function securizada
            const client = await props.aadHttpClientFactory.getClient("https://peichfunction.azurewebsites.net");//Cliente autenticado
            //const client = await this.props.aadHttpClientFactory.getClient("f1a1bc50-fa40-4655-a6b6-7d2cad2607f3"); //También sirve
            //es el Id. de aplicación (cliente) de nuestra Azure function que aparece en el Azure Active directory
            const response = await client.get(`https://peichfunction.azurewebsites.net/api/HttpTrigger2?name=Alvaro`, AadHttpClient.configurations.v1);
            const data = await response.json(); //response.json() si la Azure function devuelve un Json sino response.text()
            //console.log(data.saludo);
            setDataAzFx(data.saludo);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <PrimaryButton onClick={clickme}>Traer datos de Azure Fx</PrimaryButton>
            <p>{dataAzFx}</p>
        </div>
    );
};

export default RequestToAzureFx;