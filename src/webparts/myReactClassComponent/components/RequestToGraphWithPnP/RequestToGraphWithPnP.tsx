import * as React from 'react';
import styles from './RequestToGraphWithPnP.module.scss';
import { IRequestToGraphWithPnPProps } from './IRequestToGraphWithPnPProps';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { graph } from '@pnp/graph/presets/all';

export interface IGroup {
    displayName: string;
    id: string;
}
export interface IRequestToGraphState {
    groups: IGroup[];
}

export default class RequestToGraphWithPnP extends React.Component<IRequestToGraphWithPnPProps, IRequestToGraphState> {

    constructor(prop: IRequestToGraphWithPnPProps) {
        super(prop);
        this.state = {
            groups: []
        };
    }

    public componentDidMount(): void {

        //Local environment
        if (Environment.type === EnvironmentType.Local) {
            const groupsTest: IGroup[] = [{id: '12345', displayName: 'Grupo de prueba para local'}];
           this.setState({
               groups: groupsTest
           });
        }
        else if (Environment.type == EnvironmentType.SharePoint ||
            Environment.type == EnvironmentType.ClassicSharePoint) {
                graph.groups
                .top(5)
                .select("id, displayName")
                .get()
                .then(groups => {
                    this.setState({
                        groups: groups.map(g => {
                            return {
                                displayName: g.displayName,
                                id: g.id
                            };
                        })
                    });
                });   
        }
    }

    public render(): React.ReactElement<IRequestToGraphWithPnPProps> {

        if (this.state.groups.length == 0) {
            return <div>Loading groups...</div>;
        }

        return (
            <div className={styles.helloPnpGraph}>
                <ul>
                    {
                        this.state.groups.map(g => <li key={g.id}>{g.id} - {g.displayName}</li>)
                    }
                </ul>
            </div>
        );
    }
}