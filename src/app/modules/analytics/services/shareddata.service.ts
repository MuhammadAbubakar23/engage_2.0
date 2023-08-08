import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {
  private dataSubject = new BehaviorSubject<any>('Initial Data');
  private querySubject = new BehaviorSubject<any>('Please Type Query');
  private tablesSubject = new BehaviorSubject<any>('initial tables');
  private visualSubject = new BehaviorSubject<any>('Initial Data');
  private chartTypeSubject = new BehaviorSubject<any>('Bar Chart');
  private chartDataSubject = new BehaviorSubject<any>('Bar Chart');
  public data$ = this.dataSubject.asObservable();
  public query$ = this.querySubject.asObservable();
  public tables$ = this.tablesSubject.asObservable();
  public visual$ = this.visualSubject.asObservable();
  public charttype$ = this.chartTypeSubject.asObservable();
  public chartdata$ = this.chartDataSubject.asObservable();
  updateData(newData: any) {
    this.dataSubject.next(newData);
  }
  updateQuery(newquery: any) {
    this.querySubject.next(newquery);
  }
  updateTables(tables: any) {
    this.tablesSubject.next(tables);
  }
  updateVisual(tables: any) {
    this.visualSubject.next(tables);
  }
  updatechartType(chart: any) {
    this.chartTypeSubject.next(chart);
  }
  updatechartData(data: any) {
    this.chartDataSubject.next(data);
  }
  constructor() { }
}
