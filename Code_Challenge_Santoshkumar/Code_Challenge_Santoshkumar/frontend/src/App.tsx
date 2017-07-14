import * as React from 'react';
import './App.css';
import { IEmployee, IOrgChartData, IDeletePayload } from './common/interfaces';
import InputForm from './components/InputForm';
import OrgChart from './components/OrgChart';
import FetchData, { httpMethod } from './api/fetchData';
import config from './common/config';
var ToastContainer = require('react-toastify').ToastContainer;
var toast = require('react-toastify').toast;
import 'react-toastify/dist/ReactToastify.min.css';
import Notify, { SuccessNotifyOptions, ErrorNotifyOptions } from './common/notify';

class App extends React.Component<{}, { employeeOrgData: IOrgChartData[]; employeeToHandle?: IEmployee; }> {
  Employees: IEmployee[] = [];

  constructor(props: any) {
    super(props);
    this.state = { employeeOrgData: [] };
    this.getEmployeeOrgChart();
  }

  onDataSubmited = async (employee: IEmployee) => {
    let OrgChartData: IOrgChartData[] = [];
    if (employee && employee.id > 0) {
      try {
        OrgChartData = await FetchData.postData(config.apiEndpoints.UpdateEmployees, employee, httpMethod.PUT);
        toast(<Notify message="Employee data updated" />, SuccessNotifyOptions);
      } catch (e) {
        toast(<Notify message={`Failed to update Employee. ${e.message}`} />, ErrorNotifyOptions);
      }
    } else {
      try {
        OrgChartData = await FetchData.postData(config.apiEndpoints.AddEmployees, employee, httpMethod.POST);
        toast(<Notify message="New Employee added" />, SuccessNotifyOptions);
      } catch (e) {
        toast(<Notify message={`Failed to add Employee. ${e.message}`} />, ErrorNotifyOptions);
      }
    }
    this.Employees = [];
    this.getEmployeeDataOnly(OrgChartData);
    this.setState({ employeeOrgData: OrgChartData });
  }

  onDataDeleted = async (idToDelete: number, alternativeManagerID?: number) => {
    let OrgChartData;
    if (idToDelete > 0) {
      try {
        const deletePayload: IDeletePayload = { id: idToDelete, alertnativeManagerId: alternativeManagerID };
        OrgChartData = await FetchData.postData(config.apiEndpoints.DeleteEmployee, deletePayload, httpMethod.DELETE);
        toast(<Notify message="Emloyee Deleted successfully" />, SuccessNotifyOptions);
        this.Employees = [];
        this.getEmployeeDataOnly(OrgChartData);
        this.setState({ employeeOrgData: OrgChartData });
      } catch (e) {
        toast(<Notify message={`Error deleting data. ${e.message}`} />, ErrorNotifyOptions);
      }
    } else {
      toast(<Notify message="Invalid data, ID is missing" />, ErrorNotifyOptions);
    }

  }

  getEmployeeOrgChart = async () => {
    try {
      const OrgChartData = await FetchData.getEmployeeHierarchy(config.apiEndpoints.GetEmployeesByHeirarchy);
      this.Employees = [];
      this.getEmployeeDataOnly(OrgChartData);
      this.setState({ employeeOrgData: OrgChartData });
    } catch (e) {
      toast(<Notify message="Unable to get Employee data from Server, please try again later" />, ErrorNotifyOptions);
    }
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

  resetFormData = () => {
    this.setState({ employeeToHandle: undefined });
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
              onReset={this.resetFormData}
            />
            <ToastContainer autoClose={6000} position={toast.POSITION.TOP_LEFT} />
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
