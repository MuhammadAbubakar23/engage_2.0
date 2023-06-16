import { Agent } from "./Agent";
import { Logger } from "./Logger";
import { Config } from "./Config";
import { SipPhone } from "./SipPhone";
import { Util } from "./Util";

export class AgentAsteriskImp extends Agent {
    protected config: Config;

    public constructor(config: Config) {
        super();

        this.config = config;
        this.extension = config.extension;

    }

	public sendMessage(msg: string) {
	}

    public changeStatus(statusName: string, statusNumber: string, extraHeader?: Array<any>): void {
        if (this.currentStatus != statusName && this.changeStatusInProgress == false) {
            this.changeStatusInProgress = true;
            this.tempStatus = statusName;
            this.tempStatusNum = statusNumber;

            if (extraHeader) {
                extraHeader.push('BREAK_CODE_VALUE: ' + statusName);
                this.SIPPHONE.dialNum(statusNumber, extraHeader);
            }
            else {
                extraHeader = ['BREAK_CODE_VALUE: ' + statusName];
                this.SIPPHONE.dialNum(statusNumber, extraHeader);
            }

        }
        /*else
        {
            //@todo: Event here
            //alert("You are already in " + statusName + ".");
        }*/
    }

    public loadPhone(): void {
        this.dialerService = this.config.dialerService;
        this.SIPPHONE = SipPhone.getObj(this.config, this);
    }


    public callCompleted(event: any, response: any, cause: any, sessionNum: any, callFailed: any): void {
        //hangup on att dialed number
        if (this.attDialed && sessionNum == 2) {
          this.dialerService.updateEvent('callCompleted', [null, "BYE", sessionNum, callFailed]);
            // $(document).trigger('callCompleted', [null, "BYE", sessionNum, callFailed]);
            this.attDialed = false;
            return;
        }



        if (this.changeStatusInProgress) {

            //success
            if (cause == 'BYE') {
                this.currentStatus = this.tempStatus;
            }

            //if Logout success
            if (this.tempStatusNum == "*2") {
                this.isLogOut = (cause == 'BYE') ? true : false;
            }

            this.inBusy = (this.tempStatusNum == "*50") ? true : false;
            this.inManual = (this.tempStatusNum == "*12") ? true : false;
            this.dialerService.updateEvent('statusChanged', [this.tempStatus, (cause == 'BYE') ? true : false]);

            // $(document).trigger('statusChanged', [this.tempStatus, (cause == 'BYE') ? true : false]);

            this.changeStatusInProgress = false;
            this.tempStatus = null;
            this.tempStatusNum = null;
        }

        //if agent is in call and caller hangup the call then hangup the whole bridge
        if ((this.inConf && sessionNum == 1)) {
            this.hangup(2);
        }

        //agent is in call
        if ((this.inCall && this.inConf == false) || (this.inConf && sessionNum == 1)) {
            this.lastCallName = null;
            this.lastCallNumber = null;
            this.inCall = false;

            if (!this.inManual && !this.inBusy) {
                this.currentStatus = "Wrapup";
                this.inWrapup = true;
            }
            else if (this.inBusy) {
                this.currentStatus = "BUSY";
                this.inWrapup = false;
            }
            else {
                this.currentStatus = "Manual Dial";
                this.inWrapup = false;
            }

            this.dialerService.updateEvent('statusChanged', [this.currentStatus, true]);

            // $(document).trigger('statusChanged', [this.currentStatus, true]);

            Logger.AddToStatusLogList('Call Completed Fired|' + callFailed);
            this.dialerService.updateEvent('callCompleted', [null, "BYE", 1, callFailed]);

            // $(document).trigger('callCompleted', [null, "BYE", 1, callFailed]);
            this.callDetail = null;
        }
        else if (!this.inCall) {
            this.dialerService.updateEvent('callCompleted', [null, "BYE", 1, callFailed]);
            // $(document).trigger('callCompleted', [null, "BYE", 1, callFailed]);
        }

        if (this.inConf) {
            if (sessionNum == 2) {
            this.dialerService.updateEvent('callCompleted', [null, "BYE", 1, callFailed]);

                // $(document).trigger('callCompleted', [null, "BYE", sessionNum, callFailed]);
            }

            this.inConf = false;
            this.passThroughDtmf = false;
        }

        if (this.attDialed && sessionNum == 1) {
            this.hangup(2);
            this.attDialed = false;
            this.dialerService.updateEvent('callCompleted', [null, "BYE", 1, callFailed]);

            // $(document).trigger('callCompleted', [null, "BYE", sessionNum, callFailed]);
        }



        this.isIncoming = false;
        this.confStarted = false;
    }

