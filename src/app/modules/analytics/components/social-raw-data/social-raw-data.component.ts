import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { SharedModule } from "../../../../shared/shared.module";
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, SharedModule],
  selector: 'app-social-raw-data',
  templateUrl: './social-raw-data.component.html',
  styleUrls: ['./social-raw-data.component.scss'],
})
export class SocialRawDataComponent implements OnInit {
  totalCounts: any;
  whatsAppRawData: any;
  whatsAppColumns: any = [];
  columnHeadings: any;
  RawData: any;
  startingPoint: any;
  endingPoint: any;
  maxEndDate: any;
  pageNumber: number = 1;
  fromDate: string = '';
  toDate: string = '';
  itemperPage: number = 25;
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
      title: 'Social Raw Data',
      url: '/analytics/social-raw-data',
    };

    this._hS.setHeader(newObj);
    const currentDate = new Date();
    const oneDayBeforeCurrentDate = currentDate.setDate(
      currentDate.getDate() - 1
    );
    this.maxEndDate = this.datePipe.transform(
      oneDayBeforeCurrentDate,
      'YYYY-MM-dd'
    );
    this.GetSocialRawData();
  }
  getEndDate() {
    if (this.toDate >= this.fromDate) {
      this.GetSocialRawData();
    } else {
      alert('EndDate is lessthen StartDate');
      this.toDate = '';
    }
  }
  getStartDate() {
    this.toDate = '';
  }
  GetSocialRawData() {
    if (this.toDate == '' && this.fromDate == '') {
      // let currentDate = new Date();
      // let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      // this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
      // this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
      this.fromDate = this.maxEndDate;
      this.toDate = this.maxEndDate;
    } else if (this.fromDate != '' && this.toDate != '') {
      this.fromDate = this.fromDate;
      this.toDate = this.toDate;
    }
    // const startDateObj = new Date(this.fromDate);
    // const endDateObj = new Date(this.toDate);
    // const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    // const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    // if (diffDays > 30) {
    //   alert('Select a date range of 30 days or less');
    //   this.toDate=''
    //   return;
    // }
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemperPage,
       wings:this.slectedWings.toString() || ''
   
    };
    if (this.fromDate <= this.toDate) {
      this.SpinnerService.show();
      this.commonService.PostSocialRawData(obj).subscribe((res: any) => {
        this.SpinnerService.hide();
        this.whatsAppRawData = res.List;
        this.totalCounts = res.TotalCount;
        this.whatsAppColumns = Object.keys(this.whatsAppRawData[0]);
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
      });
    } else {
      this.SpinnerService.hide();
      alert('select end date greater then start date');
    }
  }
  DownloadSocialRawData() {
    var obj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      pageNumber: 1,
      pageSize: 30,
 wings:this.slectedWings.toString() || ''
    };
    this.downloading = true;
    this.reloadComponent('downloading');
    this.commonService.DownloadSocialRawData(obj).subscribe((res: any) => {
      const a = document.createElement('a');
      a.href = res;
      a.download = 'SocialRawDataReport' + this.fromDate + '.csv';
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
      this.GetSocialRawData();
    }
  }
  perviousPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
      }
    }
    this.GetSocialRawData();
  }
  resetEndDate() {
    this.toDate = '';
  }
  closeToaster() {
    this.toastermessage = false;
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
  checkUncheckChannels(channelName:any){
    
    const index= this.slectedChannelsName.findIndex((item:any)=>item==channelName)
    // const index = this.selectedChannel.findIndex((x:any)=>x == channel.name)
    if(index != -1){
      this.slectedChannelsName.splice(index,1)
    }
    else{
      this.slectedChannelsName.push(channelName)
    }
    this.GetSocialRawData()

  }
  AllWingsList:any
  slectedWings:any[]=[]
  GetAllCompanyWings(){
    this.commonService.GetCompanyWingsForReporting().subscribe((res:any)=>{
      const wingresponse=res
      this.AllWingsList=wingresponse
    })
  }


checkUnCheckWings(wing:any){
const index =this.slectedWings.findIndex((item:any)=>item==wing)
if(index != -1){
this.slectedWings.splice(index,1)
}
else{
this.slectedWings.push(wing)
}
this.GetSocialRawData()

}

}
