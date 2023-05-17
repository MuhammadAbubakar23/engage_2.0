import { PhoneDialerService } from './services/DialerService/phone-dialer.service';
import { SharedService } from './services/SharedService/shared.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Config } from './phone/Config';
import { PhoneTypes } from './phone/PhoneTypes';
import { Logger } from './phone/Logger';
import { AgentFactory } from './phone/AgentFactory';
@Component({
  selector: 'app-web-phone',
  templateUrl: './web-phone.component.html',
  styleUrls: ['./web-phone.component.scss']
})
export class WebPhoneComponent implements OnInit {


  for:any="Taimoor";


  @ViewChild('dialerTabs') dialerTabs!: ElementRef;
  @ViewChild('dialerTabContent') dialerTabContent!: ElementRef;
  inboundCall: boolean = false;
  OBCallConnected: boolean = false;
  sipPhone!: any;
  callTransferred = false;
  box2Show = false;
  box2= {
    'hold': false,
    'resume' : false,
    'disconnect' : false,
  };
  box1= {
    'hold': false,
    'resume' : false,
    'disconnect' : false,
  };
  skill_name = 'ipt-eng';
  skill_id = 1682;
  callMerged = false;
  manualDialNum: string = '';
  showManualTransferButtons: boolean = false;
  cancelButton: boolean = false;
  inManualCall: boolean = false;
  transferType: string = 'attended';
  transferNum: string = '';
  manualDisconnect: boolean = false;
  showSecondCallDialer: boolean = false;
  isMute: boolean = false;
  isHold: boolean = false;
  transferringCall: boolean = false;
  userInfo: any = {
    name: 'Fatima Ahmad',
  };
  dialingStatus!: string;
  data = {
    sip_server: 'lhracd1.ibexglobal.com',
    sip_name: '15157',
    sip_password: '1234',
    auto_answer: 'Y',
    sip_domain: 'lhracd1.ibexglobal.com',
    extension: '15157',
    ws_sip_server: 'lhracd1.ibexglobal.com:8089/ws',
  };
  activeTab = {
    dialerActive: true,
    callListActive: false,
    contactsActive: false,
  };
  constructor(
    private dialerService: PhoneDialerService,
    private _shared: SharedService,
    private el: ElementRef,
  ) {}

  // for: any = 'Taimoor';
  ngAfterViewInit() {
    console.log(
      this.dialerTabs.nativeElement.querySelectorAll(
        '.dialerActions .tabs .tab .nav-link'
      )
    );
  }
  ngOnInit(): void {
    this.dialerService.getEvent().subscribe((res:any) => {
      this.phoneEvents(res);
      console.log(this);

      if(res.event == "sipRegistered"){
        // debugger
        // this.dialerService.setSipPhone(this.sipPhone);
      }
    });
    this.dialerService.getWsEvent().subscribe((res) => {
      console.log(res);

      // alert(res + 'From Construct');
    });
    this._shared.getMessage().subscribe((res) => {});
    this.dialerService.getPhoneLogs().subscribe((res) => {
      console.log(res);
      // console.log("sad");

      // alert(res + 'From Construct');
    });
    this.sipPhone = this.dialerService.getSipPhone();
    console.log(this.sipPhone);

    if(!this.sipPhone){
      this.loadPhone();
    }

  }
  setActiveDialerTab(option: string): void {
    switch (option) {
      case 'dialer':
        this.activeTab.dialerActive = true;
        this.activeTab.callListActive = false;
        this.activeTab.contactsActive = false;
        break;
      case 'call_list':
        this.activeTab.dialerActive = false;
        this.activeTab.callListActive = true;
        this.activeTab.contactsActive = false;
        break;
      case 'contacts':
        this.activeTab.dialerActive = false;
        this.activeTab.callListActive = false;
        this.activeTab.contactsActive = true;
        break;
      default:
        this.activeTab.dialerActive = true;
        this.activeTab.callListActive = false;
        this.activeTab.contactsActive = false;
    }
  }

