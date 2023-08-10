import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tooltip } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { SignalRService } from 'src/app/services/SignalRService/signal-r.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { WebChatDto } from 'src/app/shared/Models/WebChatDto';
import { WebChatReplyDto } from 'src/app/shared/Models/WebChatReplyDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';

@Component({
  selector: 'app-web-chat',
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.scss']
})
export class WebChatComponent implements OnInit {

  @ViewChild('radioInput', { static: false }) radioInput!: ElementRef<HTMLInputElement>;

  id = this.fetchId.id;
  data:any;
  WebChat:any;
  slaId = this.fetchId.getSlaId();
  queryType = this.getQueryTypeService.getQueryType();

  

  Chat:any[]=[];

  webChatDto = new WebChatDto();

  public criteria!: SortCriteria;

  commentsArray : any[]=[];
  groupArrays : any[]=[];
  
  constructor(private fetchId: FetchIdService,
    private SpinnerService : NgxSpinnerService,
    private signalRService : SignalRService,
    private changeDetect : ChangeDetectorRef,
    private commondata : CommonDataService,
    private ticketResponseService : TicketResponseService,
    private getQueryTypeService : GetQueryTypeService
    ) {
      // this.criteria={
      //   property: 'createdDate',
      //   descending: false
      // };
     }

  ngOnInit(): void {

    // Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode));
     
    this.getWebChat();
   // this.signalRService.startConnection();
   // this.addTransferChatDataListener(); 
   this.ticketResponseService.getTicketId().subscribe(res=>{
    this.updateTicketId(res)
  });

  }

  filterDto = new FiltersDto();
  totalUnrespondedCmntCountByCustomer:number=0;
  To:any;

  getWebChat(){
    if(this.id != null || undefined){
      localStorage.setItem('storeOpenedId', this.id);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: 'Webchat',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
        queryType: this.queryType,
        text : "",
        userName: '',
        notInclude: '',
        include: '',
        flag: '',
      };
      this.SpinnerService.show();
      this.commondata
        .GetChannelConversationDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.Chat = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;

          this.Chat.forEach((item:any) => {
            
            item.comments.forEach((cmnt:any) => {
              this.commentsArray.push(cmnt)
            });
              let groupedItems = this.commentsArray.reduce((acc:any, item:any)=>{
                const date = item.createdDate.split('T')[0];
                if(!acc[date]){
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              }, {})
        
              this.groupArrays = Object.keys(groupedItems).map((date)=>{
                return {
                  date,
                  items : groupedItems[date]
                }
              })
              // // console.log("hello", this.groupArrays)
             });
  
          this.Chat.forEach((msg:any) => {
            this.To = msg.comments[0].to;
          });
  
       });
    } else if(this.slaId != null || undefined){
      localStorage.setItem('storeOpenedId', this.slaId);
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.slaId,
        pageId: '',
        plateForm: 'Webchat',
        pageNumber: 0,
        pageSize: 0,
        isAttachment: false,
        queryType: this.queryType,
        text : "",
        userName: '',
        notInclude: '',
        include: '',
        flag: '',
      };
      this.SpinnerService.show();
      this.commondata
        .GetSlaDetail(this.filterDto)
        .subscribe((res: any) => {
          this.SpinnerService.hide();
          this.Chat = res.List;
          this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
  
          this.Chat.forEach((msg:any) => {
            this.To = msg.comments[0].to;
          });
  
       });
    }
   
  }
  public addTransferChatDataListener = () => {
    this.signalRService.hubconnection.on('getAllMachineLogs', (data)=>{
       
      this.webChatDto = {
          chatId: data.chatId,
          fromId: data.fromId,
          fromName: data.fromName,
          createdDate: data.createdDate,
          message: data.message,
          type: data.type
      }
      if(data.type == 'VM'){
        this.WebChat.VisitorMessages.push(this.webChatDto);
        this.Chat.push(this.webChatDto);
      } else if (data.type == 'AR'){
        this.WebChat.AgentReplies.push(this.webChatDto);
        this.Chat.push(this.webChatDto);
      }
      
      
      // // console.log(this.Chat);

      this.changeDetect.detectChanges();
    });
  }

  webChatReplyDto = new WebChatReplyDto()

  WebChatReplyForm = new UntypedFormGroup({
    id : new UntypedFormControl(this.webChatReplyDto.id),
    wcVisitorId: new UntypedFormControl(this.webChatReplyDto.wcVisitorId),
    wcVisitorSessionId: new UntypedFormControl(this.webChatReplyDto.wcVisitorSessionId),
    isMediaMessage: new UntypedFormControl(this.webChatReplyDto.isMediaMessage),
    mediaType: new UntypedFormControl(this.webChatReplyDto.mediaType),
    loggedInUserId: new UntypedFormControl(this.webChatReplyDto.loggedInUserId),
    replyMessage: new UntypedFormControl(this.webChatReplyDto.replyMessage),
    loggedInUserName: new UntypedFormControl(this.webChatReplyDto.loggedInUserName)
  });

  submitWebChatReply(){
     
    this.WebChatReplyForm.patchValue({
      wcVisitorId: this.WebChat.Visitor.id,
      wcVisitorSessionId: this.WebChat.Session.id,
      fromName:this.WebChat.VisitorMessages[0].fromName
    });
    this.radioInput.nativeElement.checked = false;
    // this.quickReplySearchText = '';

    // this.webchatdata.SendWebChatReply(this.WebChatReplyForm.value).subscribe((res: any) => {
    //  //  alert(res.message);
    //  },
    //  ({ error }) => {
    //    alert(error.message || error.title);
    //  }
    // );
    
}

updateTicketId(res: any) {
  this.groupArrays.forEach((cmnt: any) => {
    cmnt.items.forEach((singleCmnt: any) => {
      if (singleCmnt.id == res.queryId) {
        singleCmnt.ticketId = res.ticketId;
      }
    });
  });
  this.changeDetect.detectChanges();
}
onScrollComments() {
  // if (this.TotalCmntQueryCount > this.pageSize) {
  //   this.pageSize = this.pageSize + 10;
  //   this.getWebChat();
  // }

}
closeQuickResponseSidebar(){
  // this.quickReplySearchText = '';
  this.radioInput.nativeElement.checked = false;
  
}
}
