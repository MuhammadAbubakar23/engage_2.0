export class SmsReplyDto {
    
    id: number= 0;
    smsId:number= 0;
    from: string="";
    to: string="";
    dateTimeSent: Date = new Date() ;
    message: string="";
    messageType: number=0;
    clientId: string="";
    statusId: number=0;
    errorCode: number=0;
    errorMessage: string="";
    uniqueId: string="";
    userId: number=0;
    botMessage: boolean = true;
}