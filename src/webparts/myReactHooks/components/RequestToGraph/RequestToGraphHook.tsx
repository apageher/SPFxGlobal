import * as React from 'react';
import styles from './RequestToGraphHook.module.scss';
import { IRequestToGraphHookProps } from './IRequestToGraphHookProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { PrimaryButton, setMemoizeWeakMap } from 'office-ui-fabric-react';

const RequestToGraphHook: React.FC<IRequestToGraphHookProps> = (props) => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleClick = async () => {
        try {
            //Local environment
            if (Environment.type === EnvironmentType.Local) {
                setName('Nombre de prueba');
                setEmail('correoprueba@gmail.com');
            }
            else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
                const clientGraph = await props.msGraphClientFactory.getClient();
                const graphData: MicrosoftGraph.User = await clientGraph.api("/me").get();
                setName(graphData.displayName);
                setEmail(graphData.userPrincipalName);
            }
        } catch (error) {
            console.warn("%c######## ERROR ########", 'color: blue');
            console.error(error);
        }
    };

    return (
        <div className={styles.requestToGraphAndAzureFx}>
            <div className={styles.container}>
                <PrimaryButton text="¡Púlsame!" onClick={handleClick} />
                <p>{name} - {email}</p>
            </div>
        </div>
    );
};

export default RequestToGraphHook;