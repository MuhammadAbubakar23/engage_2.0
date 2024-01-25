import { Config } from "./Config";
import { Logger } from "./Logger";
import { Agent } from "./Agent";
import { PhoneDialerService } from '../services/DialerService/phone-dialer.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from "../services/SharedService/shared.service";

export class SipPhone
{
    //[x: string]: any;
    public holdedSession: any = null;
    public sipHost: string;
    private sipUser: string;
    private sipPass: string;
    private autoAnswer: boolean;
    private numDialing: boolean;
    private sipRegistered: boolean;
    public incomingSession: any;
    private inConfDialing: boolean;
    private plzBridge: boolean;
    private stunServers: Array<object> = [];
    private static _sipPhone: SipPhone | null = null;
    private audioCtx: any = null;
    private srcStream3: any = null;
    private srcStream4: any = null;

    public session1: any = null; //Used for incoming calls
    public session2: any = null; //Used in case of conference call or outbound call
    private sessionDescriptionHandlerFactoryOptions: any = {};
    private wrtcPhone: any;
    private AGENT: any;
    public sipServer: string;
    public sipWs: string;

    private remoteAudioElem2: any;
    private remoteAudioElem: any;
    private dest: any = null;
    private dest2: any = null;
    public splitTrack1: any = null;
    public splitTrack2: any = null;
    public callBridged: boolean = false;
    public senderTrack2: any = null;
    dialerService! : PhoneDialerService;
    /////////////// Fake vars
    hasOffer: any;
    dialog: any;
    sessionDescriptionHandler: any;
    hasAnswer!: boolean;
    status!: number;
    sessionDescriptionHandlerOptions: any;
    modifiers: any;
    id: any;
    http!: HttpClient;


    private constructor(conf: Config, agent: Agent)
    {
        this.holdedSession = null;
        this.sipHost = conf.sipHost;
        //this.sipUser = "20014";
        //this.sipPass = "20014";
        this.sipUser = conf.sipUser;
        this.sipPass = conf.sipPass;
        this.autoAnswer = conf.autoAnswer;
        this.numDialing = false;
        this.sipRegistered = false;
        this.incomingSession = null;
        this.inConfDialing = false;
        this.plzBridge = false;
        this.AGENT = agent;
        this.sipServer = conf.sipHost;
        this.sipWs = conf.sipWs;
        this.dialerService = conf.dialerService;
        this.stunServers = conf.getStunServers();

        this.sessionDescriptionHandlerFactoryOptions.peerConnectionOptions = {
            rtcConfiguration: {
                iceServers: this.stunServers
            },
            constraints: {
                audio: true,
                video: false
            }
        };

        this.wrtcPhone = new SIP.UA(
            {
                transportOptions: {
                    wsServers: ['wss://' + this.sipWs],
                    traceSip: conf.sipTrace,

                },

                uri: 'sip:' + this.sipUser + "@" + conf.sipDomain,
                password: this.sipPass,
                displayName: this.sipUser,
                register: true,
                registerOptions: {
                    expires: 3600
                },
                hackWssInTransport: true,
                log: {
                    builtinEnabled: true,
                    level: 3,
                },

                sessionDescriptionHandlerFactoryOptions: this.sessionDescriptionHandlerFactoryOptions
            });

        //registration success
        this.wrtcPhone.on('registered', () =>
        {
            // console.log(this);
            Logger.AddToStatusLogList('Register| Agent ID:' + SipPhone._sipPhone?.sipUser + '|Register Success');

            //emitting event
            this.dialerService.updateEvent('sipRegistered', [this.sipRegistered]);

            // $(document).trigger('sipRegistered', [this.sipRegistered]);

            /*//Initial Login
            if (this.sipRegistered == false)
            {
                //SipPhone._sipPhone.AGENT.changeStatus('Initial Login', '*1');
            }
            */
            this.sipRegistered = true;
        });

        this.wrtcPhone.on('unregistered', (response: any, cause: any) => {
                Logger.AddToStatusLogList('|Un-Register| Agent ID:' + SipPhone._sipPhone?.sipUser + '|' + response + '|' + cause);
                this.dialerService.updateEvent('sipUnregistered', [response, cause]);

                // $(document).trigger('sipUnregistered', [response, cause]);
            });

        //registration failed
        this.wrtcPhone.on('registrationFailed', (response: any, cause: any) =>
        {
            Logger.AddToStatusLogList('|Register| Agent ID:' + this.sipUser + '|Register Failed|' + response + '|' + cause);
            this.dialerService.updateEvent('sipRegisteredFailed', [response, cause]);
            // $(document).trigger('sipRegisteredFailed', [response, cause]);
        });


        this.wrtcPhone.on('invite', this.inviteIncoming);

        this.remoteAudioElem2 = document.getElementById('remoteAudioElem2');
        this.remoteAudioElem = document.getElementById('remoteAudioElem');
        this.remoteAudioElem.autoplay = true;
        this.remoteAudioElem2.autoplay = true;


    }


