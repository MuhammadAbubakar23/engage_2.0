export class conversationDetailDto {
  TotalCount: number = 0;
  List: listDto = new listDto();
}
export class listDto {
  platform: string = '';
  company: companyDto = new companyDto();
  user: userDto = new userDto();
  post: postDto = new postDto();
  comments: commentsDto = new commentsDto();
}
export class companyDto {
  id: number = 0;
  name: string = '';
}
export class userDto {
  userId: string = '';
  userName: string = '';
  profilePic: string = '';
}
export class attachmentsDto {
  mediaType: string = '';
  description: string = '';
  attachmentUrl: string = '';
}
export class profileDto {
  profile_Id: string = '';
  page_Id: string = '';
  page_Name: string = '';
}
export class postDto {
  id: number = 0;
  postId: string = '';
  caption: string = '';
  isLikedByAdmin: boolean = false;
  createdDate: string = '';
  attachments: attachmentsDto = new attachmentsDto();
  profile: profileDto = new profileDto();
  postStats : postStatsDto = new postStatsDto();
}
export class postStatsDto {
  likes: number = 0;
  comments: number = 0;
  shares: number = 0;
  reactioinsLIst: reactioinsListDto = new reactioinsListDto();
}
export class reactioinsListDto {
  like: number = 0;
  love: number = 0;
  wow: number = 0;
  haha: number = 0;
  sorry: number = 0;
  anger: number = 0;
  sad: number = 0;
  thankful: number = 0;
  pride: number = 0;
  cARE: number = 0;
  totalReactionsDateValue: string = '';
}
export class repliesDto {}
export class tagsDto {}
// export class commentsDto {
//   id?: number = 0;
//   postId?: string = '';
//   commentId?: string = '';
//   message?: string = '';
//   contentType?: string = '';
//   userName?: string = '';
//   queryStatus?: string = '';
//   createdDate?: string = '';
//   fromUserProfilePic?: string = '';
//   body?: string = '';
//   to?: string = '';
//   cc?: string = '';
//   bcc?: string = '';
//   isLikedByAdmin?: boolean = false;
//   attachments?: string = '';
//   replies?: repliesDto = [];
//   sentiment?: string = '';
//   tags?: tagsDto = [];
// }
export class commentsDto {
  id: number=0;
  wings?: string="";
  postId?: string="";
  commentId?: string="";
  message?: string="";
  contentType?: string="";
  userName?: string="";
  queryStatus?: string="";
  createdDate?: string="";
  insertionDate?: string="";
  ticketId?: number=0;
  fromUserProfilePic?: string="";
  body?: string="";
  sentimentValue?: string="";
  language?: string="";
  isHide?: boolean=false;
  isLikedByAdmin?: boolean=false;
  channelId?: any
  conversationId?: any
  attachmentUrl?: any
  attachmentType?: any
  sendTo?: string="";
  unrespondedCount?: number=0;
  attachments?: any[]=[]
  replies?: any[]=[]
  sentiment?: Sentiment = new Sentiment();
  tags?: any[]=[]
  to?: string="";
  cc?: string="";
  bcc?: string="";
  dispositions?: any
  signalRGroupName?: any
}
export class Sentiment {
  platform: string="";
  name: string="";
  type: string="";
  feedId: number=0;
  createdBy: any
  createdByName: any
  wings: string="";
}
export class messagesDto {
  id: number = 0;
  msgId?: string = '';
  fromId?: string = '';
  fromName?: string = '';
  fromProfilePic?: string = '';
  toId?: string = '';
  toName?: string = '';
  msgText?: string = '';
  agentId?: string = '';
  queryStatus?: string = '';
  createdDate?: string = '';
  customerSocailProfileId ?: number = 0;
  profileId?: string = '';
  profilePageId?: string = '';
  contentType?: string = '';
  attachments?: string = '';
  replies?: repliesDto = new repliesDto();
  sentiment?: string = '';
  tags?: tagsDto = new tagsDto();
  wings:string='';
  signalRGroupName:string='';
  skillSlug:string='';
}
// for new post
export class newpostcommentDto{
  id: number = 0;
  postId?: string = '';
  commentId?: string = '';
  message?: string = '';
  contentType?: string = '';
  userName?: string = '';
  queryStatus?: string = '';
  createdDate?: string = '';
  fromUserProfilePic?: string = '';
  body?: string = '';
  to?: string = '';
  cc?: string = '';
  bcc?: string = '';
  isLikedByAdmin?: boolean = false;
  attachments?: string = '';
  replies?: repliesDto = [];
  sentiment?: string = '';
  tags?: tagsDto = [];
}