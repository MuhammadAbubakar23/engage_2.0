export class ReplyDto {
  commentId: number = 0;
  teamId: number = 0;
  platform: string = '';
  contentType: string = '';
  text: string = '';
  to: string = '';
  cc: string = '';
  bcc: string = '';
  subject: string = '';
  profileId: string = '';
  profilePageId: string = '';
  userProfileId: number = 0;
  responseByName: string = "";
  instagramBusinessAccountId?: string = "";
  connectionId:string="";
}