    public static getObj(conf: Config, agent: Agent)
    {
        if (SipPhone._sipPhone == null)
        {
            SipPhone._sipPhone = new SipPhone(conf, agent);
        }


        return SipPhone._sipPhone;
    }



    /**
     * As function name suggested
     * @param num
     * @returns {*}
     */
    public dialNum(num: string, extraHeads?: Array<any>, inConf?: boolean, useSess1?: any, extraOpts?: {}): any
    {
        num = num.toString();

        //if number is already being dialied
        if (this.numDialing)
        {
            Logger.AddToStatusLogList('|IGN: Dailing in progress|Agent ID:' + this.sipUser);
            return;
        }

        Logger.AddToStatusLogList('|Dialing Num: ' + num + '|Agent ID:' + this.sipUser);

        this.numDialing = true;

        if (inConf && inConf == true)
        {
            this.inConfDialing = true;
        }
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.remoteAudioElem.autoplay = true;
          SipPhone._sipPhone.remoteAudioElem2.autoplay = true;
        }

        let options: any = {};

        if (extraOpts)
        {
            options = extraOpts;
        }

        if (extraHeads)
        {
            //options = {extraHeaders: extraHeads};
            Object.assign(options, { extraHeaders: extraHeads });
            //options['extraHeaders'] = extraHeads;
        }

        options.sessionDescriptionHandlerOptions = {
            rtcConfiguration: {
                iceServers: this.stunServers
            },
            constraints: {
                audio: true,
                video: false
            }
        };

        //options['rel100'] = SIP.C.supported.REQUIRED;

        var session = this.wrtcPhone.invite(num, options);

        session.on('progress', this.callTrying);
        session.on('accepted', this.inviteAnswered);
        session.on('terminated', this.inviteClosed);
        session.on('dtmf', this.onDtmf);


        if (useSess1)
        {
            this.session1 = session;
        }
        else
        {
            this.session2 = session;
        }


