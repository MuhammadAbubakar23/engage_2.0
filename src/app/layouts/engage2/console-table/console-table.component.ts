import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { ConsoleTableService } from './console-table.service';

@Component({
  selector: 'console-table',
  templateUrl: './console-table.component.html',
  styleUrls: ['./console-table.component.scss']
})
export class ConsoleTableComponent<T> implements OnInit, OnDestroy { // extends this
 // menus : MenuModel[] = [];
  @Input() TableModel: T[] = []; //| undefined; //Observable<T>
  @Input() header: string[] = [];
  @Input() url:string = "";
  @Input() filter: any ={ pageno:1
              , pagesize:50
              , headers: [ ]
              };
  
  @Input() TableAction: any[] = [];
  

  private unsubscribe: Subject<void> = new Subject<void>();
  data? :any[];
  constructor(private _tableService: ConsoleTableService, private _request:RequestService, private _router:Router) { }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    
    console.log(this.header);
    console.log(this.url);
    this._fetchData();
  }
  filterdata() {
    this._fetchData();//this.filter?.pageno, this.filter?.pagesize);
  
  }
  private _fetchData(){ //: Observable<T> (page: number, pagesize: number)  {
   // 
    this._request.get<T[]>(this.url,  this.filter).pipe(
      takeUntil(this.unsubscribe)).subscribe(
      (next:T[]) => {//...next:T[]
        // console.log(next); 
        this.TableModel = next; 
        this.data = next;
        // console.log(this.TableModel)
      },
      (error:any) => console.log(error)
    );
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
      this._router.navigate([params.param.actionUrl, params.data.id]);
    }else if(params.param.type == "service"){//
      this._request.delete<any>(params.param.actionUrl,  params.data.id).pipe(
        takeUntil(this.unsubscribe)).subscribe(
        (next:T[]) => {//...next:T[]
           console.log(next); 
          //this.TableModel = next; 
          //this.data = next;
          // console.log(this.TableModel)
        },
        (error:any) => console.log(error)
      );
    }
     
  }
}
