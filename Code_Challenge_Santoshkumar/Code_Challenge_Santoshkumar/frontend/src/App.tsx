import * as React from 'react';
import './App.css';
import { IEmployee, IOrgChartData, IDeletePayload } from './common/interfaces';
import InputForm from './components/InputForm';
import OrgChart from './components/OrgChart';
import FetchData, { httpMethod } from './api/fetchData';
import config from './common/config';

class App extends React.Component<{}, { employeeOrgData: IOrgChartData[]; employeeToHandle?: IEmployee; }> {
  Employees: IEmployee[] = [];

  constructor(props: any) {
    super(props);
    this.state = { employeeOrgData: [] };
    this.getEmployeeOrgChart();
  }

  onDataSubmited = async (employee: IEmployee) => {
    let OrgChartData;
    if (employee && employee.id > 0) {
      OrgChartData = await FetchData.postData(config.apiEndpoints.UpdateEmployees, employee, httpMethod.PUT);
    } else {
      OrgChartData = await FetchData.postData(config.apiEndpoints.AddEmployees, employee, httpMethod.POST);
    }
    this.Employees = [];
    this.getEmployeeDataOnly(OrgChartData);
    this.setState({ employeeOrgData: OrgChartData });
  }

  onDataDeleted = async (idToDelete: number, alternativeManagerID?: number) => {
    let OrgChartData;
    if (idToDelete > 0) {
      const deletePayload: IDeletePayload = { id: idToDelete, alertnativeManagerId: alternativeManagerID };
      OrgChartData = await FetchData.postData(config.apiEndpoints.DeleteEmployee, deletePayload, httpMethod.DELETE);
      this.Employees = [];
      this.getEmployeeDataOnly(OrgChartData);
      this.setState({ employeeOrgData: OrgChartData });
    } else {
      alert('Invalid employee to delete');
    }

  }

  getEmployeeOrgChart = async () => {
    const OrgChartData = await FetchData.getEmployeeHierarchy(config.apiEndpoints.GetEmployeesByHeirarchy);
    this.Employees = [];
    this.getEmployeeDataOnly(OrgChartData);
    this.setState({ employeeOrgData: OrgChartData });
  }

  getEmployeeDataOnly = (OrgChartData: IOrgChartData[]) => {
    OrgChartData.forEach((orgData: IOrgChartData) => {
      this.Employees.push(orgData.manager);
      this.readReportees(orgData.reportees);
    });
  }

  readReportees = (reportees: IOrgChartData[]) => {
    if (reportees) {
      reportees.forEach((orgChartData) => {
        this.Employees.push(orgChartData.manager);
        if (orgChartData.reportees && orgChartData.reportees.length > 0) {
          this.readReportees(orgChartData.reportees);
        }
      });
    }
  }

  onEmployeeSelected = (employeeSelected: IEmployee) => {
    this.setState({ employeeToHandle: employeeSelected });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Code Challenge - Santoshkumar</h2>
        </div>
        <div className="row" style={{ textAlign: 'left', margin: '10px' }}>
          <div className="col-sm-4 col-xs-12">
            <InputForm
              employees={this.Employees}
              employeeToHandle={this.state.employeeToHandle}
              onSubmitData={this.onDataSubmited}
              onDeleteData={this.onDataDeleted}
            />
          </div>
          <div className="col-sm-8 col-xs-12">
            <OrgChart orgChartdata={this.state.employeeOrgData} onEmployeeSelected={this.onEmployeeSelected} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