  loadPhone(): void {
    let config = new Config();

    config.sipHost = this.data.sip_server;
    config.sipUser = this.data.sip_name;
    config.sipPass = this.data.sip_password;
    config.autoAnswer = this.data.auto_answer == 'Y' ? true : false;
    config.sipTrace = true;
    config.sipDomain = this.data.sip_domain;
    config.extension = this.data.sip_name;
    config.sipWs = this.data.ws_sip_server;
    config.dialerService = this.dialerService;
    // config.phoneType = PHONE.PhoneTypes.CCM_PHONE;
    config.phoneType = PhoneTypes.CCMS_WS_PHONE;
    Logger.setDialerService(this.dialerService);
    this.sipPhone = AgentFactory.getAgent(config);
    this.sipPhone.loadPhone();
    this.dialerService.setSipPhone(this.sipPhone);
    // console.log("LoadPhone ===> " ,this.sipPhone);
    if (this.sipPhone) {
      this.sipPhone.changeStatus('Manual Dial', '*12');
    }
  }

  manualDial(to_number: string = ''): void | boolean {
    console.log(this.sipPhone);
    this.cancelButton = false;
    this.OBCallConnected = false;
    this.manualDisconnect = false;
    let number = '';
    if (to_number == '') {
      number = this.manualDialNum;
    } else {
      number = to_number;
    }
    let manual_time_id = 123;
    let lead_id = 1;
    let error = '';
    let in_manual = true;
    // if (skill_name == "") {
    //     // error = "queue is not defined <br>";
    // } else {
    //     skill_id = AGENT_SKILLS[skill_name].campaign_id;
    // }
    if (number == '') {
      error += 'Please Input Number <br>';
    }
    if (lead_id < 1) {
      error += 'Please Fetch or Create Lead <br>';
    }

    if (this.sipPhone.inManual || this.sipPhone.inWrapup) {
      in_manual = true;
    } else {
      this.sipPhone.changeStatus('Manual Dial', '*12');
      // error += "You Should Be in Manual Mode or Wrapup State to Fetch Lead <br>";
    }
    if (error != '') {
      // alertMessage(error);
      return false;
    }

    if (in_manual) {
      this.sipPhone.manualDial(
        number,
        this.skill_name,
        lead_id,
        manual_time_id,
        this.skill_id
      );
      this.inManualCall = true;
      this.dialingStatus = 'Connecting';
      this.removeNavLinkActive();
      this.dialerTabContent.nativeElement
        .querySelectorAll('.dialerMainTabs')
        .forEach(function (element: HTMLElement | null) {
          element?.classList.remove('active');
          element?.classList.remove('show');
        });
      this.dialerTabContent.nativeElement
        .querySelectorAll('.dialerTab')
        .forEach(function (element: HTMLElement | null) {
          element?.classList.add('active');
        });

      // $dialer.manualCallConnecting(number);
      // $('.rbExpInner.dialer .callInProgress').removeClass('hide');
      // $('.rbExpInner.dialer .callStart').addClass('hide');
    }
  }

  phoneEvents(res: any): void {
    if (res.event) {
      switch (res.event) {
        case 'callCompleted':
          this.OBCallConnected = false;
          if (!this.manualDisconnect) {
            let values = Object.values(res) as [arg1:any,arg2:any,sessionNum:number,callFailed:any];
            this.cancelCall.apply(this,values);
          }
          break;
        case 'OB_callConnected':
          this.OBCallConnected = true;
          this.dialingStatus = 'Connected';
          break;
        case 'att_callConnected':
          this.transferCallConnected();
          break;
        case 'sipRegistered':
          this.sipPhone = this.dialerService.getSipPhone();
          this.sipPhone?.changeStatus('Manual Dial', '*12');
      }
    }
  }

