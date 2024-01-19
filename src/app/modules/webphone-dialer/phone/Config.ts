import { PhoneTypes } from "./PhoneTypes";
import { PhoneDialerService } from '../services/DialerService/phone-dialer.service';

export class Config
{
    public sipWs!: string;
    public sipHost!: string;
    public sipUser!: string;
    public sipPass!: string;
    public autoAnswer!: boolean;
    public sipTrace!: boolean;
    public sipDomain!: string;
    public extension!: string;
    public amsPass!: string;
    public loginType!:string;
    //AMS WS COnfig
    public AMS_WS_URL!: string;
    private stunServers: Array<object> = [];
    public dialerService!: PhoneDialerService;
    //phone type
    public phoneType!: PhoneTypes;

    public addStunServer(serverIp: string, port: number)
    {
        this.stunServers.push(
            { urls: "stun:" + serverIp + ":" + port }
        );
    }

    public getStunServers()
    {
        return this.stunServers;
    }

    public getDialerService(){
      return this.dialerService;
    }

}
