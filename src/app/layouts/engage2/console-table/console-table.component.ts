import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { isArguments } from 'lodash';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ConsoleTableVisibilityPipe } from './console-table-visibility.pipe';
import { ConsoleTableService } from './console-table.service';
import { ConsoleTableParams } from './console-table-params';

@Component({
  selector: 'console-table',
  templateUrl: './console-table.component.html',
  styleUrls: ['./console-table.component.scss'],
  providers: [ ConsoleTableVisibilityPipe ]
})
export class ConsoleTableComponent<T> implements OnInit, OnDestroy { // extends this
  private unsubscribe$: Subject<void> = new Subject<void>();
  
  data?:any;
  @Input() JsonFile:string='default';
  @Input() TableModel: T[] = []; //| undefined; //Observable<T>
  @Input() filter: any; 
  @Input() OverLayIsActive:boolean=false;

  tableJson$:ConsoleTableParams = new ConsoleTableParams;

  //tableJson$:any={};
  constructor(private _tableService: ConsoleTableService, private _request:RequestService, private _router:Router) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    // this.unsubscribe$.unsubscribe();
  }
  // async fetchJson(){
  //   fetch("/assets/JSON/"+this.JsonFile).then(res => res.json())
  //   .then(json => {
  //     console.log(json)
       
  //   });
  // }
  ngOnInit(): void {
    // let tabl = fetchJSON("/assets/JSON/"+this.JsonFile);
    //console.log(tabl);
     // this.tableJson$
    // console.log(this.tableJson$);
    // this.header = this.filter.headers;
    // console.log(this.filter.headers);
    // console.log(this.filter.url);
    this._fetchData();
  }
  filterdata() {
    this._fetchData();//this.filter?.pageno, this.filter?.pagesize);
  }
  private _fetchData(){ //}: Observable<T>{ // (page: number, pagesize: number)  {
   // ;
   if(typeof this.filter?.url === 'undefined') return;
   console.log(this.filter)
    let pam:any = {
        pageno: this.filter.pageno
      , pagesize: this.filter.pagesize
      , search: this.filter.search
    };

    this.filter?.headers?.forEach((item:any, index:number, arr:any) => {
      if(!item.actions)
        for(let i = 0; i < item.index.length; i++ ){
          let alter = item.index[i].toString();
          pam[alter] = { order: item.order, search : item.search }                  
        }              
    })   
    // if(this.filter?.url && !this.filter?.url)
    this._request.get<T[]>(this.filter.url, pam, this.filter.urlparams).pipe(
      takeUntil(this.unsubscribe$)).subscribe({
        next: (nxt:T[]) => {
          this.data = nxt;
        },
        error: (error:any) => console.error(error),
        complete: () => console.info('complete') 
      }
    );
    // console.table(this.data);
    // this._tableService.GetAll(this.url,  this.filter).subscribe((next: any) => {
    //   // this.Data = next.data.item1;
    //   // this.total = next.data.item2 * this.pagesize
    // }, (error: any) => {
    //   console.log(error);
    // });
  }
  procedure(params:any){
    console.log("sent val --- >>>",params.param)
    console.log("added Data --- >>>",params.data)
    console.log("I m func action");
    if(params.param.type == "rute"){
      this.navigateToPage(params);
    }else if(params.param.type == "service"){//
      this.deleteFromDatabase(params);    
    }else if (params.param.type == "overlay"){
      this.loadOverlayComponenet(params)
    }
     
  }
  navigateToPage(params:any){
    this._router.navigate([params.param.actionUrl, params.data.id]);
  }
  deleteFromDatabase(params:any){
    this._request.delete<any>(params.param.actionUrl,  params.data.id).pipe(
      takeUntil(this.unsubscribe$)).subscribe({
      next: (nxt:any) => console.table(nxt),
      error: (error:any) => console.error(error),
      complete: () => console.info('complete') });
  }
  loadOverlayComponenet(params:any){

  }
}
