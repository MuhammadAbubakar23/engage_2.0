export class ManipulatedDMDto{
    type:string="";
    data:DMData=new DMData()
}
export class DMData {
    TotalCount: number=0;
    TotalQueryCount: number=0;
    List: List=new List();
}
  export class List {
    platform: string="";
    user: User=new User();
    profile: Profile=new Profile()
    dm: Dm[]=[]
  }
  
  export class User {
    id: number=0;
    userId: string="";
    userName: string="";
    profilePic: any
    isVerified: boolean=false
    followers_Count: any
    secondaryProfiles: any
  }
  
  export class Profile {
    profile_Id: string="";
    page_Id: any
    instagramBusinessAccountId: any
    clientAppName: string="";
    clientEmail: any
    channelId: any
  }
  
  export class Dm {
    id: number=0;
    msgId: string="";
    fromId: string="";
    fromName: string="";
    fromProfilePic: any
    toId: any
    toName: any
    msgText: string="";
    agentId: any
    queryStatus: string="";
    createdDate: string="";
    insertionDate: string="";
    ticketId: any
    customerSocailProfileId: number=0;
    contentType: string="";
    sentimentValue: string="";
    language: string="";
    redirectUrl: string="";
    followers_Count: number=0;
    isVerified: boolean=false
    replies: any[]=[]
    sentiment: Sentiment=new Sentiment()
    tags: any[]=[]
    attachments: Attachment[]=[]
    dispositions: any
  }
  
  export class Sentiment {
    platform: string="";
    name: string="";
    type: string="";
    feedId: number=0;
    createdBy: any
    createdByName: any
    wings: any
  }
  
  export class Attachment {
    mediaType: string="";
    name: any
    contentType: string="";
    attachmentUrl: string="";
    redirectUrl: any
  }
  