        return session;
    }

    public splitCalls()
    {
        let senders1 = SipPhone._sipPhone?.session1.sessionDescriptionHandler.peerConnection.getSenders();
        let senders2 = SipPhone._sipPhone?.session2.sessionDescriptionHandler.peerConnection.getSenders();




        if (SipPhone._sipPhone?.splitTrack1 &&
            SipPhone._sipPhone?.splitTrack2)
        {
            senders1 = SipPhone._sipPhone.session1.sessionDescriptionHandler.peerConnection.getSenders();
            senders1[0].replaceTrack(SipPhone._sipPhone.splitTrack1);

            senders2[0].replaceTrack(SipPhone._sipPhone.senderTrack2);
            //senders1[0].replaceTrack(SipPhone._sipPhone.splitTrack1);
            //senders2[0].replaceTrack(SipPhone._sipPhone.splitTrack2);
        }
    }

    /**
    * Bridge two sessions
    * @returns {boolean}
    */
    public bridgeCalls(doNotCheckHold: boolean)
    {
      if(SipPhone._sipPhone != null){
        if (SipPhone._sipPhone?.audioCtx == null)
        {
          SipPhone._sipPhone.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        }
        SipPhone._sipPhone.callBridged = true;
      }


        if (!doNotCheckHold)
        {
            let shouldRet = false;

            //both lines must be unhold
            if ( SipPhone._sipPhone?.AGENT.isHold(1))
            {
                Logger.AddToStatusLogList('Calls Merged| Agent ID:' + SipPhone._sipPhone.AGENT.extension
                    + '| Line1 Hold-UnHolding ');
                SipPhone._sipPhone.AGENT.unHold(1);
                shouldRet = true;
            }

            if ( SipPhone._sipPhone?.AGENT.isHold(2))
            {
                Logger.AddToStatusLogList('Calls Merged| Agent ID:' + SipPhone._sipPhone.AGENT.extension
                    + '| Line2 Hold-UnHolding ');
                SipPhone._sipPhone.AGENT.unHold(2);
                shouldRet = true;
            }

            if (shouldRet)
            {
                return;
            }
        }


        var recLength1 = 0;
        var recLength2 = 0;

        if (SipPhone._sipPhone?.session1)
        {
            recLength1 = SipPhone._sipPhone.session1.sessionDescriptionHandler.peerConnection.getReceivers().length;
        }

        if (SipPhone._sipPhone?.session2)
        {
            recLength2 = SipPhone._sipPhone.session2.sessionDescriptionHandler.peerConnection.getReceivers().length;
        }

        //think in case of hold
        if (recLength1 <= 0 ||
            recLength2 <= 0)
        {
            Logger.AddToStatusLogList('Calls Merged| Agent ID:' + SipPhone._sipPhone?.AGENT.extension
                + '| recLength1: ' + recLength1 + " recLength2:" + recLength2);
            return false;
        }
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.dest = null;
          SipPhone._sipPhone.dest = SipPhone._sipPhone.audioCtx.createMediaStreamDestination();
        }
        //removing agent voice to session1
        var senders1 = SipPhone._sipPhone?.session1.sessionDescriptionHandler.peerConnection.getSenders();
        var track1Cp = senders1[0].track;

        //backup for split
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.splitTrack1 = null;
          SipPhone._sipPhone.splitTrack1 = senders1[0].track.clone();
        }

        //connecting agent voice to dest
        var st1 = new window.MediaStream();
        st1.addTrack(track1Cp);
        var src1 = SipPhone._sipPhone?.audioCtx.createMediaStreamSource(st1);
        src1.connect(SipPhone._sipPhone?.dest);

        //connection session2 voice to dest
        var rec2 = SipPhone._sipPhone?.session2.sessionDescriptionHandler.peerConnection.getReceivers();
        var track2Cp = rec2[0].track;
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.splitTrack2 = rec2[0].track.clone();
        }


        var st2 = new window.MediaStream();
        st2.addTrack(track2Cp);
        var src2 = SipPhone._sipPhone?.audioCtx.createMediaStreamSource(st2);

        src2.connect(SipPhone._sipPhone?.dest);

        //coneecting dest to session1
        senders1[0].replaceTrack(SipPhone._sipPhone?.dest.stream.getTracks()[0]);
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.dest2 = null
          SipPhone._sipPhone.dest2 = SipPhone._sipPhone.audioCtx.createMediaStreamDestination()
        }
        //removing agent voice from session2
        var senders2 = SipPhone._sipPhone?.session2.sessionDescriptionHandler.peerConnection.getSenders();
        var track22Cp = senders2[0].track;
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.senderTrack2 = senders2[0].track.clone();
        }
        //make copy of this track and then replace it when split

        //adding agent voice to dest2
        var st3 = new window.MediaStream();
        st3.addTrack(track22Cp);
        var src3 = SipPhone._sipPhone?.audioCtx.createMediaStreamSource(st3);

        src3.connect(SipPhone._sipPhone?.dest2);

        //adding session1 voice to dest2
        var rec1 = SipPhone._sipPhone?.session1.sessionDescriptionHandler.peerConnection.getReceivers();
        //var track11Cp = rec1[0].track.clone()
        var track11Cp = rec1[0].track;

        var st4 = new window.MediaStream();
        st4.addTrack(track11Cp);
        var src4 = SipPhone._sipPhone?.audioCtx.createMediaStreamSource(st4);

        src4.connect(SipPhone._sipPhone?.dest2);

        //adding dest2 to sessin2
        senders2[0].replaceTrack(SipPhone._sipPhone?.dest2.stream.getTracks()[0]);


        Logger.AddToStatusLogList('Calls Merged| Agent ID:' + SipPhone._sipPhone?.AGENT.extension
            + '| Line1 Hold:' + SipPhone._sipPhone?.AGENT.isHold(1) +
            '| Line2 Hold:' + SipPhone._sipPhone?.AGENT.isHold(2));

        return true;
    }

    /**
         * Event hadler for call tryig
         * @param response
         */
    public callTrying(response: any)
    {
        // InviteClientContext#receiveInviteResponse
        if (response.statusCode === 183 && response.body && this.hasOffer && !this.dialog)
        {
            if (!response.hasHeader('require') || response.getHeader('require').indexOf('100rel') === -1)
            {

                this.hasAnswer = true;
                this.status = 11

                SipPhone._sipPhone?.setupRemoteMedia(this);

                this.sessionDescriptionHandler
                    .setDescription(response.body, this.sessionDescriptionHandlerOptions, this.modifiers)

                //.setDescription(response.body)
                //.setDescription(response)
                /*.catch(function (reason)
                {
                    console.error("Errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
                    console.error(reason);

                    this.failed(response, C.causes.BAD_MEDIA_DESCRIPTION)
                    this.terminate({status_code: 488, reason_phrase: 'Bad Media Description'})
                });
                */


            }
        }
        SipPhone._sipPhone?.dialerService.updateEvent('ringing', []);

        // $(document).trigger('ringing', []);
        Logger.AddToStatusLogList('|Call Trying| Agent ID:' + SipPhone._sipPhone?.sipUser + '|Code:' + response.statusCode);

    }

    /**
     * WHen call is established
     * @param data
     */
    public inviteAnswered(data: any)
    {
        var session = this;

        Logger.AddToStatusLogList('|Call established| Agent ID:' + SipPhone._sipPhone?.sipUser + '|Code: ' + data.statusCode);
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.numDialing = false;
        }
        //if it is not change status answered packet
        if (SipPhone._sipPhone?.incomingSession)
        {
            //although it should not be. But as on WAN packets received late so, call can land while on wrapup or break.
            //so forecefully chaning its state to ready
            SipPhone._sipPhone.AGENT.currentStatus = "READY";
            SipPhone._sipPhone.AGENT.changeStatusInProgress = false;

            SipPhone._sipPhone.incomingSession = null;
        }

        //Moved into sip015.js at line 5666 line. Just accept it please
        // if ((SipPhone._sipPhone.AGENT.inManual || SipPhone._sipPhone.AGENT.inBusy || SipPhone._sipPhone.AGENT.inWrapup) && SipPhone._sipPhone.AGENT.changeStatusInProgress == false)
        {
            SipPhone._sipPhone?.AGENT.callConnected(data, session);
            //$(document).trigger('callConnected', [data, session]);
        }

        //Test it now
        SipPhone._sipPhone?.setupRemoteMedia(session);

    }

    /**
     *
     * @param request
     * @constructor
     */
    public inviteClosed(response: any, cause: any)
    {
        var tempSession = null;
        var sessionNum = 1;


        if (SipPhone._sipPhone?.session1 && this.id == SipPhone._sipPhone?.session1.id)
        {
            tempSession = SipPhone._sipPhone.session1;
            sessionNum = 1;
        }

        if (SipPhone._sipPhone?.session2 && this.id == SipPhone._sipPhone?.session2.id)
        {
            tempSession = SipPhone._sipPhone.session2;
            sessionNum = 2;
        }

        if (SipPhone._sipPhone?.incomingSession && this.id == SipPhone._sipPhone?.incomingSession.id)
        {
            tempSession = SipPhone._sipPhone.incomingSession;
            sessionNum = 0;
        }

        //although it should not happen but it happens some time so that is why it is in place
        //it means hangup packet is unknown to us i.e. hangup packet receive not due to any of our call - again it should not happen
        if (tempSession == null)
        {
            return;
        }

        var hangupCause = 16;
        var sessionUri = "UnDef";

        //although this variable should be set. But not sure. So placing this if condition
        if (tempSession.remoteIdentity
            && tempSession.remoteIdentity.uri
            && tempSession.remoteIdentity.uri.user)
        {
            sessionUri = tempSession.remoteIdentity.uri.user;
        }

        if (response)
        {
            hangupCause = response.getHeader('X-Asterisk-HangupCauseCode');
        }


        let callFailed = false;

        if (hangupCause != 16)
        {
            callFailed = true;
        }

        let text = '|Call Closed| Agent ID:' + SipPhone._sipPhone?.sipUser + '|Hanup Cause: ' + hangupCause + '|cause:' + cause + '|due to:' + sessionUri;

        if (response && response.statusCode == "488")
        {
            text += '|' + "Headphone Removed.";
        }

        Logger.AddToStatusLogList(text);

        if (response && response.statusCode == "488")
        {
            alert("Check your headphone and then relogin.");
            return;
        }

        //if agent is in call and hangup event has occur due to * dialing then ignore
        if (SipPhone._sipPhone?.AGENT.inCall && sessionUri.startsWith("*"))
        {
            Logger.AddToStatusLogList('|IGN Call Closed| Agent ID:' + SipPhone._sipPhone.sipUser + '|Hanup Cause: ' + hangupCause + '|cause:' + cause + '|due to:' + sessionUri + '|line: ' + sessionNum);
            return;
        }

        //due to unknown hangup packet if conditions are here
        if (SipPhone._sipPhone?.session1 && this.id == SipPhone._sipPhone?.session1.id)
        {
            SipPhone._sipPhone.session1 = null;
            sessionNum = 1;

            if (SipPhone._sipPhone.audioPlaying(SipPhone._sipPhone.remoteAudioElem))
            {
                SipPhone._sipPhone.remoteAudioElem.srcObject = null;
                SipPhone._sipPhone.remoteAudioElem.pause();
            }

            if (SipPhone._sipPhone.audioPlaying(SipPhone._sipPhone.remoteAudioElem2))
            {
                SipPhone._sipPhone.remoteAudioElem2.srcObject = null;
                SipPhone._sipPhone.remoteAudioElem2.pause();
            }
        }

        if (SipPhone._sipPhone?.session2 && this.id == SipPhone._sipPhone?.session2.id)
        {
            SipPhone._sipPhone.session2 = null;
            sessionNum = 2;

            if (SipPhone._sipPhone.audioPlaying(SipPhone._sipPhone.remoteAudioElem2))
            {
                SipPhone._sipPhone.remoteAudioElem2.srcObject = null;
                SipPhone._sipPhone.remoteAudioElem2.pause();
            }
        }

        if (SipPhone._sipPhone?.incomingSession && this.id == SipPhone._sipPhone?.incomingSession.id)
        {
            SipPhone._sipPhone.incomingSession = null;
            sessionNum = 0;

            if (SipPhone._sipPhone.audioPlaying(SipPhone._sipPhone.remoteAudioElem))
            {
                SipPhone._sipPhone.remoteAudioElem.srcObject = null;
                SipPhone._sipPhone.remoteAudioElem.pause();
            }

            if (SipPhone._sipPhone.audioPlaying(SipPhone._sipPhone.remoteAudioElem2))
            {
                SipPhone._sipPhone.remoteAudioElem2.srcObject = null;
                SipPhone._sipPhone.remoteAudioElem2.pause();
            }
        }

        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.numDialing = false;
          SipPhone._sipPhone.callBridged = false;
        }
        SipPhone._sipPhone?.AGENT.callCompleted(null, response, cause, sessionNum, callFailed);
    }

    public onDtmf(request: any, dtmf: { tone: any; })
    {

        if (SipPhone._sipPhone?.AGENT.passThroughDtmf)
        {
            if (SipPhone._sipPhone.session2)
            {
                SipPhone._sipPhone.session1.dtmf(dtmf.tone);

                Logger.AddToStatusLogList('|DTMF: *|Agent ID:' + SipPhone._sipPhone.sipUser);
            }
        }

    }



    public trackAdded(event: any)
    {
        if (SipPhone._sipPhone?.holdedSession)
        {
            Logger.AddToStatusLogList('| Session Unhold Adding track| Agent ID:' + SipPhone._sipPhone.AGENT.extension);

            var session = SipPhone._sipPhone.holdedSession;
            var pc = session.sessionDescriptionHandler.peerConnection;
            var remoteStream: any;


            pc.ontrack = SipPhone._sipPhone.trackAdded;

            if (pc.getReceivers)
            {
                if (pc.getReceivers().length <= 0)
                {
                    Logger.AddToStatusLogList('| EMPTY TRACK | Agent ID:' + SipPhone._sipPhone.AGENT.extension + '| Failed');
                    return;
                }
                remoteStream = new window.MediaStream();


                pc.getReceivers().forEach(function (receiver: any)
                {
                    var track = receiver.track;
                    if (track)
                    {
                        remoteStream.addTrack(track);
                    }
                });
            }
            else
            {
                remoteStream = pc.getRemoteStreams()[0];
            }


            if (SipPhone._sipPhone.session2 && session.id == SipPhone._sipPhone.session2.id)
            {
                SipPhone._sipPhone.remoteAudioElem2.srcObject = remoteStream;
                SipPhone._sipPhone.remoteAudioElem2.play();
            }
            else if (SipPhone._sipPhone.session1 && session.id == SipPhone._sipPhone.session1.id)
            {
                SipPhone._sipPhone.remoteAudioElem.srcObject = remoteStream;
                SipPhone._sipPhone.remoteAudioElem.play();
            }


            //if(SIPPHONE.plzBridge)
            if (SipPhone._sipPhone.callBridged)
            {

                if (SipPhone._sipPhone.bridgeCalls(true) == false)
                {
                    Logger.AddToStatusLogList('| Make conference | Agent ID:' + SipPhone._sipPhone.AGENT.extension + '| Failed');
                }
                else
                {
                    Logger.AddToStatusLogList('| Make conference| Agent ID:' + SipPhone._sipPhone.AGENT.extension + '| successed');
                }
            }

        }
        else
        {
            Logger.AddToStatusLogList('| Unknown track for session| Agent ID:' + SipPhone._sipPhone?.AGENT.extension);
        }
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.holdedSession = null;
        }
    }

    public setupRemoteMedia(session: any)
    {
        Logger.AddToStatusLogList('| setupRemoteMedia | Agent ID:' + SipPhone._sipPhone?.AGENT.extension);

        if (!session.sessionDescriptionHandler)
        {
            Logger.AddToStatusLogList('| handler na | Agent ID:' + SipPhone._sipPhone?.AGENT.extension);
            return;
        }

        // If there is a video track, it will attach the video and audio to the same element
        var pc = session.sessionDescriptionHandler.peerConnection;
        var remoteStream: any;

        pc.ontrack = SipPhone._sipPhone?.trackAdded;

        if (pc.getReceivers)
        {
            if (pc.getReceivers().length <= 0)
            {
                Logger.AddToStatusLogList('| EMPTY TRACK | Agent ID:' + SipPhone._sipPhone?.AGENT.extension + '| Failed');
                return;
            }

            remoteStream = new window.MediaStream();

            pc.getReceivers().forEach((receiver: any) =>
            {
                var track = receiver.track;
                if (track)
                {
                    remoteStream.addTrack(track);
                }
            });
        }
        else
        {
            remoteStream = pc.getRemoteStreams()[0];
        }

        //if(SIPPHONE.inConfDialing)
        if (SipPhone._sipPhone?.session2 && session.id == SipPhone._sipPhone?.session2.id)
        {
            SipPhone._sipPhone.remoteAudioElem2.srcObject = remoteStream;
            SipPhone._sipPhone.remoteAudioElem2.play();
            SipPhone._sipPhone.inConfDialing = false;

            //let senders2 = SipPhone._sipPhone.session2.sessionDescriptionHandler.peerConnection.getSenders();
            //senders2[0].replaceTrack(remoteStream.getTracks()[0]);
        }
        else if (SipPhone._sipPhone?.session1 && session.id == SipPhone._sipPhone?.session1.id)
        {
            SipPhone._sipPhone.remoteAudioElem.srcObject = remoteStream;
            SipPhone._sipPhone.remoteAudioElem.play();

            //let senders1 = SipPhone._sipPhone.session1.sessionDescriptionHandler.peerConnection.getSenders();
            //senders1[0].replaceTrack(remoteStream.getTracks()[0]);
        }

        if (SipPhone._sipPhone?.AGENT.confBridgeImediate)
        {
            SipPhone._sipPhone.AGENT.confBridgeImediate = false;
            SipPhone._sipPhone.AGENT.confStarted = true;
            SipPhone._sipPhone.bridgeCalls(false);
        }
    }

    /**
         * Takes an audio elem and return true if it is playing else false
         * @param {type} audioElem
         * @return {Boolean}
         */
    public audioPlaying(audioElem: any): boolean
    {
        return audioElem.currentTime > 0 && !audioElem.paused && !audioElem.ended && audioElem.readyState > 2;
    }

    public answerIncoming()
    {
        var session = SipPhone._sipPhone?.incomingSession;

        if (session && session.remoteIdentity)
        {
            var caller = session.remoteIdentity.uri.user;
            if(SipPhone._sipPhone != null){
              SipPhone._sipPhone.remoteAudioElem.autoplay = true;
            }

            session.accept({
                sessionDescriptionHandlerOptions: {
                    rtcConfiguration: {
                        iceServers: this.stunServers
                    },
                    constraints: {
                        audio: true, video: false
                    }
                }
            });



            session.on('progress', SipPhone._sipPhone?.callTrying);
            session.on('accepted', SipPhone._sipPhone?.inviteAnswered);
            // session.on('accepted_ack', SIPPHONE.inviteAnswered);
            session.on('dtmf', SipPhone._sipPhone?.onDtmf);
            if(SipPhone._sipPhone != null){
              SipPhone._sipPhone.session1 = session;
            }
            Logger.AddToStatusLogList('|Answered Call| Agent ID:' + SipPhone._sipPhone?.sipUser + '| Answer [' + caller + ']');

            SipPhone._sipPhone?.AGENT.callAnswered(session);

        }
        else
        {
            Logger.AddToStatusLogList('|IGN Answer Call (session empty)| Agent ID:' + SipPhone._sipPhone?.sipUser);
        }

    }


    /**
    *
    * @param session
    */
    public inviteIncoming(session: any)
    {
        let caller = session.remoteIdentity.uri.user;

        Logger.AddToStatusLogList('|Incoming call| Agent ID:' + SipPhone._sipPhone?.sipUser + '|From: ' + caller);
        if(SipPhone._sipPhone != null){
          SipPhone._sipPhone.incomingSession = session;
        }
        SipPhone._sipPhone?.incomingSession.on('terminated', SipPhone._sipPhone?.inviteClosed);

        if (SipPhone._sipPhone?.autoAnswer)
        {
            Logger.AddToStatusLogList('|Answered Call| Agent ID:' + SipPhone._sipPhone.sipUser + '| Auto Answer [' + caller + ']');
            SipPhone._sipPhone.answerIncoming();
        }
        else
        {
          SipPhone._sipPhone?.dialerService.updateEvent('incomingCall', [session]);
          // this.dialerService.updateEvent('incomingCall', [session]);
            // $(document).trigger('incomingCall', [session]);
        }
    }



    public endCall(session: any)
    {
        if (SipPhone._sipPhone?.incomingSession && session && session.id == SipPhone._sipPhone?.incomingSession.id)
        {
            SipPhone._sipPhone.incomingSession.reject();
            Logger.AddToStatusLogList('|Hang up| Agent ID:' + SipPhone._sipPhone.sipUser + '|Rejected');
        }
        else
        {
            let sessionNum = 1;

            if (SipPhone._sipPhone?.session2 && session && session.id == SipPhone._sipPhone?.session2.id)
            {
                sessionNum = 2;
            }

            if (session && session.endTime == null)
            {
                if (session.startTime == null)
                {
                    session.cancel();
                }
                else
                {

                    session.bye();
                }

                Logger.AddToStatusLogList('|Hang up| Agent ID:' + SipPhone._sipPhone?.sipUser + '|On Line:' + sessionNum);
            }
        }

    };


    public mute(sessionNum: number)
    {
        var session = SipPhone._sipPhone?.session1;

        if (sessionNum == 2)
        {
            session = SipPhone._sipPhone?.session2;
        }

        var pc = session.sessionDescriptionHandler.peerConnection;

        pc.getSenders().forEach(
            function (sender: any)
            {
                sender.track.enabled = false;
            }
        );

        session.isMute = true;
    }


    public unmute(sessionNum: number)
    {
        var session = SipPhone._sipPhone?.session1;

        if (sessionNum == 2)
        {
            session = SipPhone._sipPhone?.session2;
        }

        var pc = session.sessionDescriptionHandler.peerConnection;

        pc.getSenders().forEach(
            function (sender: any)
            {
                sender.track.enabled = true;
            }
        );

        session.isMute = false;
    }

    public isMute(sessionNum: number): boolean
    {
        var session = SipPhone._sipPhone?.session1;
        let ret: boolean = false;

        if (sessionNum == 2)
        {
            session = SipPhone._sipPhone?.session2;
        }

        if (session != null && session.isMute && session.isMute == true)
        {
            ret = true;
        }

        return ret;
    }


}
