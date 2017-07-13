import * as React from 'react';
import { IOrgChartData, IEmployee } from '../common/interfaces';
import { sortByProperty } from '../common/helper';

export interface OrgChartProps {
    orgChartdata: IOrgChartData[];
    onEmployeeSelected: (employeeToHandle: IEmployee) => void;
}

class OrgChart extends React.Component<OrgChartProps, any> {

    onEmployeeClicked = (manager: IEmployee, e: any) => {
        e.preventDefault();
        this.props.onEmployeeSelected(manager);
    }
    getReportees = (reporteesData: IOrgChartData[]): any => {
        const employees = reporteesData.sort((employeeA, employeesB) => {
            return sortByProperty(employeeA.manager, employeesB.manager, 'displayName');
        }).map(({ manager, reportees }) => (
            <li key={manager.id}>
                <a
                    href="#"
                    onClick={this.onEmployeeClicked.bind(this, manager)}
                >
                    {manager.displayName}
                </a>
                {this.getReportees(reportees)}
            </li>
        ));
        return <ul>{employees}</ul>;
    }
    getManagers = (): any => {
        const employees = this.props.orgChartdata
            .sort((employeeA, employeesB) => {
                return sortByProperty(employeeA.manager, employeesB.manager, 'displayName');
            })
            .map(({ manager, reportees }) => (
                <li key={manager.id}>
                    <a
                        href="#"
                        onClick={this.onEmployeeClicked.bind(this, manager)}
                    >
                        {manager.displayName}
                    </a>
                    {this.getReportees(reportees)}
                </li>
            ));
        return <ul>{employees}</ul>;
    }
    render() {
        const orgChart = this.getManagers();
        return (
            <div className="tree">{orgChart}</div>
        );
    }
}

export default OrgChart;
