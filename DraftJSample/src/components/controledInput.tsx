import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ICtrlInpState } from '../interfaces/IEditorInterfaces';

export class ControlledInput extends React.Component<{}, {}>
{
    public state: ICtrlInpState;
    constructor(props: any) {
        super(props);
        this.state = { value: '' };
    }
    onChange = (e: React.FormEvent) => { this.setState({ value: "your input:" + e.target.value }); console.log(this.state); }
    render() {
        return <div>
        <input type="text" value={this.state.value} onChange={this.onChange} />
        </div>
    }
}