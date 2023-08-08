import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request/request.service';

@Component({
  selector: 'console-table-body',
  templateUrl: './console-table-body.component.html',
  styleUrls: ['./console-table-body.component.scss']
})
export class ConsoleTableBodyComponent<T> implements OnInit {
  @Input() TblData:any;
  @Input() TblColumns:any;

  private unsubscribe: Subject<void> = new Subject<void>();
  
  constructor(private _router:Router, private _request:RequestService) { }

  ngOnInit(): void {
    
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
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
