import * as React from 'react';
import { IEmployee } from '../common/interfaces';
import ManagerDropDown from './ManagerDropdown';

export interface InputFormProperties {
    employees: IEmployee[];
    onSubmitData: (input: IEmployee) => void;
    onDeleteData: (idToDelete: number, alternativeManagerID?: number) => void;
    employeeToHandle?: IEmployee;
}

class InputForm extends React.Component<InputFormProperties, IEmployee> {
    constructor(props: any) {
        super(props);
        const { employeeToHandle } = this.props;
        this.state = employeeToHandle ? employeeToHandle : { id: 0, firstName: '', lastName: '' };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillReceiveProps(nextProps: InputFormProperties) {
        this.resetSleectedEmployee(nextProps);
    }

    resetSleectedEmployee = (nextProps: InputFormProperties) => {
        if (nextProps.employeeToHandle && this.state.id !== nextProps.employeeToHandle.id) {
            const { id, firstName, lastName, managerID } = nextProps.employeeToHandle;
            this.setState({ id, firstName, lastName, managerID });
        }
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

    onDelete = (e: any) => {
        e.preventDefault();
        if (this.state.managerID && this.state.managerID > 0 &&
            confirm('Manager selected for this employee, will be the new manager for reportees')) {
            this.props.onDeleteData(this.state.id, this.state.managerID);
        } else {
            // tslint:disable-next-line:max-line-length
            if (confirm('No alternate manager is selected, if the employee has reportees, you will not be able to delete this employees. Do you want to continue')) {
                this.props.onDeleteData(this.state.id);
            }
        }
    }

    onReset = (e: any) => {
        e.preventDefault();
        this.setState({ id: 0, firstName: '', lastName: '', managerID: undefined });
    }

    setEmployeeManager = (managerID?: number): void => {
        this.setState({ managerID });
    }

    render() {
        let style = { display: 'none' };
        if (this.state.id > 0) { style = { display: 'block' }; }

        return (
            <form className="form-horizontal">
                <div className="form-group" style={style}>
                    <label>Employee ID:</label>
                    <label id="id" className="form-label" style={{ margin: '5px' }}>
                        {this.state.id}
                    </label>
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        id="firstName"
                        type="text"
                        value={this.state.firstName}
                        className="form-control"
                        title="Please enter data for First Name"
                        maxLength={255}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        id="lastName"
                        type="text"
                        value={this.state.lastName}
                        className="form-control"
                        title="Please enter data for Last Name"
                        maxLength={255}
                        onChange={this.handleInputChange}
                    />
                </div>
                <ManagerDropDown
                    employees={this.props.employees}
                    setEmployeeManager={this.setEmployeeManager}
                    managerid={this.state.managerID}
                />
                <button type="submit" className="btn btn-default" onClick={this.onSubmit}>Submit</button>
                {
                    this.state.id > 0 &&
                    <button type="button" className="btn btn-default" onClick={this.onDelete}>Delete</button>
                }
                {
                    this.state.id > 0 &&
                    <button type="button" className="btn btn-default" onClick={this.onReset}>Reset</button>
                }
            </form>
        );
    }
}

export default InputForm;