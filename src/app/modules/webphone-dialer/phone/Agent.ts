import { SipPhone } from "./SipPhone";
import { Logger } from "./Logger";
import { Util } from "./Util";
import { PhoneDialerService } from '../services/DialerService/phone-dialer.service'
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
export abstract class Agent
{
    protected isLoginErrCnt: number = 0;
    protected isLoginFalseCnt: number = 0;
    protected bitRateData: any = null;
    protected bitRateChart: any = null;
    protected lastBitStat: any = null;
    protected sipInfo: any = null;
    protected currentStatus: any = null;
    protected tempStatus: any = null;
    protected tempStatusNum: any = null;
    protected changeStatusInProgress: boolean = false;
    protected inCall: boolean = false;
    protected attDialed: boolean = false;
    protected lastCallName: any = null;
    protected lastCallNumber: any = null;
    protected inWrapup: boolean = false;
    protected skills: any = null;
    protected callDetail: any = null;
    protected callDetailCurrent: any = null;
    protected extension: any = null;
    protected inConf: boolean = false;
    protected isLogOut: boolean = false;
    protected inManual: boolean = false;
    protected attNum: any = null;
    protected chatInit: boolean = false;
    protected inBusy: boolean = false;
    protected isIncoming: boolean = false;
    protected autoAnswer: boolean = true; //will be used in SIPPHONE
    protected confStarted: boolean = false;
    protected confBridgeImediate: boolean = false;
    protected passThroughDtmf: boolean = false;
    protected encDtmf: boolean = false;
    protected allowManualDial: boolean = false;
    protected SIPPHONE!: SipPhone;
    protected inquiryInProgress: boolean = false;
    public static AUX: Array<any>;
    public static LAST_CALL_AUX: Array<any>;
    public http!: HttpClient
    public dialerService!: PhoneDialerService;
    public abstract changeStatus(statusName: string, statusNumber: string, extraHeader?: Array<any>): void;
    public abstract callCompleted(event: any, response: any, cause: any, sessionNum: any, callFailed: any): void;
    public abstract unWrapUp(): void;
    public abstract login(): void;
    public abstract logout(): void;
    public abstract ready(): void;
    public abstract break(breakName: string, breakNum: string): void;
    // public abstract manualDial(manualNum: string): void;
    public abstract manualDial(manualNum: string, skillName: string, leadId: Number, manualTime: Number, skillId: Number): void;
    public abstract inquireStatus(): void;
    public abstract loadPhone(): void;
    public abstract sendChatMsg(ixnId: string, msg: string, ani: string): void;
    public abstract sendEmailMsg(ixnId: string, msg: string, ani: string): void;
    public abstract disposeChatMsg(ixnId: string, msg: string, ani: string): void;
    public abstract disposeEmailMsg(ixnId: string, msg: string, ani: string): void;
    //public abstract answerIncoming(): void;
    public abstract chatReply(chatId: number, msg: string, senderName: string): void;
    public abstract chatClose(chatId: number): void;
	public abstract sendMessage(msg: string): void;
    /**
     * Dependign upon current state return availabnle states
     * @returns {*}
     */
    public getAvailableStates2()
    {
        return null;
        //if on call then can not change states
        if (this.inCall)
        {
            return [];
        }
        else if (this.inBusy)
        {
            return [];
        }
        else if (this.inManual)
        {
            let tempAux: any = {};
            for (let dialNum in Agent.AUX)
            {
                if (dialNum != "*12")
                {
                    tempAux[dialNum] = Agent.AUX[dialNum];
                }
            }
            tempAux['*3'] = "READY";
            return tempAux;
        }
        else
        {
            let currentState = this.currentStatus.toLowerCase();
            if (currentState == 'wrapup')
            {
                return Agent.LAST_CALL_AUX;
            }
            else if (currentState == 'ready')
            {
                return Agent.AUX;
            }
            else
            {
                var defaultStatus: any = { '*3': 'READY' };
                if (this.allowManualDial)
                {
                    defaultStatus["*12"] = 'Manual Dial';
                }
                return defaultStatus;
            }
        }
    }
    public rejectIncoming()
    {
        this.SIPPHONE.endCall(this.SIPPHONE.incomingSession);
        this.isIncoming = false;
    }
    public answerIncoming()
    {
        //if (this.isIncoming)
        {
            this.isIncoming = false;
            this.SIPPHONE.answerIncoming();
        }
    }
    /**
     Call is coming need to answer
     */
    public incomingCall(event: any, session: any)
    {
        let caller = session.remoteIdentity.uri.user;
        let data = caller.split("_");
        let callerId = data[0];
        let dnis = data[5].split("@")[0];
        let queue = data[2];
        this.isIncoming = true;
    }
    /**
     * Incoming Call
     * @param event
     * @param session
     */
    public callAnswered(session: any)
    {
        let caller = session.remoteIdentity.uri.user;
        let data = caller.split("_");
        this.callDetail = {};
        this.callDetail['queue'] = data[2];
        this.callDetail['dnis'] = data[5].split("@")[0];
        this.callDetail['lead_id'] = data[4];
        this.callDetail['caller_id'] = data[0];
        this.callDetail['call_id'] = data[1];
        this.callDetail['selected_option'] = data[3];
    }
    public muteAll()
    {
        this.mute(1);
        this.mute(2);
    }
    public isMuteAll() : boolean
    {
        let m1: boolean = this.SIPPHONE.isMute(1);
        let m2: boolean = this.SIPPHONE.isMute(2);
        //if both calls are active
        if (this.SIPPHONE.session1 != null && this.SIPPHONE.session2 != null)
        {
            if (m1 == true && m2 == true)
            {
                return true;
            }
            return false;
        }
        //if line one is acitve
        else if (this.SIPPHONE.session1 != null && this.SIPPHONE.session2 == null)
        {
            return m1;
        }
        //if line two is acitve
        else if (this.SIPPHONE.session1 == null && this.SIPPHONE.session2 != null)
        {
            return m2;
        }
        return false;
    }
    /**
     *
     * @param callNum
     */
    public mute(callNum: number)
    {
        if (this.inCall)
        {
            if ((
                (callNum && callNum == 1) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session1)
            {
                this.SIPPHONE.mute(1);
                Logger.AddToStatusLogList('|Mute call| Agent ID:' + this.extension + '|On Line: 1');
            }
            if ((
                (callNum && callNum == 2) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session2)
            {
                this.SIPPHONE.mute(2);
                Logger.AddToStatusLogList('|Mute call| Agent ID:' + this.extension + '|On Line: 2');
            }
        }
    }
    public unmuteAll()
    {
        this.unmute(1);
        this.unmute(2);
    }
    /**
     *
     * @param callNum
     */
    public unmute(callNum: number)
    {
        if (this.inCall)
        {
            if ((
                (callNum && callNum == 1) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session1)
            {
                this.SIPPHONE.unmute(1);
                Logger.AddToStatusLogList('|UnMute call| Agent ID:' + this.extension + '|On Line: 1');
            }
            if ((
                (callNum && callNum == 2) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session2)
            {
                this.SIPPHONE.unmute(2);
                Logger.AddToStatusLogList('|UnMute call| Agent ID:' + this.extension + '|On Line: 2');
            }
        }
    }
    /**
     *
     * @param callNum
     */
    public hold(callNum: number, holdType?: any)
    {
      let params = {
        type:"hold"
      }
        if (this.inCall)
        {
            if ((
                (callNum && callNum == 1) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session1 && this.SIPPHONE.session1.localHold == false)
            {
                this.SIPPHONE.session1.hold();
                Logger.AddToStatusLogList('|Hold call| Agent ID:' + this.extension + '|On Line: 1');
                this.dialerService.updateEvent('holdSuccess',[this.SIPPHONE.session1]);
                // $(document).trigger('holdSuccess', [this.SIPPHONE.session1]);
                this.dialerService.eventDispatcher(environment.server_url, params).subscribe({
                  next:(data:any) =>{
                    Logger.AddToStatusLogList('|HOLD URL| Agent ID:' + this.extension + "|Response:" + data);
                  }
                });
                // $.get(environment.server_url + '/event/dispatch?type=hold', function (data: any)
                // {
                //     Logger.AddToStatusLogList('|HOLD URL| Agent ID:' + self.extension + "|Response:" + data);
                // });
            }
            if ((
                (callNum && callNum == 2) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session2 && this.SIPPHONE.session2.localHold == false)
            {
                Logger.AddToStatusLogList('|Hold call| Agent ID:' + this.extension + '|On Line: 2');
                this.SIPPHONE.session2.hold();
                this.dialerService.updateEvent('holdSuccess',[this.SIPPHONE.session2]);
                // $(document).trigger('holdSuccess', [this.SIPPHONE.session2]);
                this.dialerService.eventDispatcher(environment.server_url, params).subscribe({
                  next:(data:any) =>{
                    Logger.AddToStatusLogList('|HOLD URL| Agent ID:' + this.extension + "|Response:" + data);
                  }
                });
                // $.get(environment.server_url + '/event/dispatch?type=hold', function (data: any)
                // {
                //     Logger.AddToStatusLogList('|HOLD URL| Agent ID:' + this.extension + "|Response:" + data);
                // });
            }
        }
    }
    public unHold(callNum: number, holdType?: string)
    {
      let params = {
        type:"hold"
      }
        if (this.inCall)
        {
            let isUnhold: boolean = false;
            if ((
                (callNum && callNum == 1) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session1 && this.SIPPHONE.session1.localHold == true)
            {
                Logger.AddToStatusLogList('|UnHold call| Agent ID:' + this.extension + '|On Line: 1');
                this.SIPPHONE.holdedSession = this.SIPPHONE.session1;
                this.SIPPHONE.session1.unhold();
                this.dialerService.updateEvent('unHoldSuccess',[this.SIPPHONE.session1]);
                // $(document).trigger('unHoldSuccess', [this.SIPPHONE.session1]);
                isUnhold = true;
            }
            if ((
                (callNum && callNum == 2) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session2 && this.SIPPHONE.session2.localHold == true)
            {
                Logger.AddToStatusLogList('|UnHold call| Agent ID:' + this.extension + '|On Line: 2');
                this.SIPPHONE.holdedSession = this.SIPPHONE.session2;
                this.SIPPHONE.session2.unhold();
                this.dialerService.updateEvent('unHoldSuccess',[this.SIPPHONE.session2]);
                // $(document).trigger('unHoldSuccess', [this.SIPPHONE.session2]);
                isUnhold = true;
            }
            if(isUnhold)
            {
                let callState: string = 'CONNECT';
                if (this.inManual)
                {
                    callState = 'MCONNECT';
                }
                this.dialerService.eventDispatcher(environment.server_url, params).subscribe({
                  next:(data:any) =>{
                    Logger.AddToStatusLogList('|UnHOLD URL| Agent ID:' + this.extension + "|Response:" + data);
                  }
                });
                // $.get(environment.server_url + '/event/dispatch?type=unhold&call_state=' + callState, function (data: any)
                // {
                //     Logger.AddToStatusLogList('|UnHOLD URL| Agent ID:' + this.extension + "|Response:" + data);
                // });
            }
        }
    }
    /**
     *
     * @param callNum
     */
    public hangup(callNum?: number)
    {
        if ((
            (callNum && callNum == 1) || typeof callNum === "undefined"
        ) && this.SIPPHONE.session1
        )
        {
            this.SIPPHONE.endCall(this.SIPPHONE.session1);
            if (this.SIPPHONE.session2)
            {
                this.SIPPHONE.setupRemoteMedia(this.SIPPHONE.session2);
            }
        }
        if ((
            (callNum && callNum == 2) || typeof callNum === "undefined"
        ) && this.SIPPHONE.session2)
        {
            this.SIPPHONE.endCall(this.SIPPHONE.session2);
            if (this.SIPPHONE.session1)
            {
                this.SIPPHONE.setupRemoteMedia(this.SIPPHONE.session1);
            }
        }
    }
    /**
     *
     * @param lastCallNum
     * @param lastCallName
     */
    public setLastCall(lastCallNum: any, lastCallName: any)
    {
        this.lastCallName = lastCallName;
        this.lastCallNumber = lastCallNum;
    }
    /**
     *
     * @param skills
     */
    public setSkills(skills: Array<any>)
    {
        this.skills = skills;
    }
    /**
     *
     * @param number
     * @param toNumber
     */
    public blindTransfer(number: string, skillId: number, toNumber?: any)
    {
        if (this.inCall)
        {
            if (this.SIPPHONE.session1 && this.SIPPHONE.session1.localHold == true)
            {
                Logger.AddToStatusLogList('|Call On Hold Blind Transfer Failed| Agent ID:' + this.extension + '|On Line: 1');
                alert("Please unhold before blind transfer");
                return;
            }
            if (toNumber)
            {
                //number = $("#blind_transfer_number").val();
                if (number.length == 4 || number.length == 5)
                {
                    number = "00" + number;
                }
                else
                {
                    //skillId = getSkillId(AGENT.callDetail.queue);
                    number = this.callDetail.lead_id + "_" + number + "_" + skillId;
                }
            }
            if (number != '')
            {
                let referto = "sip:" + number + "@" + this.SIPPHONE.sipServer + ":5060";
                // let referto = "sip:" + number + "@iptdevagent.ibexglobal.com:5060";
                this.SIPPHONE.session1.refer(referto);
                Logger.AddToStatusLogList('|Transfer call| Agent ID:' + this.extension);
            }
        }
    }
    /**
     * Dial number for att transfer
     */
    public attTransferDial(numDial: string, skillId: number, toNumber?: any)
    {
        //if agent is in call and not previous att dialed
        if (this.inCall && this.attDialed == false)
        {
            if (toNumber &&
                (numDial.length == 4 || numDial.length == 5)
            )
            {
                numDial = "00" + numDial;
            }
            if (numDial)
            {
                this.attNum = numDial;
                this.hold(1);
                //Logger.AddToStatusLogList('|Hold call| Agent ID:' + this.extension + '|On Line: 1');
                if (numDial.length >= 10 || toNumber)
                {
                    if (numDial.length >= 10)
                    {
                        numDial = this.callDetail.lead_id + "_" + numDial + "_" + skillId;
                    }
                }
                this.attDialed = true;
                let extraHeaders = ['transfertype: att'];
                this.SIPPHONE.dialNum(numDial, extraHeaders);
            }
        }
    }
    /**
     * ATT transfer call hangup
     */
    public attTranferHangup()
    {
        if (this.inCall)
        {
            if (this.SIPPHONE.session2 && this.SIPPHONE.session2.endTime == null)
            {
                this.unHold(1);
                this.hangup(2);
                Logger.AddToStatusLogList('|Call Completed| Agent ID:' + this.extension + '|On Line: 2');
            }
        }
    }
    /**
     * @todo: toNumber not required any more
     * @param toNumber
     */
    public attTransfer()
    {
        //att dialed number and agent is in call
        //if (this.attDialed && this.inCall)
        if (this.inCall)
        {
            this.hold(1);
            this.hold(2);
            let callType = 'Inbound';
            let callId = this.callDetail.call_id;
            let params = {
              type: "att",
              call_id: callId,
              caller_id:  this.callDetail.caller_id,
              call_type:  callType,
            }
            if (this.inManual || this.inBusy || this.inWrapup)
            {
                callType = 'Outbound';
                callId = 'NONE';
            }
            this.dialerService.eventDispatcher(environment.server_url, params).subscribe({
              next:(data:any) =>{
                Logger.AddToStatusLogList('|Transfer URL| Agent ID:' + this.extension + "|Response:" + data);
              }
            });
            // $.get(environment.server_url + '/event/dispatch?type=att&call_id=' + callId + "&caller_id=" + this.callDetail.caller_id + "&call_type=" + callType, function (data: any)
            // {
            //     Logger.AddToStatusLogList('|Transfer URL| Agent ID:' + this.extension + "|Response:" + data);
            // });
            this.SIPPHONE.session2.refer(this.SIPPHONE.session1);
            Logger.AddToStatusLogList('|Transfer call| Agent ID:' + this.extension);
        }
    }
    /**
     *
     * @param toNumber
     */
    public confDial(numDial: string, skillId: number, toNumber: any, extraHeaders?: any, doNotHold?: any, confBridgeImediate?: any)
    {
        if (this.inCall)
        {
            //in case of external call
            if (!doNotHold)
            {
                this.hold(1);
                Logger.AddToStatusLogList('| Hold call | Agent ID:' + this.extension + '| On Line: 1');
            }
            if (toNumber)
            {
                if (numDial.length == 4 || numDial.length == 5)
                {
                    numDial = "00" + numDial;
                }
                else
                {
                    numDial = this.callDetail.lead_id + "_" + numDial + "_" + skillId;
                }
            }
            this.SIPPHONE.dialNum(numDial, extraHeaders, true);
            this.inConf = true;
            this.confBridgeImediate = false;
            //this.confBridgeImediate = confBridgeImediate;
            Logger.AddToStatusLogList('| Calling | Agent ID:' + this.extension + '| On Line: 2');
        }
    }
    public bridgeCalls()
    {
        return this.SIPPHONE.bridgeCalls(false);
    }
    public splitCalls()
    {
        this.SIPPHONE.splitCalls();
    }
    /**
     * Conference is started
     */
    /*public confStart()
    {
        if (this.inConf)
        {
            this.confStarted = true;
        }
        this.unHold(1, 'conf');
    }*/
    /**
     *
     */
    public confStop()
    {
        if (this.inConf)
        {
            this.hangup(2);
            Logger.AddToStatusLogList('| Hang Up | Agent ID:' + this.extension + '| On Line: 2');
            this.unHold(1);
            Logger.AddToStatusLogList('| Call established(unHold) | Agent ID:' + this.extension + '| On Line: 1');
        }
    }
    /***
     * Return true if agent is in break
     */
    public inBreak()
    {
        //initial break
        if (this.currentStatus == null)
        {
            return true;
        }
        let currentState = this.currentStatus.toLowerCase();
        if (this.inWrapup || currentState == 'ready' || this.inCall)
        {
            return false;
        }
        return true;
    }
    /**
     * Dial a manual number
     */
    /*public manualDial(manualNum: string, skillName: string, skillId: number, leadId: number, manualTime: any) {
        if (this.inManual || this.inBusy || this.inWrapup) {
            let headers = ["acd_server_ip: " + this.SIPPHONE.sipServer,
            "PHONE_OUT: " + manualNum,
                "call_type: Outbound",
            "SKILL: " + skillName,
            "LeadID: " + leadId,
            "timeid: " + manualNum + "-" + Util.currentTime("")];
            this.callDetail = {};
            this.callDetail['queue'] = skillName;
            this.callDetail['dnis'] = "";
            this.callDetail['lead_id'] = leadId;
            this.callDetail['caller_id'] = manualNum;
            this.callDetail['selected_option'] = "";
            //unixTime = Math.round((new Date()).getTime() / 1000);
            let dialNum = manualTime + "-" + leadId + "_" + manualNum + "_" + skillId;
            if (manualNum.length == 4 || manualNum.length == 5) {
                dialNum = "00" + manualNum;
            }
            if (this.inBusy) {
                dialNum = dialNum + "_chat";
            }
            this.SIPPHONE.dialNum(dialNum, headers, false, true);
        }
    }*/
    /**
     * WIll be called in case of manual dial
     * @param event
     * @param data
     * @param session
     */
    public callConnected(data: any, session: any)
    {
        if (this.currentStatus == "READY" && this.changeStatusInProgress == false)
        {
            this.inCall = true;
            this.currentStatus = "IN CALL";
            this.dialerService.updateEvent('IB_callConnected',[this.callDetail,'']);
            // $(document).trigger('IB_callConnected', [this.callDetail, '']);
            //xdmPhoneSocket.inboundCall(this.callDetail, '');
            this.dialerService.updateEvent('statusChanged',[this.currentStatus,'']);
            // $(document).trigger('statusChanged', [this.currentStatus, true]);
        }
        if ((this.inManual || this.inBusy || this.inWrapup) && this.changeStatusInProgress == false)
        {
            this.inCall = true;
            this.currentStatus = "IN CALL";
            let caller = "";
            if (session.remoteURI)
            {
                caller = session.remoteURI.user;
            }
            else
            {
                caller = session.remoteIdentity.uri.user;
            }
            this.dialerService.updateEvent('statusChanged', [this.currentStatus, true]);
            this.dialerService.updateEvent('OB_callConnected', [this.callDetail, '']);
            // $(document).trigger('statusChanged', [this.currentStatus, true]);
            // $(document).trigger('OB_callConnected', [this.callDetail, '']);
        }
        if (this.attDialed)
        {
          this.dialerService.updateEvent('att_callConnected', []);
            // $(document).trigger('att_callConnected', []);
        }
        if (this.inConf)
        {
          this.dialerService.updateEvent('att_callConnected', []);
            // $(document).trigger('conf_callConnected', []);
        }
    }
    /**
     *
     * @param callNum
     */
    public sendDTMF(callNum: number, dtmfVal: string)
    {
        if (this.inCall)
        {
            dtmfVal = dtmfVal.toString();
            if (this.attDialed || this.inConf)
            {
                callNum = 2;
            }
            if (dtmfVal.length <= 0)
            {
                return;
            }
            if ((
                (callNum && callNum == 1) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session1)
            {
                for (let i = 0; i < dtmfVal.length; i++)
                {
                    Logger.AddToStatusLogList('|DTMF| Agent ID:' + this.extension + '|On Line: 1');
                    this.SIPPHONE.session1.dtmf(dtmfVal[i]);
                }
            }
            if ((
                (callNum && callNum == 2) || typeof callNum === "undefined"
            ) && this.SIPPHONE.session2)
            {
                for (let i = 0; i < dtmfVal.length; i++)
                {
                    Logger.AddToStatusLogList('|DTMF| Agent ID:' + this.extension + '|On Line: 2');
                    this.SIPPHONE.session2.dtmf(dtmfVal[i]);
                }
            }
        }
    }
    /**
     *
     * @returns {null}
     */
    public getCurrentState()
    {
        return this.currentStatus;
    }
    /**
     *
     *
     * @param chatId
     * @param chatSkill
     * @param chatStart
     */
    public busy(chatId: any, chatSkill: any, chatStart: any)
    {
        this.chatInit = true;
        let extraHeaders = ['NC_ID: ' + chatId, 'NC_SKILL: ' + chatSkill, 'NC_START_TIME: ' + chatStart,
        ];
        this.changeStatus("BUSY", "*50", extraHeaders);
        //SIPPHONE.dialNum('*50', extraHeaders);
    }
    public toggle(toggleMode: any)
    {
        if (this.inCall)
        {
            var holdCallNum = 0;
            var unHoldCallNum = 0;
            if (this.SIPPHONE.session1 && this.SIPPHONE.session1.localHold == false &&
                this.SIPPHONE.session2 && this.SIPPHONE.session2.localHold == true)
            {
                holdCallNum = 1;
                unHoldCallNum = 2;
            }
            if (this.SIPPHONE.session1 && this.SIPPHONE.session1.localHold == true &&
                this.SIPPHONE.session2 && this.SIPPHONE.session2.localHold == false)
            {
                holdCallNum = 2;
                unHoldCallNum = 1;
            }
            if (holdCallNum > 0 && unHoldCallNum > 0)
            {
                this.hold(holdCallNum, toggleMode);
                this.unHold(unHoldCallNum, toggleMode);
            }
        }
    }
    public isHold(lineNum: number): boolean
    {
        let ret: boolean = false;
        if (this.inCall)
        {
            let session: any = null;
            switch (lineNum)
            {
                case 1:
                    session = this.SIPPHONE.session1;
                    break;
                case 2:
                    session = this.SIPPHONE.session2;
                    break;
            }
            if (session && session.localHold == true)
            {
                ret = true;
            }
        }
        return ret;
    }
}
