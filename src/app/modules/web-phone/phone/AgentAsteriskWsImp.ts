import { Logger } from "./Logger";
import { Config } from "./Config";
import { AgentAsteriskImp } from "./AgentAsteriskImp";
export class AgentAsteriskWsImp extends AgentAsteriskImp {
  private CCMS_WS!: WebSocket | null;
  private WS_Estb: boolean = false;
  private reconnectCnt: number = 0;
  private reconnectStart: number = 0;
  public constructor(config: Config) {
    super(config);
    this.ccmsWs();
  }
  private ccmsWs(): void {
    this.WS_Estb = false;
    // this.CCMS_WS = new WebSocket("wss://" + window.location.host + ":3000");
    this.CCMS_WS = new WebSocket("wss://localhost:3000");
    this.CCMS_WS.onopen = this.wsOnOpen.bind(this);
    this.CCMS_WS.onerror = this.wsOnError.bind(this);
    this.CCMS_WS.onclose = this.wsOnClose.bind(this);
    this.CCMS_WS.onmessage = this.wsOnMessage.bind(this);
  }
  private reConnect() {
    if (this.reconnectCnt < 4) {
      if (this.reconnectStart == 0) {
        this.ccmsWs();
        this.reconnectStart = Math.floor(Date.now() / 1000);
      }
      else {
        let currentTimeStamp = Math.floor(Date.now() / 1000);
        let diff = currentTimeStamp - this.reconnectStart;
        if (diff > 10) {
          this.reconnectStart = Math.floor(Date.now() / 1000);
          this.ccmsWs();
        }
        else {
          Logger.AddToStatusLogList("|Re connecting after " + (10 - diff) + " seconds");
          setTimeout(() => {
            this.reconnectStart = Math.floor(Date.now() / 1000);
            this.ccmsWs();
          }, (10 - diff) * 1000);
        }
      }
    }
    else {
      this.forceLogout();
      Logger.AddToStatusLogList("|Re connecting attemp exceed " + this.reconnectCnt);
    }
    this.reconnectCnt++;
  }
  private wsOnOpen(e: any): void {
    Logger.AddToStatusLogList('|[open] Connection established|' + e.target.url);
    this.WS_Estb = true;
    //if it is reconnected then send login information as well
    if (this.reconnectCnt > 0) {
      let msg = JSON.stringify({
        "operation": "agent_info",
        "extension": this.extension.toString(),
        "login_type": "inbound",
        "sip_server": this.config.sipHost
      });
      Logger.AddToStatusLogList("TX|agent_info|" + msg);
      this.sendMessage(msg);
    }
    this.reconnectCnt = 0;
  }
  private wsOnError(evt: any) {
    Logger.AddToStatusLogList('[error] ' + evt.message);
  }
  private wsOnClose(event: any) {
    if (event.wasClean) {
      Logger.AddToStatusLogList('[close] Connection closed cleanly, code=' + event.code + 'reason=' + event.reason);
    }
    else {
      Logger.AddToStatusLogList('[close] Connection died');
    }
    //if agent not loggedout then reconnect
    if (!this.isLogOut) {
      Logger.AddToStatusLogList("|Re connecting");
      this.reConnect();
      //this.ccmsWs();
    }
  }
  private wsOnMessage(evt: any) {
    Logger.AddToStatusLogList("RX--> " + evt.data);
    let evtData = JSON.parse(evt.data);
    switch (evtData.op_type.toLowerCase()) {
      case "alert":
        this.dialerService.updateWsEvent('ws_alert', evtData.msg);
        // $(document).trigger('ws_alert', evtData.msg);
        break;
      case "response":
        if (this.changeStatusInProgress) {
          let stateChanged = (evtData.op_result != 0) ? true : false;
          if (stateChanged) {
            this.currentStatus = this.tempStatus;
            //if Logout
            if (this.tempStatusNum == "WS_LOGOUT") {
              this.isLogOut = stateChanged;
            }
            //this.inManual = (this.tempStatusNum == "WS_BREAK_MANUAL") ? true : false;
            this.inManual = (this.tempStatusNum == "*12") ? true : false;
          }
          this.dialerService.updateEvent('statusChanged', [this.tempStatus, stateChanged]);
          // $(document).trigger('statusChanged', [this.tempStatus, stateChanged]);
          this.changeStatusInProgress = false;
          this.tempStatus = null;
          this.tempStatusNum = null;
        }
        break;
    }
  }
  public override sendMessage(msg: string) {
    if (!this.WS_Estb) {
      Logger.AddToStatusLogList("CCMS socket not opened yet");
      setTimeout(() => {
        this.sendMessage(msg);
      }, 2000);
      return;
    }
    //Logger.AddToStatusLogList("MSG|" + msg);
    this.CCMS_WS?.send(msg);
  }
  public override changeStatus(statusName: any, statusShortCode: string, extraHeader?: Array<any>): void {
    if (this.currentStatus != statusName && this.changeStatusInProgress == false) {
      this.changeStatusInProgress = true;
      this.tempStatus = statusName;
      this.tempStatusNum = statusShortCode;
      let msg = "";
      switch (statusShortCode) {
        //case "WS_LOGIN":
        case "*1":
          msg = JSON.stringify({
            "operation": "change_status",
            "extension": this.extension.toString(),
            "action": "login",
            "login_type": "inbound",
            "sip_server": this.config.sipHost
          });
          Logger.AddToStatusLogList("TX|LOGIN");
          this.sendMessage(msg);
          break;
        //case "WS_LOGOUT":
        case "*2":
          //let msg ="b|" + this.extension;
          msg = JSON.stringify({
            "operation": "change_status",
            "extension": this.extension.toString(),
            "action": "logout",
            "login_type": "inbound",
            "sip_server": this.config.sipHost
          });
          Logger.AddToStatusLogList("TX|LOGOUT--> " + msg);
          this.sendMessage(msg);
          break;
        //case "WS_READY":
        case "*3":
          msg = JSON.stringify({
            "operation": "change_status",
            "agent_id": parseInt(this.extension, 10),
            "action": "ready"
          });
          Logger.AddToStatusLogList("TX|READY--> " + msg);
          this.sendMessage(msg);
          break;
        case "*12":
          msg = JSON.stringify({
            "operation": "change_status",
            "agent_id": parseInt(this.extension, 10),
            "action": "manual"
          });
          Logger.AddToStatusLogList("TX|MANUAL--> " + msg);
          this.sendMessage(msg);
          break;
        case "*10":
          msg = JSON.stringify({
            "operation": "change_status",
            "agent_id": parseInt(this.extension, 10),
            "action": "unwrapup",
            "break_code": "",
            "break_name": ""
          });
          this.tempStatus = statusName;
          this.tempStatusNum = statusShortCode;
          Logger.AddToStatusLogList("TX|Wrapup (" + statusName + ") --> " + msg);
          this.sendMessage(msg);
          break;
        //case "WS_BREAK":
        default:
          let msgObj = {
            "operation": "change_status",
            "agent_id": parseInt(this.extension, 10),
            "action": "break",
            "break_code": statusShortCode,
            "break_name": statusName
            /*"break_code": statusName['break_code'],
            "break_name": statusName['break_name']*/
          };
          //for last call break
          if (this.inWrapup && this.lastCallNumber != "") {
            msgObj['action'] = "unwrapup";
            //msgObj['break_code'] = "unwrapup";
          }
          msg = JSON.stringify(msgObj);
          /* this.tempStatus = statusName['break_name'];
           this.tempStatusNum = statusName['break_code'];
          */
          this.tempStatus = statusName;
          this.tempStatusNum = statusShortCode;
          Logger.AddToStatusLogList("TX|BREAK (" + statusShortCode + ") --> " + msg);
          this.sendMessage(msg);
          break;
      }
    }
  }
  public override chatReply(chatId: number, msg: string, senderName: string): void {
    let jsMsg = JSON.stringify({
      "operation": "chat_reply",
      "chat_id": chatId,
      "msg": msg,
      "sender_name": senderName
    });
    Logger.AddToStatusLogList("TX|" + jsMsg);
    this.sendMessage(jsMsg);
  }
  // public override login(): void {
  //   if (!this.SIPPHONE) {
  //     throw "Phone is not loaded yet";
  //   }
  //   this.changeStatus('Initial Login', '*1');
  // }
  // public override unWrapUp(): void {
  //   if (this.inWrapup) {
  //     if (this.lastCallNumber && this.lastCallName) {
  //       this.changeStatus(this.lastCallName, this.lastCallNumber);
  //     }
  //     else {
  //       this.changeStatus("READY", "*10");
  //     }
  //   }
  //   this.inWrapup = false;
  // }
  public override chatClose(chatId: number): void {
    let msg = JSON.stringify({
      "operation": "chat_close",
      "chat_id": chatId
    });
    Logger.AddToStatusLogList("TX|" + msg);
    this.sendMessage(msg);
  }
}
