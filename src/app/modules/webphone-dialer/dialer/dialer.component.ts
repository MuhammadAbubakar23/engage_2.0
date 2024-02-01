
import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { TabsArr } from '../shared/interfaces';
import { PhoneDialerService } from '../services/DialerService/phone-dialer.service';
import { SharedService } from '../services/SharedService/shared.service';
import { Config } from '../phone/Config';
import { AgentFactory } from './../phone/AgentFactory';
import { Logger } from './../phone/Logger';
import { PhoneTypes } from './../phone/PhoneTypes';
import { SipPhone } from '../phone/SipPhone';



@Component({
  selector: 'app-dialer',
  templateUrl: './dialer.component.html',
  styleUrls: ['./dialer.component.scss']
})

export class DialerComponent implements OnInit, OnDestroy {
  connecting = false;
  dialerReady = false;
  dialerConnected = false;
  resetTabsArr: TabsArr = ({} as any) as TabsArr;
  tabsArr: TabsArr = ({} as any) as TabsArr;
  activeTab: string = '';
  manualDialNum: string = '';
  ringing: boolean = false;
  callConnected = false;
  callConnecting = false;
  inboundCall = false;
  callCompleted = false;
  disposition: string = '';
  manualDisconnect: boolean = false;
  dispositionRequired: boolean = true;
  sipPhone!: any;
  dialerNumbers: Array<string | number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, '#'];
  lead_id: number = 12345;
  skill_name: string = 'ipt-urdu';
  skill_id: number = 1732;
  isSipRegistered: boolean = false;
  callerId: number = 0;
  data = {
    // sip_server: 'webphone.ibexglobal.com',
    // sip_name: '15266',
    // sip_password: '1234',
    // auto_answer: 'Y',
    // sip_domain: 'webphone.ibexglobal.com',
    // extension: '15266',
    // ws_sip_server: 'webphone.ibexglobal.com:8089/ws',

    sip_server: 'lhracd1.ibexglobal.com',
    sip_name: '15157',
    sip_password: '1234',
    auto_answer: 'Y',
    sip_domain: 'lhracd1.ibexglobal.com',
    extension: '15157',
    ws_sip_server: 'lhracd1.ibexglobal.com:8089/ws',
  };
  constructor(
    private dialerService: PhoneDialerService,
    private _shared: SharedService,
  ) {

  }



  @HostListener('window:beforeunload')
  doSomething(e: any) {
    if (this.sipPhone) {
      this.sipPhone.logout();
    }
  }
  phoneEvents = (res: any): void => {
    console.log(res)
    if (res.event) {
      switch (res.event) {
        case 'callCompleted':
          let values = Object.values(res) as [
            arg1: any,
            arg2: any,
            sessionNum: number,
            callFailed: any
          ];
          // if (res[2] && res[2] == 1 && this.inboundCall) {
          //   this.inboundCall = false;
          // }
          if (!this.manualDisconnect) {
            let values = Object.values(res) as [
              arg1: any,
              arg2: any,
              sessionNum: number,
              callFailed: any
            ];
            this.cancelCall.apply(this, values);
          }
          this.manualDisconnect = false;
          this.manualDialNum = "";
          break;
        case 'incomingCall':
          ;
          this.sipPhone.answerIncoming();
          break;
        case 'IB_callConnected':
          let callData = res[0];
          this.lead_id = callData.lead_id;
          this.skill_name = callData.queue;
          this.callerId = callData.caller_id
          this.inboundCall = true;
          // this.dialingStatus = 'Connected';
          this.callConnecting = true;
          this.callConnected = true;
          break;
        case 'OB_callConnected':
          this.callConnected = true;
          break;
        //     case 'att_callConnected':
        //       this.transferCallConnected();
        //       break;
        //     case 'sipRegistered':
        //       this.sipPhone = this.dialerService.getSipPhone();
        //       this.isSipRegistered = true;
        //     // if(!res[0]){
        //     //   this.sipPhone.login();
        //     // }
        //     // this.sipPhone?.changeStatus('Manual Dial', '*12');
      }
    }
  }
  ngOnDestroy() {
    if (this.sipPhone) {
      this.sipPhone.logout();
    }
  }
  ngOnInit(): void {
    // if (!this.dialerService.getIsLoaded()) {
    this.dialerService.getEvent().subscribe((res: any) => {
      this.phoneEvents(res);
      // console.log(this);

      if (res.event == 'sipRegistered') {
        this.sipPhone.login();
        this.isSipRegistered = true;
        this.connecting = false;
        this.dialerReady = true;
        // this.dialerService.setSipPhone(this.sipPhone);
      }
    });
    this.dialerService.getWsEvent().subscribe((res) => {
      console.log(res);

      // alert(res + 'From Construct');
    });
    this._shared.getMessage().subscribe((res) => { });
    // }


    this.sipPhone = this.dialerService.getSipPhone();

    // console.log(this.sipPhone);

    this.dialerService.setIsLoaded(true);
    if (this.sipPhone) {
      this.isSipRegistered = true;
      // this.connecting = false;
      this.dialerReady = true;

    }
  }

  cancelCall(arg1: any, arg2: any, sessionNum: number, callFailed: any): void {
    if (sessionNum == 1) {
      this.hangup();
    } else {
      // this.resetTransferredCall();
    }
  }


  loadPhone = (): void => {
    this.connecting = true;
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
    // // console.log("LoadPhone ===> " ,this.sipPhone);
    if (this.sipPhone) {
      // this.sipPhone.changeStatus('Manual Dial', '*12');
    }
  }
  public openDialer = (): void => {
    this.connecting = true;
    setTimeout(() => {
      this.connecting = false;
      this.dialerReady = true;
    }, 1000)
  }

  /**
   * manualDial
   */

  manualDial(to_number: string = ''): void | boolean {
    // console.log(this.sipPhone);
    this.callConnected = false;
    let number = '';
    if (to_number == '') {
      number = this.manualDialNum;
    } else {
      number = to_number;
    }
    let manual_time_id = 123456;
    this.lead_id = 12345;
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
    if (this.lead_id < 1) {
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
    this.callConnecting = true;

    if (in_manual) {
      this.sipPhone.manualDial(
        number,
        this.skill_name,
        this.lead_id,
        manual_time_id,
        this.skill_id
      );


      // $dialer.manualCallConnecting(number);
      // $('.rbExpInner.dialer .callInProgress').removeClass('hide');
      // $('.rbExpInner.dialer .callStart').addClass('hide');
    }
  }
  /**
   * setDisposition
   */
  public setDisposition = (dispositon: string): void => {
    this.disposition = dispositon
  }

  /**
   * hangupCall
   */
  public hangupCall = (line: number): void => {
    if (line == 1) {
      this.manualDisconnect = true;
    }
    this.sipPhone.hangup(line);
  }

  /**
   * hangup
   */
  public hangup = (): void => {

    if (this.dispositionRequired) {
      if (this.callConnected) {
        this.callCompleted = true;
        // this.callConnected = false;

      } else {
        this.submitForm();
      }
    } else {
      this.callConnected = false;
      this.callConnecting = false;

    }

  }

  /**
   * addManualDialNum
   */
  public addManualDialNum = (value: number | string): void => {
    this.manualDialNum += value;
  }
  /**
    * dialerConected
    */
  public setDialerConnected = (): void => {
    this.dialerReady = false;
    this.dialerConnected = true;
  }

  public setTabsArr = ({ newTabsArr, activeTab }: { newTabsArr: TabsArr; activeTab: string }): void => {
    this.tabsArr = newTabsArr;
    this.activeTab = activeTab
  }

  public selectActiveTab = (value: string) => {
    let currTabsArr = { ...this.resetTabsArr };
    let currActiveTab = '';
    if (this.activeTab != value) {
      currTabsArr = { ...this.resetTabsArr, [value]: true }
      currActiveTab = value;
    }
    let data = {
      newTabsArr: currTabsArr,
      activeTab: currActiveTab
    }

    this.setTabsArr(data)

  }

  /**
   * minimizeDialer
   */
  public minimizeDialer = (): void => {
    this.dialerConnected = false;
    this.dialerReady = true;
    this.tabsArr = { ...this.resetTabsArr }
  }


  /**
   * submitForm
   */
  public submitForm = () => {
    this.resetDialer();
  }

  /**
   * resetDialer
   */
  public resetDialer() {
    this.callConnected = false;
    this.callCompleted = false;
    this.callConnecting = false;
    this.manualDisconnect = false;
    this.inboundCall = false;
  }

  public changeStatus = (status: string, code: string): void => {
    this.sipPhone.changeStatus(status, code);
  }

  public changeWrapup = (): void => {
    this.sipPhone.changeStatus("unwrapup", "*10");
  }
}
