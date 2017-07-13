// tslint:disable:interface-name
export interface IPayload {
    id: number;
}
export interface IDeletePayload extends IPayload {
    alertnativeManagerId?: number;
}
export interface IEmployee extends IPayload {
    firstName: string;
    lastName: string;
    displayName?: string;
    managerID?: number;
}
export interface IOrgChartData {
    manager: IEmployee;
    reportees: IOrgChartData[];
}