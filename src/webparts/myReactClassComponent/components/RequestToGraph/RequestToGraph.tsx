import * as React from 'react';
import styles from './RequestToGraph.module.scss';
import { IRequestToGraphProps } from './IRequestToGraphProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { PrimaryButton } from 'office-ui-fabric-react';

export interface IRequestToGraphState {
    name: string;
    email: string;
}

export default class RequestToGraph extends React.Component<IRequestToGraphProps, IRequestToGraphState> {

    constructor(prop: IRequestToGraphProps) {
        super(prop);
        this.state = {
            name: '',
            email: ''
        };
    }

    private handleClick = async () => {
        try {
            let name: string = '';
            let email: string = '';

            //Local environment
            if (Environment.type === EnvironmentType.Local) {
                name = 'Nombre de prueba';
                email = 'Correo de prueba';
            }
            else if (Environment.type == EnvironmentType.SharePoint ||
                Environment.type == EnvironmentType.ClassicSharePoint) {
                const clientGraph = await this.props.msGraphClientFactory.getClient();
                const graphData: MicrosoftGraph.User = await clientGraph.api("/me").get();
                name = graphData.displayName;
                email = graphData.userPrincipalName;
            }

            this.setState({
                name,
                email
            });
        } catch (error) {
            console.warn("%c######## ERROR ########", 'color: blue');
            console.error(error);
        }
    }

    public render(): React.ReactElement<IRequestToGraphProps> {
        const { name, email } = this.state;

        return (
            <div className={styles.requestToGraphAndAzureFx}>
                <div className={styles.container}>
                    <PrimaryButton text="¡Púlsame!" onClick={this.handleClick} />
                    <p>{name} - {email}</p>
                </div>
            </div>
        );
    }
}