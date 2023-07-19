import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { isArguments } from 'lodash';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ConsoleTableVisibilityPipe } from './console-table-visibility.pipe';
import { ConsoleTableService } from './console-table.service';
import { ConsoleTableParams } from './console-table-params';
// import { provideComponentStore } from '@ngrx/component-store';
// import { ConsoleTableComponentStore } from './console-table.component-store';
// provideComponentStore(ConsoleTableComponentStore), 
@Component({
  selector: 'console-table',
  templateUrl: './console-table.component.html',
  styleUrls: ['./console-table.component.scss'],
  providers: [ConsoleTableVisibilityPipe],
})
export class ConsoleTableComponent<T> implements OnInit, OnDestroy { // extends this
  
  // private readonly _componentStore = inject(ConsoleTableComponentStore<T>);  
  // readonly vm$ = this._componentStore.vm$;
  // onPreviousPage(): void {
  // onNextPage(): void {
  //   this._componentStore.loadNextPage();
  // }
  private unsubscribe$: Subject<void> = new Subject<void>();
  pagingParams$:any= {};
  // {
  //   pageIndex: 1,
  //   pageSize: 10,
  //   length: 100,
  //   pageSizeOptions:[10,25,50,100],

  // };
  pagingSizeOptions$:Array<number> = [10,25,50,100];
  pagingSize$:number = 10;
  pagingIndex$:number = 1;
  pagingLength$:number = 100;
  pagingSearch$:string = "";

  data?:any;
  @Input() identifire:string='id';
  @Input() JsonFile:string='default';//[JsonFile]="'users.json'"
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
  ngOnInit(): void {
    this.pagingParams$.pageIndex =  this.pagingIndex$;
    this.pagingParams$.pageSize = this.pagingSize$
    //length: 100,
    //this.pagingSize$ = this.filter.pagesize;
    //this.pagingIndex$ = this.filter.pageno;
    this._fetchData();
  }
  IsEmptyOrWhiteSpace(word:any) {
    return (word.match(/^\s*$/) || []).length > 0;
  }
  seracher(search:string){
    if(search != null && this.IsEmptyOrWhiteSpace(search) && (search.length>2 || search.length==0))
    {
      this.pagingSearch$ = search;
      this._fetchData();
    }    
  }
  paginator(paging: unknown){
    console.log(paging);
    this.pagingParams$ = paging;
    this._fetchData();
  }
  filterdata() {
    this._fetchData();//this.filter?.pageno, this.filter?.pagesize);
  }
  private _fetchData(){ //}: Observable<T>{ // (page: number, pagesize: number)  {
   // ;
   if(typeof this.filter?.url === 'undefined') return;
   console.log(this.filter)
    // let pam:any = {
    //     pageno: this.filter.pageno
    //   , pagesize: this.filter.pagesize
    //   , search: this.filter.search
    // };
    if(this.filter?.template?.toolbar=='top'){
      this.pagingParams$.searchText = this.pagingSearch$;

      let paramextended:any[]=[];
      this.filter?.headers?.forEach((item:any, index:number, arr:any) => {
        if(!item.actions)
          for(let i = 0; i < item.index.length; i++ ){
            let alter = item.index[i].toString();
            if(item.order != null && item.search == true && alter != "image"){
              paramextended[i] = { name:alter, order: item.order, search : item.search }
            }
            
          // this.pagingParams$[alter] = { order: item.order, search : item.search }                  
          }              
      
          this.pagingParams$.contain =  JSON.stringify(paramextended); 
      })
    }
    this.pagingParams$ = {};
    //filter?.template?.toolbar=='top'
    // encodeURIComponent
    // if(this.filter?.url && !this.filter?.url)
    this._request.get<T[]>(this.filter.url, this.pagingParams$, this.filter.urlparams).pipe(
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
    console.log(params);
    console.log(params.param.actionUrl);
    console.log(this.identifire);
    console.log(params.data[this.identifire]);

    this._router.navigate([params.param.actionUrl, params.data[this.identifire]]);
  }
  deleteFromDatabase(params:any){
    this._request.delete<any>(params.param.actionUrl,  params.data[this.identifire]).pipe(
      takeUntil(this.unsubscribe$)).subscribe({
      next: (nxt:any) => console.table(nxt),
      error: (error:any) => console.error(error),
      complete: () => console.info('complete') });
  }
  loadOverlayComponenet(params:any){

  }
}
