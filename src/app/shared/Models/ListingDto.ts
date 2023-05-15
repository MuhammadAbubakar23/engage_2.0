export class ListingDto{
    id?:number=0;
    profileId?:number=0;
    platform ?: string="";
    profilePic ?: string="";
    userName ?: string="";
    unrespondedCount ?: number=0;
    message ?: string="";
    createdDate ?: Date= new Date();
    user ?: number=0;
    userId ?: number=0;
    url?:string="";
    postType?:string="";
  }