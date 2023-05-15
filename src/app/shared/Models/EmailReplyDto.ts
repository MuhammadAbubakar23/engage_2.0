export class EmailReplyDto {
    replyProfileId: string="";
    replyProfileType: string="";
    id: number=0;
    emailId: number=0;
    to: string="";
    from: string="";
    cc: string="";
    bcc: string="";
    body: string="";
    subject: string="";
    dateTimeSent: string="";
    statusId: number=0;
    isResend: boolean=false;
    isReminderSet: boolean=false;
    displayCc: string="";
    displayTo: string="";
    hasAttachments: boolean=false;
    uniqueId: string="";
    changeKey: string="";
    isHtml: boolean=false;
    userId: number=0;
    emailSignature: string="";
    emailImage: string="";
    isGsuiteEnable: string="";
    type: string="";
    name: string="";
    data: string="";
    comment : Comment=new Comment()


}

export class Comment{
    id:string="";
}