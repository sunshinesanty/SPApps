import config from '../common/config';
import { IPayload, IOrgChartData } from '../common/interfaces';

export enum httpMethod {
    'GET',
    'POST',
    'PUT',
    'DELETE'
}
export class FetchData {

    getEmployeeHierarchy(endpoint: string): Promise<IOrgChartData[]> {
        return new Promise<IOrgChartData[]>((resolve, reject) => {
            this.fetchIt(httpMethod.GET, endpoint)
                .then((result: IOrgChartData[]) => resolve(result))
                .catch(reject);
        });
    }
    getEmployeeDetails(endpoint: string): Promise<IOrgChartData> {
        return new Promise<IOrgChartData>((resolve, reject) => {
            this.fetchIt(httpMethod.GET, endpoint)
                .then((result: IOrgChartData) => resolve(result))
                .catch(reject);
        });
    }
    postData(endpoint: string, payload: IPayload, method: httpMethod ): Promise<IOrgChartData[]> {
        return new Promise<IOrgChartData[]>((resolve, reject) => {
            let bodyContent = JSON.stringify(payload);
            this.fetchIt(method, endpoint, bodyContent)
                .then((result: IOrgChartData[]) => resolve(result))
                .catch(reject);
        });
    }
    private getHttpOption(method: httpMethod, body?: string) {
        let headers = new Headers();
        let httpOptions: RequestInit;
        headers.append('Access-Control-Allow-Origin', 'origin');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/json');
        httpOptions = {
            headers: headers,
            mode: 'cors',
            cache: 'default',
            method: httpMethod[method]
        };
        if (body) { httpOptions.body = body; }
        return httpOptions;
    }
    private async fetchIt(method: httpMethod, endPoint: string, body?: string) {
        try {
            let httpOptions = this.getHttpOption(method, body);
            let responce = await fetch(`${config.network.baseEndPointUrl}${endPoint}`, httpOptions);
            if (!responce.ok) {
                let err = await responce.json();
                return new Promise<any>((resolve, reject) => reject(err));
            }
            let result = await responce.json();
            return new Promise<any>((resolve) => resolve(result));
        } catch (err) {
            return new Promise<any>((resolve, reject) => reject(err));
        }
    }
}

export default new FetchData();
