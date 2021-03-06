import * as React from 'react';
import { ITab } from './ITab';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
};

export default class Tab1 extends React.Component<ITab, {}> {

    constructor(prop: ITab) {
        super(prop);
        console.log("%c PESTAÑA 1 CARGADA", 'color: blue');
    }

    public render(): React.ReactElement<ITab> {
        return (
            <Label styles={labelStyles}>Tab #{this.props.tab}</Label>
        );
    }
}
