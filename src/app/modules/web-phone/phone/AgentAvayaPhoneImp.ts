import { Agent } from "./Agent";
import { Logger } from "./Logger";
import { Config } from "./Config";
import { SipPhone } from "./SipPhone";

export class AgentAvayaPhoneImp extends Agent
{

    private statusShortCode: any = null;
    private AM_WS_INST!: WebSocket | null;
    private sockConnected: boolean = false;
    private ringStart: number = 0;
    private config: Config;
    private avayaMappings: any;
    private WS_Estb: boolean = false;

    public constructor(config: Config)
    {
        super();

        this.config = config;

        this.extension = config.extension;
        this.AM_WS_INST = new WebSocket(config.AMS_WS_URL);

        this.AM_WS_INST.onopen = this.WsOnOpen.bind(this);
        this.AM_WS_INST.onerror = this.WsOnErr.bind(this);
        this.AM_WS_INST.onclose = this.WsOnClose.bind(this);
        this.AM_WS_INST.onmessage = this.WsOnMessage.bind(this);

        //this.SIPPHONE = SipPhone.getObj(config, this);


    }



    public WsOnErr(evt: any)
    {
        Logger.AddToStatusLogList('[error] ' + evt.message);
    }

    public WsOnMessage(evt: any)
    {
        Logger.AddToStatusLogList("|RX--> " + evt.data);
        let evtData = JSON.parse(evt.data);

        switch (evtData.op_type.toLowerCase())
        {

            case "alert":
                //if anent current state is ready and alet of AS_ONBREAK then stuck state occur
                if (this.getCurrentState().toLowerCase() == "ready" &&
                    evtData.operation.toLowerCase() == "as_onbreak")
                {
                    //@todo: Event Here
                    alert("AGENT STUCK: Please try changing state on CCMS. If issue persists then please relogin on CCMS and phone");
                }


                switch (evtData.operation.toLowerCase())
                {
                    case "tfs_call_connected":
                        //let callAniParts =.split("_");
                        this.callDetail = {};

                        this.callDetail['queue'] = evtData.agent_group;
                        this.callDetail['dnis'] = evtData['tfn'];
                        this.callDetail['ani'] = evtData['call_ani'];
                        this.callDetail['ixn_id'] = evtData['ixn_id'];
                        this.callDetail['selected_option'] = 1; //selected option not being provided from backend

                        this.currentStatus = "READY";
                        this.changeStatusInProgress = false;
                        this.dialerService.updateEvent('callConnected',[this.callDetail, this.inManual]);

                        // $(document).trigger('callConnected', [this.callDetail, this.inManual]);

                        this.inCall = true;
                        this.currentStatus = "IN CALL";
                        this.dialerService.updateEvent('statusChanged',[this.currentStatus, true]);

                        // $(document).trigger('statusChanged', [this.currentStatus, true]);

                        if (!this.inManual)
                        {
                            setTimeout(() =>
                            {
                                // console.log("SENDING WRAPUP");
                                // console.log(this);
                                this.changeStatus("WRAPUP", "AFTER_CALL")
                            }, 3000);
                        }

                        break;

                    case "tfs_call_terminated":
                    case "tfs_call_ring_no_answer":
                        this.dialerService.updateEvent('callCompleted',[null, "BYE", 1, false]);

                        // $(document).trigger('callCompleted', [null, "BYE", 1, false]);

                        this.lastCallName = null;
                        this.lastCallNumber = null;
                        this.inCall = false;

                        if (!this.inManual)
                        {
                            this.currentStatus = "Wrapup";
                            this.inWrapup = true;
                        }
                        this.dialerService.updateEvent('statusChanged', [evtData.agent_state, true]);

                        // $(document).trigger('statusChanged', [evtData.agent_state, true])

                        //$(document).trigger('statusChanged', [this.currentStatus, true]);
                        //evtData.
                        this.isIncoming = false;
                        this.confStarted = false;
                        this.inManual = false;

                        break;

                    case "tfs_call_ringing":
                        this.ringStart = Math.floor(Date.now() / 1000);
                        //$(document).trigger('callRinging', []);


                        //@todo: event here
                        //EVENT_SOCKET.sendRinging(evtData['ixn_id'], "-1", evtData['call_ani']);
                        //xdmPhoneSocket.showMessage("Call is ringing from " + evtData['call_ani']);
                        break;

                    case "tfs_endpoint_not_found":
                        if (evtData.agent_state == "AS_LOGGEDOUT")
                        {
                            this.isLogOut = true;
                        }
                        this.dialerService.updateEvent('statusChanged', [evtData.agent_state, true]);

                        // $(document).trigger('statusChanged', [evtData.agent_state, true]);
                        break;

                    /*case "tfs_call_ring_no_answer":
                        $(document).trigger('callCompleted', [null, "BYE", 1, false]);

                        this.lastCallName = null;
                        this.lastCallNumber = null;
                        this.inCall = false;

                        if (!this.inManual) {
                            this.currentStatus = "Wrapup";
                            this.inWrapup = true;
                        }

                        $(document).trigger('statusChanged', [evtData.agent_state, true])

                        //$(document).trigger('statusChanged', [this.currentStatus, true]);
                        //evtData.
                        this.isIncoming = false;
                        this.confStarted = false;
                        this.inManual = false;
                        break;*/

                    case "cfs_customer_initiated_chat":
                    case "cfs_agent_initiated_chat":
                    case "cfs_terminate_chat_ixn":
                    case "cfs_inactive_chat_ixn":
                    case "efs_email_received":
                    case "efs_email_replied":
                    case "efs_email_deleted":
                    case "efs_email_drafted":
                    case "efs_email_forwarded":
                      this.dialerService.updateEvent(evtData.operation.toLowerCase(), [evtData]);

                        // $(document).trigger(evtData.operation.toLowerCase(), [evtData]);
                        break;

                }
                break;

            case "response":
                if (this.inquiryInProgress)
                {
                    this.inquiryInProgress = false;
                    this.dialerService.updateEvent('inquireResponse', [evtData.agent_state]);

                    // $(document).trigger('inquireResponse', [evtData.agent_state]);
                }

                if (this.changeStatusInProgress)
                {
                    //let stateChanged: boolean = (evtData.agent_state !== "AS_UNKNOWN") ? true : false;
                    let stateChanged = (evtData.op_result != -1) ? true : false;

                    if (stateChanged)
                    {
                        //EVENT_SOCKET.sendStateChange();
                        this.currentStatus = this.tempStatus;

                        //if Logout success
                        if (this.tempStatusNum == "AM_LOGOUT")
                        {
                            this.isLogOut = stateChanged;
                        }

                        this.inManual = (this.tempStatusNum == "AM_BREAK_MANUAL") ? true : false;
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

    public WsOnClose(event: any)
    {
        if (event.wasClean)
        {
            Logger.AddToStatusLogList('[close] Connection closed cleanly, code=' + event.code + 'reason=' + event.reason);
        }
        else
        {
            Logger.AddToStatusLogList('[close] Connection died');
        }

        //if agent not loggedout then reconnect
        if (!this.isLogOut)
        {
            Logger.AddToStatusLogList("|Re connecting");

            this.AM_WS_INST = null;
            this.AM_WS_INST = new WebSocket(this.config.AMS_WS_URL);
            this.AM_WS_INST.onopen = this.WsOnOpen.bind(this);
            this.AM_WS_INST.onerror = this.WsOnErr.bind(this);
            this.AM_WS_INST.onclose = this.WsOnClose.bind(this);
            this.AM_WS_INST.onmessage = this.WsOnMessage.bind(this);
            this.WS_Estb = false;
        }
    }

    public WsOnOpen(e: any)
    {
        Logger.AddToStatusLogList('|[open] Connection established|' + e.target.url);

        if (!this.sockConnected)
        {
          this.dialerService.updateEvent('WS_CONNECTED', []);

            // $(document).trigger("WS_CONNECTED", []);
            this.sockConnected = true;
        }

        this.WS_Estb = true;
    }

    public sendMessage(msg: string)
    {
        if (!this.WS_Estb)
        {
            Logger.AddToStatusLogList("Event socket not opened yet");

            setTimeout(() =>
            {
                this.sendMessage(msg);
            }, 2000);
            return;
        }

        //Logger.AddToStatusLogList("MSG|" + msg);
        this.AM_WS_INST?.send(msg);
    }

    public changeStatus(statusName: string, statusShortCode: string)
    {

        if (this.currentStatus != statusName && this.changeStatusInProgress == false)
        {

            this.changeStatusInProgress = true;
            this.tempStatus = statusName;
            this.tempStatusNum = statusShortCode;
            let msg = "";

            switch (statusShortCode)
            {
                case "AM_LOGIN":
                    //let msg = "a|" + this.extension + "|" + this.config.amsPass + "|" + this.config.sipUser;
                    msg = JSON.stringify({
                        "agent_id": parseInt(this.extension, 10),
                        "operation": "tfs_agent_login",
                        //"password": this.config.amsPass,
                        "password": this.config.sipUser,
                        "station_id": parseInt(this.config.sipUser, 10),
                        //"ixn_id": -2,
                        "op_type": "request"
                    });
                    //Logger.AddToStatusLogList("|LOGIN--> " + msg);
                    Logger.AddToStatusLogList("|LOGIN");
                    this.sendMessage(msg);
                    break;

                case "AM_LOGOUT":
                    //let msg ="b|" + this.extension;
                    msg = JSON.stringify({
                        "agent_id": parseInt(this.extension, 10),
                        "operation": "tfs_agent_logout"
                    });
                    Logger.AddToStatusLogList("|LOGOUT--> " + msg);
                    this.sendMessage(msg);
                    //this.AM_WS_INST.send("b|" + this.extension);
                    break;

                case "AM_READY":
                    //msg = "c|" + this.extension;
                    msg = JSON.stringify({
                        "agent_id": parseInt(this.extension, 10),
                        "operation": "tfs_agent_auto_in"
                    });
                    Logger.AddToStatusLogList("|READY--> " + msg);
                    this.sendMessage(msg);
                    //this.AM_WS_INST.send("c|" + this.extension);
                    break;

                case "AFTER_CALL":
                    //msg = "m|" + this.extension;
                    msg = JSON.stringify({
                        "agent_id": parseInt(this.extension, 10),
                        "operation": "tfs_agent_on_acw"
                    });
                    Logger.AddToStatusLogList("|AFTER CALL--> " + msg);
                    this.sendMessage(msg);
                    //this.AM_WS_INST.send("m|" + this.extension);
                    break;

                case "AMS_BREAK":
                case "AM_BREAK_15_MIN":
                case "AM_BREAK_30_MIN":
                case "AM_BREAK_FEEDBACK":
                case "AM_BREAK_LUNCH":
                case "AM_BREAK_TRAINING":
                case "AM_BREAK_MANUAL": //should be different case for manual
                    //msg = "d|" + this.extension;
                    msg = JSON.stringify({
                        "agent_id": parseInt(this.extension, 10),
                        "operation": "tfs_agent_on_break"
                    });
                    Logger.AddToStatusLogList("|BREAK (" + statusShortCode + ") --> " + msg);
                    this.sendMessage(msg);
                    //this.AM_WS_INST.send("d|" + this.extension);
                    break;
            }
        }

    }


    public callCompleted(event: any, response: any, cause: any, sessionNum: any, callFailed: any): void
    {

        //hangup on att dialed number
        if (this.attDialed)
        {
            this.attDialed = false;
            return;
        }

        //if agent is in call and caller hangup the call then hangup the whole bridge
        if (this.inConf && sessionNum == 1)
        {
            this.hangup(2);
        }

        //agent is in call
        if ((this.inCall && this.inConf == false) || (this.inConf && sessionNum == 1))
        {
            this.lastCallName = null;
            this.lastCallNumber = null;
            this.inCall = false;

            if (!this.inManual && !this.inBusy)
            {
                this.currentStatus = "Wrapup";
                this.inWrapup = true;
            }
            else if (this.inBusy)
            {
                this.currentStatus = "BUSY";
                this.inWrapup = false;
            }
            else
            {
                this.currentStatus = "Manual Dial";
                this.inWrapup = false;
            }
            this.dialerService.updateEvent('statusChanged', [this.currentStatus, true]);

            // $(document).trigger('statusChanged', [this.currentStatus, true]);
            this.callDetail = null;
        }

        if (this.inConf)
        {
            this.inConf = false;
            this.passThroughDtmf = false;
            // return;
        }

        this.isIncoming = false;
        this.confStarted = false;
    }


    public unWrapUp(): void
    {

        //this.wrapReady = true;
        //EVENT_SOCKET.sendUnWrap();

        if (this.lastCallNumber && this.lastCallName)
        {
            this.changeStatus(this.lastCallName, this.lastCallNumber);
        }
        else
        {
            //AGENT.changeStatus("READY", "*10");
            this.changeStatus("READY", "AM_READY");
        }

        this.inWrapup = false;
    }


    /**
     * Logout agent
     */
    public logout()
    {

        if (this.isLogOut)
        {
            return;
        }

        this.changeStatus('logout', 'AM_LOGOUT');
        /*

        if (this.inBreak()) {

        }
        else {

            //alert("To logout, you have to take break.");
        }
        */
    }


    public login(): void
    {
        this.changeStatus('login', 'AM_LOGIN');

    }

    public ready(): void
    {
        this.changeStatus('Ready', 'AM_READY');
        this.inWrapup = false;
    }

    public break(breakName: string, breakNum: string): void
    {
        this.changeStatus('Break', 'AMS_BREAK');
        this.inWrapup = false;
    }

    public manualDial(manualNum: string): void
    {
        let dialN = "00" + manualNum;
        Logger.AddToStatusLogList("Dialing Number: " + dialN);
        this.inManual = true;
        this.SIPPHONE.dialNum(dialN);
    }

    public inquireStatus(): void
    {
        this.inquiryInProgress = true;
        let msg = JSON.stringify(

            {
                "agent_id": parseInt(this.extension, 10),
                "operation": "wss_agent_state_inquiry",
                "password": "1",
                "station_id": 200,
                "ixn_id": -2,
                "op_type": "request", "chat_msg": "sample msg"
            }
            /*{
                "agent_id": this.extension,
                "operation": "wss_agent_state_inquiry",
                "op_type" : "request"
            }*/
        );

        Logger.AddToStatusLogList("Inq -> " + msg);
        this.sendMessage(msg);
        //this.sendMessage("n|" + this.extension);
    }

    public loadPhone(): void
    {
        this.SIPPHONE = SipPhone.getObj(this.config, this);
    }

    public sendChatMsg(ixnId: string, msg: string, ani: string): void
    {
        let chatJson = {
            "agent_id": parseInt(this.extension, 10),
            "ixn_id": parseInt(ixnId, 10),
            "chat_msg": msg,
            //"operation": "cfs_customer_initiated_chat",
            "operation": "cfs_customer_initiated_chat_reply",
            "call_ani": ani
        };

        this.sendMessage(JSON.stringify(chatJson));
    }

    public disposeChatMsg(ixnId: string, msg: string, ani: string): void
    {
        let chatJson = {
            "agent_id": parseInt(this.extension, 10),
            "ixn_id": parseInt(ixnId, 10),
            "chat_msg": msg,
            //"operation": "cfs_customer_initiated_chat",
            "operation": "cfs_terminate_chat_ixn",
            "call_ani": ani
        };

        this.sendMessage(JSON.stringify(chatJson));
    }

    public sendEmailMsg(ixnId: string, msg: string, ani: string): void
    {
        let emailJson = {
            "agent_id": parseInt(this.extension, 10),
            "ixn_id": parseInt(ixnId, 10),
            "chat_msg": msg,
            "operation": "efs_email_replied",
            "call_ani": ani
        };

        this.sendMessage(JSON.stringify(emailJson));
    }


    public disposeEmailMsg(ixnId: string, msg: string, ani: string): void
    {

        let emailJson = {
            "agent_id": parseInt(this.extension, 10),
            "ixn_id": parseInt(ixnId, 10),
            "chat_msg": msg,
            "operation": "efs_terminate_email_ixn",
            "call_ani": ani
        };
        this.sendMessage(JSON.stringify(emailJson));
    }

    public chatReply(chatId: number, msg: string, senderName: string): void
    {
        throw "Not applicable";
    }

    public chatClose(chatId: number): void {
        throw "Not applicable";
    }
}
