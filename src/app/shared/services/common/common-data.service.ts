import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
 resultData: any;
  CCMSURL = environment.CCMSURL;
  JomoAccessToken = environment.JomoAccessToken;
  CommonBaseUrl = environment.CommonBaseUrl;
  IdentityBaseUrl = environment.IdentityBaseUrl;
  tagsList = environment.links.common.TagsList;
  insertTags = environment.links.common.InsertTags;
  removeTags = environment.links.common.RemoveTags;
  insertSentiments = environment.links.common.InsertSentiments;
  commentRespond = environment.links.common.CommentRespond;
  markAsComplete = environment.links.common.MarkAsComplete;
  likedByAdmin = environment.links.common.LikedByAdmin;
  quickReplyList = environment.links.common.QuickReplyList;
  assignQuerry = environment.links.common.AssignQuerry;
  agentsTeamList = environment.links.common.AgentsTeamList;
  assignToAnotherAgent = environment.links.common.AssignToAnotherAgent;
  slaList= environment.links.common.SlaList;
  slaDetail = environment.links.common.SlaDetail;
  slaDM = environment.links.common.SlaDM;
  mainChannelList = environment.links.common.ChannelList;
  conversationDetail = environment.links.common.ConversationDetail;
  messageDetail = environment.links.common.MessageDetail;
  replyComment = environment.links.common.ReplyComment;
  humanAgentTags = environment.links.common.HumanAgentTags;
  agentDetail = environment.links.common.AgentDetail;
  updateBreak = environment.links.common.UpdateBreak;
  instaStats = environment.links.common.InstaStats;
  fbPostStats = environment.links.common.FbPostStats;
  fbCommentStats = environment.links.common.FbCommentStats;
  youtubePostStats = environment.links.common.YoutubePostStats;
  twitterTweetStats = environment.links.common.TwitterTweetStats;
  linkedInPostStats = environment.links.common.LinkedInPostStats;
  menu = environment.links.common.Menu;
  queryCompleted = environment.links.common.queryCompleted;
  profileDetails = environment.links.common.profileDetails;
  updateProfile = environment.links.common.updateProfile;
  reason_types = environment.links.CCMS.reason_types;
  getTicketStatuses = environment.links.CCMS.GetTicketStatuses;
  reasons = environment.links.CCMS.reasons;
  subReasons = environment.links.CCMS.subReasons;
  createTicket = environment.links.common.createTicket;
  allChannelsUnrespondedCounts = environment.links.common.allChannelsUnrespondedCounts;
  getOrderByCustomerEmailAddressOrPhoneNumber = environment.links.common.getOrderByCustomerEmailAddressOrPhoneNumber;
  saveAsCompleted = environment.links.common.SaveAsCompleted;
  dispositionHistory = environment.links.common.dispositionHistory;
  markAllAsRead = environment.links.common.markAllAsRead;
  getAgentReport = environment.links.common.getAgentReport;
  getAllocatedProfiles = environment.links.common.getAllocatedProfiles;

  constructor(private http : HttpClient) { }


  GetTagsList(){
    return this.http.get(this.CommonBaseUrl+this.tagsList)
  }

  InsertTag(form:any){
    
    return this.http.post(this.CommonBaseUrl+this.insertTags, form)
  }

  RemoveTag(form:any){
     
    return this.http.post(this.CommonBaseUrl+this.removeTags, form)
  }

  InsertSentiment(form:any){
     
    return this.http.post(this.CommonBaseUrl+this.insertSentiments, form)
  }

  MarkAsComplete(data:any){
    
    return this.http.post(this.CommonBaseUrl+this.markAsComplete,data)
  }

  QuickReplyList(){
     
    return this.http.get(this.CommonBaseUrl+this.quickReplyList)
  }

  CommentRespond(form:any){
    return this.http.post(this.CommonBaseUrl+this.commentRespond, form)
  }

  QueryCompleted(form:any){
    return this.http.post(this.CommonBaseUrl+this.queryCompleted, form)
  }

  LikedByAdmin(form:any){
    
   // const url = (this.CommonBaseUrl+this.likedByAdmin+form)
    return this.http.post(this.CommonBaseUrl+this.likedByAdmin,form)
  }
  
  AssignQuerry(data:any){
    
    return this.http.post(this.CommonBaseUrl+this.assignQuerry,data)
  }

  GetAgentsTeamList(){
    return this.http.get(this.CommonBaseUrl+this.agentsTeamList)
  }

  AssignToAnotherAgent(data:any){
    return this.http.post(this.CommonBaseUrl+this.assignToAnotherAgent,data)
  }

  GetSlaList(data:any){
    return this.http.post(this.CommonBaseUrl+this.slaList,data)
  }
  GetSlaDetail(data:any){
    
    return this.http.post(this.CommonBaseUrl+this.slaDetail,data)
  }
  GetSlaDM(data:any){
    
    return this.http.post(this.CommonBaseUrl+this.slaDM,data)
  }

  GetConversationList(data:any){
    return this.http.post(this.CommonBaseUrl+this.mainChannelList,data)
  }

  GetChannelConversationDetail(data:any){
    
    return this.http.post(this.CommonBaseUrl + this.conversationDetail, data)
  }

  GetChannelMessageDetail(data:any){
    return this.http.post(this.CommonBaseUrl+this.messageDetail,data)
  }
  ReplyComment(formData:any){
    
    return this.http.post(this.CommonBaseUrl+this.replyComment,formData)
  }
  
  GetHumanAgentTag(){
    return this.http.get(this.CommonBaseUrl+this.humanAgentTags)
  }
  GetAgentById(agentId:any){
    const url = (this.CommonBaseUrl+this.agentDetail+"?UserId="+agentId)
    return this.http.get(url)
  }
  UpdateBreak(status:any){
    
    const url = (this.CommonBaseUrl+this.updateBreak+"?Status="+status)
    return this.http.get(url)
  }
  GetFbPostStats(pageId:any, postId:any){
    return this.http.post(this.CommonBaseUrl+this.fbPostStats+"?PageId="+pageId+"&postId="+postId, null)
  }

  GetFbCommentStats(pageId:any, commentId:any){
    return this.http.post(this.CommonBaseUrl+this.fbCommentStats+"?PageId="+pageId+"&CommentId="+commentId, null)
  }
  GetInstaPostStats(pageId:any, postId:any){
    
    const url = (this.CommonBaseUrl+this.instaStats+"?PageId="+pageId+"&postId="+postId)
    return this.http.get(url)
  }
  GetYoutubePostStats(postId:any){
    
    const url = (this.CommonBaseUrl+this.youtubePostStats+"?PostId="+postId)
    return this.http.get(url)
  }
  GetTwitterTweetStats(profileId:any, tweetId:any){
    
    return this.http.get(this.CommonBaseUrl+this.twitterTweetStats+"?ProfileExternalId="+profileId+"&TweetId="+tweetId)
  }
  GetLinkedInPostStats(postId:any){
    
    return this.http.get(this.CommonBaseUrl+this.linkedInPostStats+"?PostId="+postId)
  }
  GetMenu(type:any, body:any){
    
    return this.http.post(this.IdentityBaseUrl+this.menu+type,body)
  }
  GetProfileDetails(id:any){
    
    return this.http.get(this.CommonBaseUrl+this.profileDetails+'?CustomerId='+id)
  }
  UpdateProfileDetails(form:any){
    
    return this.http.post(this.CommonBaseUrl+this.updateProfile,form)
  }
