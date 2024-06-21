import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/modules/console/components/users/users.service';
import { SafePipe } from 'src/app/shared/pipes/safe.pipe';

@Component({
  selector: 'console-table-action-list',
  templateUrl: './console-table-action-list.component.html',
  styleUrls: ['./console-table-action-list.component.scss'],
  providers: [SafePipe]
})
export class ConsoleTableActionListComponent implements OnInit {
  // actionli:string=""; 
  // actionlisenit?:any; 
  // listaction:Array<any> = [];

  @Input() data: any[] = [];
  @Input() actions: Array<any> = [];

  @Output() action: any;
  @Output() procedure: EventEmitter<any> = new EventEmitter();

  constructor(private userserv: UsersService, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    // this.actions.forEach((item:any, index:number, arr:any) => {
    //   this.listaction.push(item);
    //   this.actionli+='<li><button class="dropdown-item" (click)="funcAction(\''+item.actionUrl+'\')" ><i class="'+item.icon+'"></i>'+item.name+'</button></li>'
    // });
    // this.actionlisenit = this.sanitizer.bypassSecurityTrustHtml(this.actionli);
  }
  funcAction(params: any) {
    
    let data = {
      param: params,
      data: this.data
    }
    this.procedure.emit(data);
    //this.userserv.send(url);
  }
}
