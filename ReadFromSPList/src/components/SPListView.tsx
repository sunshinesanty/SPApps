import * as React from "react";
import {observer} from "mobx-react";
import {ISPListViewProps} from "../Interfaces/ISPListContracts";

@observer
export class SPListView extends React.Component<ISPListViewProps, {}>{
    render() {
        return (<div>SP View</div>);
    }
}
