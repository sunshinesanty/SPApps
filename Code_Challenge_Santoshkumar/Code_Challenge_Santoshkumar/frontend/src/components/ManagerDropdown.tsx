
// tslint:disable:max-line-length
import * as React from 'react';
import { IEmployee } from '../common/interfaces';
import { sortByProperty } from '../common/helper';

export interface ManagerDropdownProps {
    employees: IEmployee[];
    managerid?: number;
    showManagerMessage: boolean;
    setEmployeeManager: (managerId?: number) => void;
}

class ManagerDropdown extends React.Component<ManagerDropdownProps, { managerid?: number }> {
    constructor(props: ManagerDropdownProps) {
        super(props);
        this.state = { managerid: undefined };
    }
    componentWillReceiveProps(nextProps: ManagerDropdownProps) {
        this.resetManagerID(nextProps);
    }
    resetManagerID = (nextProps: ManagerDropdownProps) => {
        this.setState({ managerid: nextProps.managerid });
    }
    handleSelectedChange = (event: any) => {
        const target = event.target;
        let value: any = target.value;
        const name = target.id;
        this.setState({ [name]: value });
        this.props.setEmployeeManager(value);
    }
    render() {
        const { employees } = this.props;
        const managerOptions = employees
            .sort((employeeA, employeesB) => { return sortByProperty(employeeA, employeesB, 'displayName'); })
            .map((employee: IEmployee) => {
                return (
                    <option
                        key={employee.id}
                        value={employee.id}
                    >
                        {employee.displayName}
                    </option>
                );
            });

        return (
            <div className="form-group" >
                <label htmlFor="managersDDL">Manager</label>
                <select
                    id="managerid"
                    onChange={this.handleSelectedChange}
                    value={this.state.managerid ? this.state.managerid : 0}
                    className="form-control"
                >
                    <option key={0} value="0">Select a Manager</option>
                    {managerOptions}
                </select>
                {
                    (this.props.showManagerMessage && this.props.showManagerMessage === true) &&
                    <small id="managerDDLInfo" className="form-text text-muted">
                        If the manager is not selected the new employee will be considered as another top level director.
                </small>
                }
            </div>
        );
    }
}

export default ManagerDropdown;
