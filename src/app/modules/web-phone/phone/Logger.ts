import {Util} from "./Util";
import { PhoneDialerService } from '../services/DialerService/phone-dialer.service';
import { inject } from "@angular/core/testing";
import { HttpClient } from '@angular/common/http';
export class Logger {
  public static dialerService: PhoneDialerService;
    public static AddToStatusLogList(text: string) {
        text = Util.currentDate() + "|" + text;
        this.dialerService.updatePhoneLogs(text)
        // $("#phone_logs").append(text + "\n");
    }
    public static setDialerService(dialerService: PhoneDialerService){
        this.dialerService = dialerService;
    }
}
