import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from "../../../../shared/shared.module";
@Component({
  standalone:true,
  selector: 'app-csat-raw-data-report',
  templateUrl: './csat-raw-data-report.component.html',
  styleUrls: ['./csat-raw-data-report.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgxSpinnerModule, SharedModule]
})
export class CsatRawDataReportComponent implements OnInit {
  totalCounts: any;
  csatRawData: any;
  csatColumns: any = [];
  columnHeadings: any;
  rowData: any;
  startingPoint: any;
  endingPoint: any;
  maxEndDate: any;
  pageNumber: number = 1;
  fromDate: string = '';
  toDate: string = '';
  itemperPage: number = 20;
  totalPages: any;
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  isChannelShow: any;
  channelOptions:any
  activeChannel: any;
  slectedChannelsName:any[]=[]
searchText: any;
  constructor(
    private commonService: CommonDataService,
    private datePipe: DatePipe,
    private _hS: HeaderService,
    private SpinnerService: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.activeChannel = window.location.origin
    if (this.activeChannel == 'https://waengage.enteract.live') {
      this.isChannelShow = "morinaga";
      this.getChannel()
    }
    else if (this.activeChannel == 'https://keportal.enteract.live') {
      this.isChannelShow = 'KE';
      this.getChannel()
    }
    else if (this.activeChannel == 'https://engageui.enteract.live') {
      this.isChannelShow = 'damo';
      this.getChannel()
    }
    else if (this.activeChannel == 'https://tpplui.enteract.live') {
      this.isChannelShow = 'ttpl';
      this.getChannel()
    }
    else if (this.activeChannel == 'https://engage.jazz.com.pk') {
      this.isChannelShow = 'jazz'
      this.getChannel()
    }
    else if (this.activeChannel == 'https://uiengage.enteract.app') {
      this.isChannelShow = 'stagging'
      this.getChannel()
    }
    else if (this.activeChannel == 'https://uiengagerox.enteract.app') {
      this.isChannelShow = 'stagging'
      this.getChannel()
    }
    else if (this.activeChannel == 'https://bzengage.enteract.live') {
      this.isChannelShow = 'Bazaar',
        this.getChannel()
    }
    else {
      this.isChannelShow = 'loc'
      this.getChannel()
    }
    const newObj = {
      title: 'CAST Raw Data',
      url: '/analytics/cast-report',
    };
    this._hS.setHeader(newObj);
    const currentDate = new Date();
    // const oneDayBeforeCurrentDate = currentDate.setDate(
    //   currentDate.getDate() - 1ll
    // );
 this.maxEndDate=currentDate.toISOString().split('T')[0];
    this.GetWhatsAppRawData();
  }
  GetWhatsAppRawData() {
    if (this.toDate == '' && this.fromDate == '') {
      let currentDate = new Date();
      let prevDate = currentDate.setDate(currentDate.getDate() - 1);
      this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
      this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
      // this.fromDate = this.maxEndDate;
      // this.toDate = this.maxEndDate;
    } else if (this.fromDate != '' && this.toDate != '') {
      this.fromDate = this.fromDate;
      this.toDate = this.toDate;
    }
    const startDateObj=new Date(this.fromDate)
    const endDateobj= new Date(this.toDate)
    const timeDiff =Math.abs (endDateobj.getTime()-startDateObj.getTime())
    const daysdiff= Math.ceil(timeDiff/(1000*3600*24))
    if(daysdiff>30){
      alert('Select a date range of 30 days or less');
      this.toDate=''
      return;
    }
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemperPage,
      companyId: 0,
      channels: this.slectedChannelsName.toString()
    };
      this.SpinnerService.show();
      // this.commonService.GetWhatsAppReport(obj).subscribe((res: any) => {
        this.SpinnerService.hide();
        debugger
        const json={
          "TotalCount": 160207,
          "List": [
              {
                  "id": 74624,
                  "message": "How r u",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-14T12:11:13.487214",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281671",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "Hi how can i help you?",
                  "agentActivity": "Responded",
                  "agentName": "Taimoor  Wajid"
              },
              {
                  "id": 74626,
                  "message": "Hello",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547348",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281693",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74628,
                  "message": "Hii",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547456",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281694",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74630,
                  "message": "saf",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547474",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281695",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74632,
                  "message": "sfa",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547493",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281695",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74634,
                  "message": "sfa",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547508",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281697",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74636,
                  "message": "asd",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547522",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281697",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74638,
                  "message": "saf",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547541",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281697",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74640,
                  "message": "safsadf",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547555",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281698",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74642,
                  "message": "safaf",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547575",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281702",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74644,
                  "message": "sfsa",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547589",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281702",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74646,
                  "message": "7th",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547615",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281703",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74648,
                  "message": "6th",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547737",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281703",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74650,
                  "message": "5th",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547763",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281704",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74652,
                  "message": "4th",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547778",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281704",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74654,
                  "message": "This is 3rd",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547791",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281705",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74656,
                  "message": "This is second",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547812",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281705",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74658,
                  "message": "This is test message",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547825",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281705",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74660,
                  "message": "Hiiii",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.547845",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281706",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              },
              {
                  "id": 74662,
                  "message": "Are you there",
                  "profileId": "1467799120933003275",
                  "agentReplyTime": "2023-09-20T19:51:05.54786",
                  "queryStatus": "Completed",
                  "createdDate": "2023-09-12T21:09:38.281706",
                  "customerName": "UmairKh84808187",
                  "platform": "Twitter",
                  "agentReply": "",
                  "agentActivity": "Read",
                  "agentName": "CCPMO KE"
              }
          ]
      }
        this.csatRawData = json.List;
        this.totalCounts = json.TotalCount;
        if(this.totalCounts==0){
          this.startingPoint=0
          this.endingPoint=0
        }
        this.csatColumns = Object.keys(this.csatRawData[0]);
        if (this.pageNumber == 1) {
          this.startingPoint = 1;
        } else {
          this.startingPoint = (this.pageNumber - 1) * this.itemperPage + 1;
        }
        this.totalPages = Math.ceil(this.totalCounts / this.itemperPage);
        if (this.totalCounts <= this.startingPoint + this.itemperPage - 1) {
          this.endingPoint = this.totalCounts;
        } else {
          this.endingPoint = this.startingPoint + this.itemperPage - 1;
        }
      // },
    
      // );
  }
  DownloadWhatsAppRawData() {
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: 0,
      pageSize: 0,
    };
    this.downloading = true;
    this.reloadComponent('downloading');
    this.commonService.DownloadWhatsAppReport(obj).subscribe((res: any) => {
      // var array = JSON.parse(res);
      // this.excelService.exportAsExcelFile(array, 'whatsapp_raw_data');
      const a = document.createElement('a');
      a.href = res;
      a.download = 'WhatsappRawDataReport' + this.fromDate + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.downloading = false;
      this.reloadComponent('downloaded');
    });
  }
  nextPage(pageNumber: any) {
    let page = pageNumber + 1;
    if (page < this.totalPages + 1) {
      this.pageNumber = page;
      this.GetWhatsAppRawData();
    }
  }
  perviousPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
      }
    }
    this.GetWhatsAppRawData();
  }
  resetEndDate() {
    if (this.toDate >= this.fromDate) {
      this.GetWhatsAppRawData();
    } else {
      alert('EndDate is lessthen StartDate');
      this.toDate = '';
    }
  }
  resetStartDate(){
    this.toDate=''
  }
  closeToaster() {
    this.toastermessage = false;
  }
  checkUncheckChannels(channelName:any){
    debugger
    const index= this.slectedChannelsName.findIndex((item:any)=>item==channelName)
    // const index = this.selectedChannel.findIndex((x:any)=>x == channel.name)
    if(index != -1){
      this.slectedChannelsName.splice(index,1)
    }
    else{
      this.slectedChannelsName.push(channelName)
    }
console.log('this.selectedChannelSName===>',this.slectedChannelsName)
  }
  reloadComponent(type: any) {
    if (type == 'downloading') {
      this.AlterMsg = 'Downloading Started';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'downloaded') {
      this.AlterMsg = 'Your File has been downloaded Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
  getChannel() {
    if (this.isChannelShow == "morinaga") {
      this.channelOptions = [
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
      ];
    }
    if (this.isChannelShow == "jazz") {
      this.channelOptions = [
        { id: '11', name: 'Select All Channels', icon: '', isSelected: false },
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        { id: '18', name: 'Playstore', icon: 'fa-brands fa-google-play pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == "ttpl") {
      this.channelOptions = [
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == "KE") {
      this.channelOptions = [
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == "damo") {
      this.channelOptions = [
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == 'loc') {
      this.channelOptions = [
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
        // { id: '16', name: 'SMS', icon: 'fa-solid fa-comment-alt pe-2', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        // { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '19', name: 'OfficeEmail', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '20', name: 'WebChat', icon: 'fa-solid fa-comment-dots pe-2', isSelected: false }
        { id: '18', name: 'Playstore', icon: 'fa-brands fa-google-play pe-2', isSelected: false },
      ];
    }
    else if (this.isChannelShow == 'stagging') {
      this.channelOptions = [
        { id: '11', name: 'Twitter', icon: 'fa-brands fa-twitter sky pe-2', isSelected: false },
        { id: '12', name: 'Instagram', icon: 'fa-brands fa-instagram pe-2', isSelected: false },
        { id: '13', name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in linkedinTxt pe-2', isSelected: false },
        { id: '14', name: 'Facebook', icon: 'fab fa-facebook navytext pe-2', isSelected: false },
        { id: '15', name: 'YouTube', icon: 'fa-brands fa-youtube pe-2', isSelected: false },
        // { id: '16', name: 'SMS', icon: 'fa-solid fa-comment-alt pe-2', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        // { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '19', name: 'OfficeEmail', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
        // { id: '20', name: 'WebChat', icon: 'fa-solid fa-comment-dots pe-2', isSelected: false }
      ];
    }
    if (this.isChannelShow == 'Bazaar') {
      this.channelOptions = [
        { id: '11', name: 'Select All Channels', icon: '', isSelected: false },
        { id: '17', name: 'WhatsApp', icon: 'fa-brands fa-whatsapp pe-2', isSelected: false },
        { id: '18', name: 'Email', icon: 'fa-solid fa-envelope pe-2', isSelected: false },
      ];
    };
  }
}
