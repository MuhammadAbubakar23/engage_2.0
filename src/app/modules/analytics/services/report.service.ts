import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

//https://reportbuilder.360scrm.com/
//http://localhost:8000/
export class ReportService {
  private apiUrl = 'https://reportbuilder.360scrm.com/reports/';
  constructor(private http: HttpClient) { }

  login() {
    const body = { email: 'admin@gmail.com', password: 'admin' };
    return this.http.post("https://reportbuilder.360scrm.com/user/" + "api/token", body);
  }

  gethttpOptions() {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem('token')
    });

    let httpOptions = {
      headers: headers_object
    };
    return httpOptions
  }
  getDataBasesApi(): Observable<any> {
    let httpOptions = this.gethttpOptions()

    return this.http.get<any>(this.apiUrl, httpOptions);
  }
  listDbSetiingApi(): Observable<any> {
    let httpOptions = this.gethttpOptions()

    return this.http.get(this.apiUrl + "db-settings", httpOptions)
  }
  getDbSettingById(id: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.get(this.apiUrl + `db-settings/${id}`, httpOptions)
  }
  createDbSetiingApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post(this.apiUrl + "db-settings", data, httpOptions)
  }

  updateDbSetiingApi(id: any, data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.put(this.apiUrl + `db-settings/${id}`, data, httpOptions)
  }
  deleteDbSetiingApi(id: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.delete(this.apiUrl + `db-settings/${id}`, httpOptions)
  }


  getConnectiondatabases(connection_name: any): Observable<any> {
    const params = new HttpParams().set('connection_name', connection_name)
    let httpOptions = this.gethttpOptions()
    return this.http.get(this.apiUrl + "connect/" + params.toString(), httpOptions)
  }

  selectDatabaseApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + 'tables', data, httpOptions);
  }

  connectDatabaseApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "db-connect", data, httpOptions);
  }

  selectTableApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "gettabledata", data, httpOptions);
  }

  limitDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "rowlimit", data, httpOptions);
  }
  paginatedDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "pagination", data, httpOptions);
  }
  columnsApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "getcolumns", data, httpOptions);
  }

  sortDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "gettablesortdata", data, httpOptions);
  }

  groupDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "getbygroup", data, httpOptions);
  }
  summarizeDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "summarize", data, httpOptions);
  }
  visualizeDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "visualize", data, httpOptions);
  }
  selectedtablesDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "selectedtables", data, httpOptions);
  }
  joinDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "joinresult", data, httpOptions);
  }
  filtersDataApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "filters", data, httpOptions);
  }
  runSqlApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "customqueryresult", data, httpOptions);
  }

  createReportApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "create-report", data, httpOptions);
  }

  reportslistApi(): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.get<any>(this.apiUrl + "list-report", httpOptions);
  }
  reportExecuteApi(data: any): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.post<any>(this.apiUrl + "reportexecute", data, httpOptions);
  }
  reportupdateApi(): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.put<any>(this.apiUrl + "update-report", httpOptions);
  }

  reportdeleteApi(): Observable<any> {
    let httpOptions = this.gethttpOptions()
    return this.http.delete<any>(this.apiUrl + "delete-report", httpOptions);
  }
}
