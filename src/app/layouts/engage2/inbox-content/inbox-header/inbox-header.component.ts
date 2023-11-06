import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'inbox-header',
  templateUrl: './inbox-header.component.html',
  styleUrls: ['./inbox-header.component.scss']
})
export class InboxHeaderComponent implements OnInit {

  flag:string='';
  inboxHeader:any[]=[];
  constructor(private stor: StorageService,
    private commonService: CommonDataService,
    private _route: Router) { }

  ngOnInit(): void {
    this.flag = this._route.url.split('/')[2];
    // this.getAllConversationCount();
    const headerMenu = this.stor.retrive('Tags', 'O').local;
      headerMenu.forEach((item:any) => {
        if(item.name == "Engage Header"){
          debugger
          item.subTags.forEach((singleInboxHeaderMenu:any) => {
            if(!this.inboxHeader.includes(singleInboxHeaderMenu)){
            this.inboxHeader.push(singleInboxHeaderMenu)
            }
          });
        }
      });
  }

  filterDto = new FiltersDto();
  pageNumber:number=1;
  pageSize:number=500;
  UnResponded:number=0;

  getAllConversationCount(){
    
    this.filterDto = {
      // fromDate : new Date(),
      // toDate : new Date(),
      user: '',
      pageId: '',
      plateForm: '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      isAttachment: false,
      queryType: '',
      text: '',
      userName: '',
      notInclude: '',
      include: '',
      flag: '',
    };
    this.commonService.GetConversationList(this.filterDto).subscribe((res:any)=>{
      this.UnResponded = res.TotalCount
    });
    
  }

  update(menuLink: any) {
    debugger
    this.flag = this._route.url.split('/')[2];

    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
    ) {
      this._route.navigateByUrl('/' + menuLink);
    } else {
      this.reloadComponent('querryAssigned')
    } 
  }

  AlterMsg:any;
  toastermessage:any;
  
  reloadComponent(type: any) {
    if (type == 'querryAssigned') {
      this.AlterMsg = 'Please Complete Querry First!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
}
