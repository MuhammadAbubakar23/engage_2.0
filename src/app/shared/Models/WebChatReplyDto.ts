export class WebChatReplyDto{
    id: number=0;
    wcVisitorId: number=0;
    wcVisitorSessionId: number=0;
    replyMessage: string="";
    replyDate: Date = new Date();
    isMediaMessage: boolean= true;
    mediaType: string="";
    loggedInUserId: number=0;
    loggedInUserName: string="";
}