    public unWrapUp(): void {
        if (this.inWrapup) {
            if (this.lastCallNumber && this.lastCallName) {
                this.changeStatus(this.lastCallName, this.lastCallNumber);
            }
            else {
                this.changeStatus("READY", "*10");
            }
        }

        this.inWrapup = false;
    }

    public login(): void {
        if (!this.SIPPHONE) {
            throw "Phone is not loaded yet";
        }
        this.changeStatus('Initial Login', '*1');
    }

    public forceLogout(): void {
        try {
            this.logout();
        }
        catch (e) {
            setTimeout(this.forceLogout, 5000);
        }
    }

    public logout(): void {
        if (!this.SIPPHONE) {
            throw "Phone is not loaded yet";
        }


        if (this.isLogOut) {
            return;
        }

        if (this.inBreak()) {
            this.changeStatus('logout', '*2');
        }
        else {
            throw "To logout, you have to take break.";
        }

    }

    public ready(): void {
        if (!this.SIPPHONE) {
            throw "Phone is not loaded yet";
        }

        this.changeStatus("Ready", "*3");
    }

    public break(breakName: string, breakNum: string): void {
        if (!this.SIPPHONE) {
            throw "Phone is not loaded yet";
        }

        this.changeStatus(breakName, breakNum);
    }



    public manualDial(manualNum: string, skillName: string, leadId: Number, manualTime: Number, skillId: Number): void {
        if (this.inManual || this.inBusy || this.inWrapup) {

            let headers = ["acd_server_ip: " + this.SIPPHONE.sipHost,
            "PHONE_OUT: " + manualNum,
            "callType: Outbound",
            "SKILL: " + skillName,
            "LeadID: " + leadId,
            "timeid: " + manualNum + "-" + Util.currentTime("")];

            this.callDetail = {};
            this.callDetail['queue'] = skillName;
            this.callDetail['dnis'] = "";
            this.callDetail['lead_id'] = leadId;
            this.callDetail['caller_id'] = manualNum;
            this.callDetail['selected_option'] = "";

            let dialNum = manualTime + "-" + leadId + "_" + manualNum + "_" + skillId;

            if (manualNum.length == 4 || manualNum.length == 5) {
                dialNum = "00" + manualNum;

            }

            if (this.inBusy) {
                dialNum = dialNum + "_chat";
            }

            this.SIPPHONE.dialNum(dialNum, headers, false, true);
        }
    }

    public inquireStatus(): void {
        throw "Not applicable";
    }

    public sendChatMsg(ixnId: string, msg: string, ani: string): void {
        throw "Not applicable";
    }

    public sendEmailMsg(ixnId: string, msg: string, ani: string): void {
        throw "Not applicable";
    }

    public disposeChatMsg(ixnId: string, msg: string, ani: string): void {
        throw "Not applicable";
    }

    public disposeEmailMsg(ixnId: string, msg: string, ani: string): void {
        throw "Not applicable";
    }

    public chatReply(chatId: number, msg: string, senderName: string): void {
        throw "Not applicable";
    }

    public chatClose(chatId: number): void {
        throw "Not applicable";
    }
}
