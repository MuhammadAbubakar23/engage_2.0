import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { isArguments } from 'lodash';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ConsoleTableVisibilityPipe } from './console-table-visibility.pipe';
import { ConsoleTableService } from './console-table.service';
import { ConsoleTableParams } from './console-table-params';
import { ConsoleTablePaginatedState } from './console-table-state/console-table-paginated.component-store';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserPaginationService } from 'src/app/services/userpaginationServices/user-pagination.service';
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
  pagingParams$: any = {};
  pastPagingParams$: any = {};
  // {
  //   pageIndex: 1,
  //   pageSize: 10,
  //   length: 100,
  //   pageSizeOptions:[10,25,50,100],
  // };
  pagingSizeOptions$: number[] = [10, 25, 50, 100];
  pagingSize$: number = 10;
  pagingIndex$: number = 1;
  pagingLength$: number = 100;
  pageSearchText$: string = "";
  startpoint:any
  endpoint:any
  totalCount:any
  totalPage:any
  data?: any;
  @Input() identifire: string = 'id';
  @Input() JsonFile: string = 'default';//[JsonFile]="'users.json'"
  @Input() TableModel: T[] = []; //| undefined; //Observable<T>
  @Input() filter: any;
  @Input() OverLayIsActive: boolean = false;

  tableJson$: ConsoleTableParams = new ConsoleTableParams;

  //tableJson$:any={};
  constructor(private _tableService: ConsoleTableService, private _request: RequestService, 
    private spinerService:NgxSpinnerService,
    private userpaginationS:UserPaginationService,
    private _router: Router) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    // this.unsubscribe$.unsubscribe();
  }
  ngOnInit(): void {
    
    this.userpaginationS.receivedpaginationObj().subscribe((res:any)=>{
      
      this.totalCount=res?.totalItems

    })
    //length: 100,
    //this.pagingSize$ = this.filter.pagesize;
    //this.pagingIndex$ = this.filter.pageno;
    this._fetchData();
  }
  IsEmptyOrWhiteSpace(word: any) {
    return (word.match(/^\s*$/) || []).length > 0;
  }
  reloader() {

    if(this.pageSearchText$.length> 2){
      this._fetchData();
    }
    if(this.pageSearchText$.length == 0){
      this._fetchData()
    }
 
  }
  // seracher(search: string) {
  //   //alert(search);
  //   //alert(this.IsEmptyOrWhiteSpace(search))
  //   //|| (this.IsEmptyOrWhiteSpace(search) && search.length == 0))
  //   if (search != null && !this.IsEmptyOrWhiteSpace(search)) {
  //     this.pageSearchText$ = search;
  //     this._fetchData();
  //   }
  // }

  seracher(search: string) {
    this.pageSearchText$ = search;
    this._fetchData();
  }

  handleSearch(searchQuery: string) {
    if (searchQuery.length >= 3 || searchQuery.length === 0) {
      this.seracher(searchQuery);
    }
  }

  paginator(paging: any) {

    if (paging != null && typeof paging === 'object') {
      if (paging!.pageIndex > 0) {
        this.pagingParams$.pageIndex = paging.pageIndex;
      }
      if (paging!.pageSize > 0) {
        this.pagingParams$.pageSize = parseInt(paging.pageSize);
      }
    }
    //this.pagingParams$ = paging;
    //this.pagingParams$ = paging;
    this._fetchData();
  }
  filterdata() {

    this._fetchData();//this.filter?.pageno, this.filter?.pagesize);
  }
   _fetchData() { //}: Observable<T>{ // (page: number, pagesize: number)  {
    
    if (typeof this.filter?.url === 'undefined') return;
    // let pam:any = {
    //     pageno: this.filter.pageno
    //   , pagesize: this.filter.pagesize
    //   , search: this.filter.search
    // };
      this.pagingParams$.pageIndex = this.pagingIndex$;
    this.pagingParams$.pageSize = this.pagingSize$
    if (this.filter?.template?.toolbar == 'top') {
      this.pagingParams$.searchText = this.pageSearchText$;

      let paramextended: any[] = [];
      this.filter?.headers?.forEach((item: any, index: number, arr: any) => {
        if (!item.actions)
          for (let i = 0; i < item.index.length; i++) {
            let alter = item.index[i].toString();
            if (item.order != null && item.search == true && alter != "image") {
              paramextended[i] = { name: alter, order: item.order, search: item.search }
            }
            // this.pagingParams$[alter] = { order: item.order, search : item.search }
          }

        this.pagingParams$.contain = JSON.stringify(paramextended);
      })
    }
    else {
      this.pagingParams$ = {};
    }
    // pageIndex: 1
    // pageSize: 10
    // searchText: 
    // contain: [{"name":"fullName","order":"ASC","search":true},{"name":"email","order":"ASC","search":true}]
    //filter?.template?.toolbar=='top'
    // encodeURIComponent
    // if(this.filter?.url && !this.filter?.url)
this.spinerService.show()
    this._request.get<T[]>(this.filter.url, this.pagingParams$).pipe(
      takeUntil(this.unsubscribe$)).subscribe({

        next: (nxt: T[]) => {
this.spinerService.hide()
          this.data = nxt;
        if(this.data.length==0 || this.data==null){
       
          this.endpoint=0
          this.totalCount=0
        }
       
          if(this.pagingIndex$==1){
      this.startpoint =this.pagingIndex$
          }
          else{
            this.startpoint= (this.pagingIndex$ -1) * this.pagingSize$ +1
          }
          this.totalPage = Math.ceil(this.totalCount/ this.pagingSize$)
          if(this.totalCount <=this.startpoint +this.pagingSize$ -1){
            this.endpoint=this.totalCount
          }
          else{
            this.endpoint= this.startpoint +  this.pagingSize$ -1
          }
        },
        error: (error: any) => console.error(error),
        complete: () => console.info('complete')
      }
      );
    // console.table(this.data);
    // this._tableService.GetAll(this.url,  this.filter).subscribe((next: any) => {
    //   // this.Data = next.data.item1;
    //   // this.total = next.data.item2 * this.pagesize
    // }, (error: any) => {
    // });
  }
  perviousPage(pagingIndex:any){

    if (pagingIndex >= 1) {
      let page = pagingIndex - 1;
      if (page > 0) {
        this.pagingIndex$ = page;
        this._fetchData()
      }
    }
  }
  nextPage(pagingIndex:any){

let page= pagingIndex + 1
if(page < this.totalPage + 1 ){
  this.pagingIndex$ =page
  this._fetchData()
}
  }
  procedure(params: any) {
    if (params.param.type == "rute") {

      this.navigateToPage(params);
    } else if (params.param.type == "service") {//
      this.deleteFromDatabase(params);
    } else if (params.param.type == "overlay") {
      this.loadOverlayComponenet(params)
    }

  }
  navigateToPage(params: any) {

    this._router.navigate([params.param.actionUrl, params.data[this.identifire]]);
  }
  deleteFromDatabase(params: any) {

    var obj = {
      "id": params.data[this.identifire],
      "name": "string",
      "norm": "string",
      "slug": "string",
      "link": "string",
      "desc": "string",
      "type": "string"
    }
    this._request.delete<any>(params.param.actionUrl, params.data[this.identifire]).pipe(
      takeUntil(this.unsubscribe$)).subscribe({
        next: (nxt: any) => console.table(nxt),
        error: (error: any) => console.error(error),
        complete: () => console.info('complete')
      });
  }
  loadOverlayComponenet(params: any) {

  }
}
