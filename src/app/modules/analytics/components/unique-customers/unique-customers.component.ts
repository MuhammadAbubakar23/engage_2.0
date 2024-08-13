import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { SharedModule } from "../../../../shared/shared.module";
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, SharedModule],
  selector: 'app-unique-customers',
  templateUrl: './unique-customers.component.html',
  styleUrls: ['./unique-customers.component.scss'],
})
export class UniqueCustomersComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  currentDate: any;
  TotalCount: any = [];
  totalPages: any;
  endingPoint: any;
  startingPoint: any;
  unique_customer: any[] = [];
  pageNumber = 1;
  itemsPerPage = 20;
  maxEndDate: any;
  unique_customerColumn:any[]=[]
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  isChannelShow: any;
  channelOptions:any
  activeChannel: any;
  slectedChannelsName:any[]=[]
searchText: string='';
  constructor(
    private _hS: HeaderService,
    private commonService: CommonDataService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
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
    const currentDate = new Date();
    const oneDayBeforeCurrentDate = currentDate.setDate(
      currentDate.getDate() - 1
    );
    this.maxEndDate = this.datePipe.transform(
      oneDayBeforeCurrentDate,
      'YYYY-MM-dd'
    );
    const newObj = {
      title: 'Unique Interactions',
      url: '/analytics/umique-customers',
    };
    this._hS.setHeader(newObj);
    this.addUniqueData();
  }
  resetEndDate() {
    this.endDate = '';
  }
  onCheckboxChange() {
    this.addUniqueData();
    this.cdr.detectChanges();
  }
  addUniqueData() {
    if (this.startDate == '' && this.endDate == '') {
      // let currentDate = new Date();
      // let prevDate = currentDate.setDate(currentDate.getDate() - 5);
      // this.fromDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
      // this.toDate = this.datePipe.transform(new Date(), 'YYYY-MM-dd') || '';
      this.startDate = this.maxEndDate;
      this.endDate = this.maxEndDate;
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.startDate;
    }
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage,
      companyId: 0,
      channels: this.slectedChannelsName.toLocaleString()
    };
    if (this.endDate >= this.startDate) {
      this.SpinnerService.show();
      this.commonService.AddUniqueCustomer(requestData).subscribe(
        (response: any) => {
          this.SpinnerService.hide();
          this.unique_customer = response.List;
          this.unique_customerColumn = Object.keys(this.unique_customer[0]);
          this.TotalCount = response.TotalCount;
          if (this.pageNumber == 1) {
            this.startingPoint = 1;
          } else {
            this.startingPoint = (this.pageNumber - 1) * this.itemsPerPage + 1;
          }
          this.totalPages = Math.ceil(this.TotalCount / this.itemsPerPage);
          if (this.TotalCount <= this.startingPoint + this.itemsPerPage - 1) {
            this.endingPoint = this.TotalCount;
          } else {
            this.endingPoint = this.startingPoint + this.itemsPerPage - 1;
          }
        },
        (error: any) => {}
      );
    } else {
      this.SpinnerService.hide();
      alert('End Date is less than Start Date');
    }
  }
  exportToCSV() {
    const requestData = {
      fromDate: this.startDate,
      toDate: this.endDate,
      pageNumber: this.pageNumber,
      pageSize: this.itemsPerPage,
      companyId: 0,
      channels: this.slectedChannelsName.toLocaleString()
    };
    this.downloading = true;
    this.reloadComponent('downloading');
    this.commonService.UniqueExportCsv(requestData).subscribe(
      (response: any) => {
        const a = document.createElement('a');
        a.href = response;
        a.download = 'uniqueReport' + this.startDate + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.downloading = false;
        this.reloadComponent('downloaded');
      },
      (error: any) => {
        console.error('error', error);
      }
    );
  }
  nextPage(pageNumber: any) {
    let page = pageNumber + 1;
    if (page < this.totalPages + 1) {
      this.pageNumber = page;
      this.addUniqueData();
    }
  }
  prevPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
      }
    }
    this.addUniqueData();
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
    debugger
    const index= this.slectedChannelsName.findIndex((item:any)=>item==channelName)
    // const index = this.selectedChannel.findIndex((x:any)=>x == channel.name)
    if(index != -1){
      this.slectedChannelsName.splice(index,1)
    }
    else{
      this.slectedChannelsName.push(channelName)
    }
    this.addUniqueData()
console.log('this.selectedChannelSName===>',this.slectedChannelsName)
  }
}
