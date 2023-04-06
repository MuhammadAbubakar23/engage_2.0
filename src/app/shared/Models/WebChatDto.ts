export class WebChatDto{
    chatId: number=0;
    fromId: number=2;
    fromName: string="";
    type: string="";
    message: string="";
    createdDate: Date = new Date();
}