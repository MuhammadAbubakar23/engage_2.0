import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { BotMonitoringService } from 'src/app/modules/bot-monitoring/services/bot-monitoring.service';

@Component({
  selector: 'app-create-bot-configuration',
  templateUrl: './create-bot-configuration.component.html',
  styleUrls: ['./create-bot-configuration.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxSpinnerModule]
})
export class CreateBotConfigurationComponent implements OnInit {
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  Ids: any = [{id: 1, name: "chat bot "},{id: 2, name: "email bot"},{id: 3, name: "comment bot"},{id: 4, name: "tag bot"}]
  channels: any;
  companyPages: any = [{name: 'Ibex Global',uniqueId: 3425346435547}, {name: 'Ibex Local',uniqueId: 35647634747}, {name: 'Virtual World VW',uniqueId: 938473285}];
  contentTypes: any;
  contentTypess: any;
  statuses: any = ["Active", "Inactive"];
  formDisabled = false;
  errorMessage = '';
  showEntitiesDropdown = false;
  botIds: any;
  toastermessage: boolean = false;
  AlterMsg:any
  botsForm!: FormGroup;
  currentId: any;
  status: any = true;
  broadcast: any = true
  type: any ;
  baseUrl: any = 'https://linked.360scrm.com/api/';
  channelId: any;

  constructor(private spinnerServerice: NgxSpinnerService, private headerService: HeaderService, private formBuilder: FormBuilder, private _botService: BotMonitoringService, private commonService: CommonDataService, private router: Router, private _route: ActivatedRoute)
  { }

  ngOnInit(): void {
    this.GetServicetree();
    this.getBots();
    this.getChannels();
    this.currentId = this._route.snapshot.paramMap.get('id')
    this.type = this._route.snapshot.paramMap.get('type')
    this.channelId = this._route.snapshot.paramMap.get('channelId')
    if(!this.currentId){
        this.initializeForm();
      }
  }
  initializeForm(): void {
    this.botsForm = this.formBuilder.group({
      botId: [null, Validators.required],
      name: ['', Validators.required],
      botUrl: [''],
      botToken: [''],
      platform: [null],
      pageId: [null, Validators.required],
      contentType: [null, Validators.required],
      activeHoursDetails: this.formBuilder.array([]),
      isActive: true,
      isBroadcast: false,
      sessionStartMessage: [null, Validators.required],
      sessionEndMessage: [null, Validators.required],
      inActiveMessage: [null, Validators.required],
      botToAgent: [null, Validators.required]
    });
    this.daysOfWeek.forEach((day)=>{
      this.addDays(day);
    })
    this.Days.controls.forEach((day)=>{
      day.disable();
    })
  }
  patchFormValues(): void {
    this.commonService.GetBotConfigById(this.currentId, this.type).subscribe(
      (res: any) => {
        debugger
        this.botsForm.get('contentType')?.setValue(res.contentType);
        this.getContentTypes();
        this.botsForm.patchValue({
          botId: res.botId,
          name: res.name,
          botUrl: res.botUrl,
          botToken: res.botToken,
          platform: this.channelId,
          pageId: res.pageId,
          // contentType: res.contentType,
          botToAgent: res.botToAgent,
          sessionStartMessage: res.sessionStartMessage,
          sessionEndMessage: res.sessionEndMessage,
          inActiveMessage: res.inActiveMessage,
          isActive: res.isActive,
          isBroadcast: res.isBroadcast
        });
        this.status = res.isActive;
        this.broadcast = res.isBroadcast
        
        const days = this.botsForm.get('activeHoursDetails') as FormArray;
        res.activeHoursDetails.forEach((d: any) => {
          
        var currentDay = days.controls.find(day=> day.value.day == d.day) 
        currentDay?.patchValue(d)
        this.spinnerServerice.hide()
        });
      })
      
      this.botsForm.disable();

  }
  clearDays(): void {
    const Days = this.botsForm.get('activeHoursDetails') as FormArray;
    while (Days.length !== 0) {
      Days.removeAt(0);
    }
  }
  getCompanyPages(){
    this.spinnerServerice.show();
    this.commonService.GetProfileInfo(this.baseUrl).subscribe((res)=>{
      this.companyPages=res;
      this.spinnerServerice.hide();
    });
  }
  getContentTypes(){
    debugger
    var channel:any;
    if(this.botsForm.value.platform){
      channel = this.contentTypes.find((x:any)=> x.id == this.botsForm.value.platform );
    }
    else{
      channel = this.contentTypes.find((x:any)=> x.id == this.channelId );
    }

    this.contentTypess = channel?.subService;
    // this.botsForm.get('contentTypes')?.reset;
  }
  getChannels(){
    this.commonService.getChannelsList().subscribe((res)=>{
      const response = res as { [key: string]: string };
      
      this.channels = Object.keys(response).map(key => ({
        id: Number(key),
        name: response[key]
      }));
    })
  }
  getBots(){
    this._botService.GetAllChatBot().subscribe((res)=>{
      this.botIds = res;
    })
  }
  GetServicetree(){
    this.commonService.GetServicetree().subscribe((res)=>{
      this.contentTypes = res;
      if(this.currentId){
        this.spinnerServerice.show();
        this.initializeForm();
        this.getCompanyPages()
        this.patchFormValues()
      }
    })
  }
  botIdTemp(){
    this.botIds = this.Ids;
  }

  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }


  Day(i: any){
    return this.Days.controls[i];
  }
  get Days(): FormArray {
    return this.botsForm.get('activeHoursDetails') as FormArray;
  }
  addDays(workingDay: string): void {
    const formArray = this.Days;
    formArray.push(
      this.formBuilder.group({
        day: [workingDay],
        activeFrom: [null],
        activeTo: [null]
      })
    );
  }

  DayEnableOrDisable(day: string): void {
    const index = this.daysOfWeek.indexOf(day);
    const dayGroup = this.Days?.at(index) as FormGroup;

    if(!dayGroup.disabled){
      dayGroup.disable();
    }
    else{
      dayGroup.enable();
    }
  }
  isDayEnabled(day: string): boolean {
    const index = this.daysOfWeek.indexOf(day);
    const dayGroup = this.Days.at(index) as FormGroup;
    return !dayGroup?.get('activeFrom')!.disabled || false;
  }
  saveForm(){
    
    console.log("d['activeFrom']",typeof(this.Days.controls[0].value['activeFrom']))
    if(this.botsForm.valid){

      
      this.commonService.AddBotConfig(this.baseUrl, this.botsForm.value).subscribe(
      (res: any) => {
        
        console.log("botsResponse--", res)
        this.botsForm.reset()
        this.router.navigate(['/console/bot-configuration'])
      },
      (error: any)=>{
        
        console.error('Error occurred:', error);
        this.reloadComponent('must 5', error)
        var existing:boolean = error.error.text.includes('Existing');
        if(!existing){
          this.router.navigate(['/console/bot-configuration'])
        }
      },
      () => {
        
        console.log('HTTP request completed.');
      }
    )
    }
    else
      this.markFormGroupTouched(this.botsForm);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  resetForm(){
    Object.keys(this.botsForm.controls).forEach(key => {
      this.botsForm.removeControl(key);
    });
    this.initializeForm();
    // this.Days.controls.forEach((form)=>{
    //   form.get('workingDay')?.disable();
    //   form.get('startTime')?.disable();
    //   form.get('activeTo')?.disable();
    // })
    console.log(this.botsForm);
  }
  cancelForm(): void {
    this.updatevalue('bot-configuration')
    this.router.navigate(['/console/bot-configuration']);
  }

  reloadComponent(value:any, message: any){
    
    if(value=='must 5'){
      this.toastermessage=true
      this.AlterMsg=message.error.text;
      setTimeout(() => {
        this.toastermessage=false
      }, 5000);

    }
   
  }

  closeToaster() {
    this.toastermessage = false;
  }

  setChannel(){
    debugger
    var id = this.botsForm.value.platform;
    switch(id){
      case("1"):
        this.baseUrl = 'https://linked.360scrm.com/api/';
        this.getCompanyPages();
      break;
      case("2"):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
        this.getCompanyPages();
      break;
      case("3"):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
        this.getCompanyPages();
      break;
      case("4"):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
        this.getCompanyPages();
      break;
      case("5"):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
        this.getCompanyPages();
      break;
      case("6"):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
        this.getCompanyPages();
      break;
      case("7"):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
        this.getCompanyPages();
      break;
      case("8"):
        this.baseUrl = 'https://linked.360scrm.com/api/' 
        this.getCompanyPages();
      break;
      default:
        this.baseUrl = 'https://linked.360scrm.com/api/'
        this.getCompanyPages();
      break;
    }
  }
}