  transferCallConnected(){
    this.callTransferred = true;
    document.querySelector('.transfer-status-wrapper')?.classList.remove('d-none');
    setTimeout(()=>{
      this.box2Show = true;
      document.querySelector('.call-merged-dots')?.classList.remove('d-none')
    },1000)
  }

  setTransferType(type: string): void {
    this.transferType = type;
  }

  hangUpCall(line: number): void {
    // this.callDisconnected = true;
    this.manualDisconnect = true;
    this.showManualTransferButtons = false;
    this.sipPhone.hangup(line);
  }

  confirmCancelCall(){
    this.resetDialer();
  }

  cancelCall(arg1:any, arg2:any, sessionNum:number, callFailed: any): void {
    if(sessionNum == 1){
      this.resetDialer()
    }else{
      this.resetTransferredCall();
    }

  }

  resetTransferredCall(){
    this.box2Show = false;
    this.transferringCall = false;
    this.callTransferred = false;
  }
  resetDialer(){
    this.inManualCall = false;
    this.manualDisconnect = false;
    this.OBCallConnected = false;
    this.manualDialNum = '';
    this.showManualTransferButtons = false;
    this.isMute = false;
    this.isHold = false;
    this.transferringCall = false;
    this.callTransferred = false;
    this.box2Show = false
    this.transferNum = "";
    document.getElementById('dialer-tab')?.classList.add('active');
  }

  transferBtnClick(): void {
    this.showManualTransferButtons = !this.showManualTransferButtons;
    document
      .querySelector('.contact-details-wrapper .person-numbers-list')
      ?.classList.remove('show');
    document
      .querySelector(
        '.contact-details-wrapper .contact-details .person-numbers-dropdown'
      )
      ?.classList.remove('rotate');
  }

  showDialerScreen(): void {
    if (this.OBCallConnected) {
      setTimeout(() => {
        document.querySelector('.call-dialer-component')?.classList.add('show');
      }, 10);
    }
  }

  showSecondDialer(value: boolean) {
    if (this.showManualTransferButtons) {
      this.showSecondCallDialer = value;
      if (!value) {
        document.getElementById('dialer-tab')?.classList.remove('active');
      }
    }
  }

  toggleMute(): void {
    if (this.sipPhone.isMuteAll()) {
      this.sipPhone.unmuteAll();
      this.isMute = false;
    } else {
      this.sipPhone.muteAll();
      this.isMute = true;
    }
  }

  toggleHold(line: number): void {
    if (this.sipPhone.isHold(line)) {
      this.sipPhone.unHold(line);
      this.isHold = false;
    } else {
      this.sipPhone.hold(line);
      this.isHold = true;
    }
  }

  transferCall(is_not_queue = true): void | boolean {
    if (this.transferType == '' || this.transferNum == '') {
      return false;
    } else {
      this.sipPhone.attTransferDial(this.transferNum, this.skill_id, is_not_queue);
      this.showSecondCallDialer = false;
      this.transferringCall = true;
      this.dialingStatus = 'Dialing';
      this.showManualTransferButtons = false;
      if (this.inboundCall) {
        let contacts = document.querySelector(
          '.contact-details-wrapper'
        ) as HTMLElement;
        contacts.style.display = 'block';
        document
          .querySelector('.call-without-transfered')
          ?.classList.remove('dialerScreen');
        document
          .querySelector('.buttons-section .mainBtns-group')
          ?.classList.add('display');
      } else {
        document
          .querySelector('.buttons-section .mainBtns-group')
          ?.classList.remove('display');
      }
      this.removeNavLinkActive();
    }
  }

  removeNavLinkActive() {
    this.dialerTabs.nativeElement
      .querySelectorAll('.dialerActions .tabs .tab .nav-link')
      .forEach(function (element: HTMLElement | null) {
        element?.classList.remove('active');
      });
  }
method()
{
  // console.log(this.for);
}
show:any=false;
click(val:any){

  if(val == true){
    this.show =false
  }
  if(val == false){
    this.show =true;
  }

}
}
