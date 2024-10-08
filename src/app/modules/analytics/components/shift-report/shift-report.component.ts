import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { CommonModule, DatePipe } from '@angular/common';
import * as echarts from 'echarts';
import { FormControl, FormGroup, FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import html2canvas from 'html2canvas';

@Component({
  standalone: true,
  selector: 'app-shift-report',
  templateUrl: './shift-report.component.html',
  styleUrls: ['./shift-report.component.scss'],
  imports: [CommonModule, FormsModule, SharedModule, NgxSpinnerModule,ReactiveFormsModule],
})
export class ShiftReportComponent implements OnInit {
  shiftReportData: any;
  @ViewChild('shiftReport', { static: true }) shiftReport!: ElementRef;
  shifttagData: any[] = [];
  shiftChannelData: any[] = [];
  dateWise: any[] = [];
  tagsList: any[] = [];
  allDates: any[] = [];
  newAlldates: any[] = [];
  totaltags: number = 0;
  slectedtagId: any[] = [];
  selectedtagName: any = '';
  shiftime: any = 0;
  changedateintostring: any = '';
  changeDateformat: any;
  changedateintoarray: any[] = [];
  formateDateArray: any[] = [];
  // currentdate:any
  startDate = '';
  endDate = '';
  searchText: string = '';
  maxEndDate: any;
  currentDate: any;
  totalinboundCounts: any;
  SlugTagsArray:any[]=[]
  tags: any;
  TagsStats: any[] = [];
  str:any=''
  tagsStatsTotalCounts: any;
  dateWiseTotalCounts: any[] = [];
  commaSeparatedValuesLink: any;
  numberArrayLink: any;
  alltotalCount: any;
  daysDifference: number = 0;
  allTotalCountsfb: any[] = [];
  channelCountsArray:any[]=[]
  allTotalCountTw: any[] = [];
  allTotalCountWhatsapp: any[] = [];
  allTotalCountLink: any[] = [];
  allTotalCountPlayStore: any[] = [];
  allTotalCountInsta: any[] = [];
  allTotalCountYoutube:any[]=[]
  ChartData: any[] = [];
  _legend: any[] = [];
  shiftName:any='Morning'
  selectedName:any=''
  shiftreportData:{
 name:string,
 type:string,
 data:any[]
  }[]=[]
  
  shiftType: any[] = [
    { name: 'Morning', id: 0 },
    { id: 1, name: 'Evening' },
    { id: 2, name: 'Night' },
    { id: 3, name: 'Iftar' },
    { id: 4, name: 'Sehr' },
  ];
  platformIconMapping: any = {
    Facebook: 'fa-brands fa-facebook fs-4 navy ' ,
    Twitter: 'fa-brands fa-twitter fs-4 sky ',
    Instagram: 'fa-brands fa-instagram fs-4 berry ',
    LinkedIn: 'fa-brands fa-linkedin fs-4 linkedinTxt ',
    Email: 'fa-light fa-envelope  fs-4 berry ',
    Youtube: 'fa-brands fa-youtube fs-4 radical ',
    SMS: 'fa-message-sms fs-4 cherry  ',
    WebChat: 'fa-light fa-messages fs-4 webchatcolor ',
    WhatsApp: 'fab fa-whatsapp fs-4 mint ',
    PlayStore: 'fa-brands fa-google-play fs-4 googleplaycolor ',
    OfficeEmail: 'fa-light fa-envelope  fs-4 navy  ',
  };
  channelIcon: any[] = [
    { fbicone: 'fa-brands fa-facebook-f', class: 'iconButton medium navyBg' },
    {
      twicone: 'fa-brands fa-twitter',
      class: 'iconButton medium twltte-bg ice',
    },
    {
      youtubeicone: 'fa-brands fa-youtube',
      class: 'iconButton medium radicalBg',
    },
    {
      linkicone: 'fa-brands fa-linkedin',
      class: 'iconButton medium linkedinBg',
    },
    { whatsappicone: 'fab fa-whatsapp', class: 'iconButton medium mintBg' },
    {
      playicone: 'fa-brands fa-google-play',
      class: 'iconButton medium darkorangeBg',
    },
  ];
  isShowGrpah:boolean=false
  downloading = false;
  toastermessage = false;
  AlterMsg: any = '';
  convertedintoArray: any;
  graphdate: any[] = [];
  noData: boolean = false;
  shiftReportChart:any;
  constructor(
    private hs: HeaderService,
    private datePipe: DatePipe,
    private commandataService: CommonDataService,
    private stor: StorageService,
    private SpinnerService: NgxSpinnerService
  ) {}
  KEbaseUrl:string="";
  KEClient:boolean=false;
  shiftTypeform=new FormGroup({
    actor:new FormControl('')
  })
  ngOnInit(): void {

    this.KEbaseUrl=window.location.origin
    if(this.KEbaseUrl=='https://keportal.enteract.live'){
      this.KEClient=true
    }

    this.currentDate = new Date();
    this.maxEndDate = this.currentDate.toISOString().split('T')[0];
    const obj = { title: 'Shift Report', url: 'analytics/shift-report' };
    this.hs.setHeader(obj);
    this.getShfitReport();
    this.getAlltags();
    this.getAgentsTeamList();
    this.makeChartResponsive();
    this.getTableStyle()
    this.GetAllCompanyWings()
    if(this.selectedName==''){
      
      this.selectedName="Morning"
    }
  }
  keywordslist: any[] = [];
  getAlltags() {
    this.commandataService.GetAllTags().subscribe((res: any) => {
      const menu = this.stor.retrive('Tags', 'O').local;
      menu.forEach((item: any) => {
        if (item.name == 'Tags') {
          item.subTags.forEach((parentags: any) => {
            parentags?.subTags?.forEach((singleTagObj: any) => {
              
              if (!this.keywordslist.includes(singleTagObj)) {
                this.keywordslist.push(singleTagObj);
              }
            });
          });
        }
      });
    });
  }

  getShfitReport() {
  
    if (this.startDate == '' && this.endDate == '') {
      const today = this.currentDate;
      this.endDate = this.datePipe.transform(today, 'YYYY-MM-dd') || '';

      let prevDate = this.currentDate.setDate(this.currentDate.getDate() - 5);
      this.startDate = this.datePipe.transform(prevDate, 'YYYY-MM-dd') || '';
    } else if (this.startDate != '' && this.endDate != '') {
      this.startDate = this.startDate;
      this.endDate = this.endDate;
    }
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);
    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays > 30) {
      alert('Select a date range of 30 days or less');
      this.endDate=''
      return;
    }
   
    let obj = {
      fromDate: this.startDate,
      toDate: this.endDate,
      shiftId: this.shiftime,
      tags: this.changedateintostring,
      wings:this.slectedWings.toString() || ''
    };

    if (this.startDate && this.endDate) {
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);
      const timeDifference = endDateObj.getTime() - startDateObj.getTime();
      this.daysDifference = timeDifference / (1000 * 3600 * 24);
    }
    this.allDates = [];
    this.allTotalCountInsta = [];
    this.allTotalCountLink = [];
    this.allTotalCountsfb = [];
    this.allTotalCountTw = [];
    this.dateWise = [];
    this.allTotalCountPlayStore = [];
    this.allTotalCountWhatsapp = [];
    this.allTotalCountYoutube=[]
    this.isShowGrpah=false
    this.SlugTagsArray=[]
    this.channelCountsArray=[]
    this.str=''
    this._legend = [];
    this.shiftChannelData=[]
    this.newAlldates = []

    this.shiftreportData=[]
    this.SpinnerService.show();
    this.commandataService.GetShiftReport(obj).subscribe((res: any) => {
      this.SpinnerService.hide();

      
      this.shiftReportData = res;
      this.shiftChannelData = res.channelData;
      this.dateWiseTotalCounts = res.dateWiseTotal;
      this.totalinboundCounts = res.totalIboundCount;

      if (this.totalinboundCounts == 0) {
        this.allTotalCountInsta = new Array(this.daysDifference).fill(0);
        this.allTotalCountLink = new Array(this.daysDifference).fill(0);
        this.allTotalCountsfb = new Array(this.daysDifference).fill(0);
        this.allTotalCountTw = new Array(this.daysDifference).fill(0);
      }

      this.shiftChannelData.forEach((data: any) => {
        this.newAlldates = []
        data.dateWise.forEach((item: any) => {
          if (!this.allDates.includes(this.datePipe.transform(item.date,'dd/MMM'))) {
            this.allDates.push(this.datePipe.transform(item.date,'dd/MMM'));
          }
        this._legend.push(data.platform);
        //  this.newAlldates = []
        
       
      // this.channelCountsArray.push
     
         
       
            
            let sentimentCounts: { [key: string]: number } = {};
            sentimentCounts =item.totalCount
            this.newAlldates.push(sentimentCounts)
        




    
        });
        const plateFormName=data.platform
        this.shiftreportData.push({
          name: plateFormName,
          type: 'line',
          data: this.newAlldates,
        
        })
      });
    
      this.TagsStats = res.tagData.shiftReportTag;
      this.TagsStats.forEach((x:any)=>{
        this.str= x.name.toLowerCase().split(/[-_.\s]/).map((w:any) => `${w.charAt(0).toUpperCase()}${w.substr(1)}`).join(' ');
        this.SlugTagsArray.push({name:this.str,totalCount:x.totalCount})
        console.log("SlugTagArray===>",this.SlugTagsArray)
      })
     
      this.tagsStatsTotalCounts = res.tagData.totalTagsCount;
      if(this.allDates.length==0){
        this.isShowGrpah=true
      }
  
      this.getCharts();
    });
  }

  selectedunselectedtag(tag: any) {
    if (this.slectedtagId.includes(tag.slug)) {
      this.slectedtagId.splice(this.slectedtagId.indexOf(tag.slug), 1);
    } else {
      this.slectedtagId.push(tag.slug);
    }
    this.changedateintostring = this.slectedtagId.toString();
    console.log(
      'this.changeDateIntoStringfor tags===>',
      this.changedateintostring
    );
    this.getShfitReport();
  }

  searchtags(event: any) {
    this.tags = event.target.value;
    this.getAlltags();
  }