// 1
  GetReasonTypes() {
    return this.http.get(this.CommonBaseUrl + this.reason_types);
  }
  GetMainReasons(type: string) {
    
    const url = (this.CommonBaseUrl+this.reasons+type)
    return this.http.get(this.CommonBaseUrl+this.reasons+type)
  }
 GetSubReasons(reasonId: number){
  return this.http.get(this.CommonBaseUrl+this.subReasons+reasonId)
 }

 GetTicketStatuses(){
  return this.http.get(this.CommonBaseUrl+this.getTicketStatuses)
 }

 GetOrderByCustomerEmailAddressOrPhoneNumber(form:any){
  
  return this.http.post(this.CommonBaseUrl+ this.getOrderByCustomerEmailAddressOrPhoneNumber, form)
 }

 CreateTicket(form:any){
  
  return this.http.post(this.CommonBaseUrl + this.createTicket, form)
 }

 GetAllChannelsUnrespondedCount() {
  return this.http.get(this.CommonBaseUrl+this.allChannelsUnrespondedCounts)
 }

 SubmitDispositionForm(form:any){
  return this.http.post(this.CommonBaseUrl+this.saveAsCompleted,form)
 }

 GetDispositionHistory(body:any){
  
  return this.http.post(this.CommonBaseUrl + this.dispositionHistory, body)
 }
 MarkAllAsRead(profileId:any){
  return this.http.get(this.CommonBaseUrl+this.markAllAsRead+'?CustomerProfileId='+profileId)
 }

 GetAgentReport(body:any){
  
  return this.http.post(this.CommonBaseUrl+this.getAgentReport,body, { responseType: 'text' })
 }

 GetAllocatedProfiles(){
  return this.http.get(this.CommonBaseUrl+this.getAllocatedProfiles)
 }

}

var headers_object = new HttpHeaders({
  'Content-Type' : 'multipart/form-data'
});
const httpOptions = {
  headers: headers_object
};
