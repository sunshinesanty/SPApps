import * as React from 'react';
import { Payload } from '../common/interfaces';

class InputForm extends React.Component<{ onSubmitData: (input: Payload) => void }, Payload> {
    constructor(props: any) {
        super(props);
        this.state = { SourceString: 'polly string polly', SubString: 'polly' };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        let value: any = target.value;
        const name = target.id;
        this.setState({ [name]: value });

        if (!value) {
            event.target.style.border = '1px solid #ff0000';
        } else {
            event.target.style.border = '';
        }
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        this.props.onSubmitData(this.state);
    }

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label>Source String:</label>
                    <input
                        id="SourceString"
                        type="text"
                        value={this.state.SourceString}
                        className="form-control"
                        title="Please enter the Source string"
                        maxLength={500}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Sub String:</label>
                    <input
                        id="SubString"
                        type="text"
                        value={this.state.SubString}
                        className="form-control"
                        title="Please enter the Substring to search"
                        maxLength={100}
                        onChange={this.handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-default" onClick={this.onSubmit}>Submit</button>
            </form>
        );
    }
}

export default InputForm;