value:any
  getByShifTime() {
 this.value=this.shiftTypeform.value.actor
 this.value.forEach((x:any)=>{
  this.shiftName=x.name
  this.shiftime=x.id
  this.getShfitReport();
 })
    
  }
  agentCount: number = 0;
  getTableStyle() {
    
    const threshold = 10;
    const maxHeight = threshold * 50 + 40;
    const style = {
      'max-height': this.agentCount > threshold ? `${maxHeight}px` : 'auto',
    };
    return style;
  }
  
  getCharts() {
    if(this.isShowGrpah==false){
    var chartDom = document.getElementById('shiftReport');
    this.shiftReportChart = echarts.init(chartDom);
    var option;

    option = {
      // title: {
      //   text: 'Stacked Line'
      // },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data:this._legend,
         icon:'circle',
         bottom:0
      },
      // get legend() {
      //   return this._legend;
      // },
      // set legend(value) {
      //   this._legend = value;
      // },
      grid: {
        left: '10%',
        right: '4%',
        bottom: '13%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.allDates,
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        nameLocation: 'middle',
        name: 'Total Number of Inbound',
        nameTextStyle: {
          fontSize: 12,
          color: 'grey',
          lineHeight: 80,
        },
      },
      
        series: this.shiftreportData
          // {
          //   name: 'Facebook',
          //   type: 'line',
          //   data: this.allTotalCountsfb,
          // },
  
          // {
          //   name: 'Instagram',
          //   type: 'line',
          //   data: this.allTotalCountInsta,
          // },
          // {
          //   name: 'Twitter',
          //   type: 'line',
          //   data: this.allTotalCountTw,
          // },
          // {
          //   name: 'PlayStore',
          //   type: 'line',
          //   data: this.allTotalCountPlayStore,
          // },
          // {
          //   name: 'LinkedIn',
          //   type: 'line',
          //   data: this.allTotalCountLink,
          // },
          // {
          //   name: 'WhatsApp',
          //   type: 'line',
          //   data: this.allTotalCountWhatsapp,
          // },
          // {
          //   name: 'Youtube',
          //   type: 'line',
          //   data: this.allTotalCountYoutube,
          // },
        
      };
    
      option && this.shiftReportChart.setOption(option,true);
    }
  }

  ActiveAgents: any[] = [];
  AgentsTeamList: any[] = [];
  getAgentsTeamList() {
    this.commandataService.GetAgentsTeamList().subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.AgentsTeamList = res;
        this.ActiveAgents = [];
        this.AgentsTeamList.forEach((user: any) => {
          if (user.userId != sessionStorage.getItem('agentId')) {
            
            this.ActiveAgents.push(user);
            if(this.ActiveAgents.length>0){
              this.ActiveAgents.forEach((x:any)=>{
                console.log("Active Agent ===>",x.name)
                // const agentlength=3
                // for(let i =x.name ;i<=agentlength; i++){
                //   const showagentname= [i]+'<br>'
                // }
              })
            }
            
          }
        });
      }
    });
  }
  // for show 0 in totalCount if totalCount are not in date

  findTotalCount(channel: any, date: string): number {

    const dateWiseItem = channel.dateWise.find(
      (item: any) => this.datePipe.transform(item.date,'dd/MMM') === date
    );
    return dateWiseItem ? dateWiseItem.totalCount : 0;
  }

  getStartDate() {
    this.endDate = '';
  }
  getEndDate() {
    if (this.endDate >= this.startDate) {
      this.getShfitReport();
    } else {
      alert('EndDate is lessthen StartDate');
      this.endDate = '';
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }

  sendEmailReport() {
    // Select the element that you want to capture
    const captureElement = document.getElementById('shiftReport')!;

    // Call the html2canvas function and pass the element as an argument
    html2canvas(captureElement).then((canvas) => {
      // Get the image data as a base64-encoded string
      const imageData = canvas.toDataURL('image/png');

      // Do something with the image data, such as saving it as a file or sending it to a server
      // For example, you can create an anchor element and trigger a download action

      // const link = document.createElement('a');
      // link.setAttribute('download', 'screenshot.png');
      // link.setAttribute('href', imageData);
      // link.click();

      var obj = {
        fromDate: this.startDate,
        toDate: this.endDate,
        shiftId: this.shiftime,
        tags: this.changedateintostring,
        companyId: 0,
        picture: imageData
      }
      this.commandataService.EmailShiftReport(obj).subscribe((res:any)=>{
        console.log('res',res)
      })
    });
  }

  makeChartResponsive() {
    window.addEventListener('resize', () => {
      if (this.shiftReportChart) {
        this.shiftReportChart.resize();
      }
    });
  }
  AllWingsList:any
  slectedWings:any[]=[]
  GetAllCompanyWings(){
    this.commandataService.GetCompanyWingsForReporting().subscribe((res:any)=>{
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
this.getShfitReport()
console.log("slectedWings===>",this.slectedWings)
}


}
