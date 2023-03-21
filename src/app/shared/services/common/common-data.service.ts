import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

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
  menu = environment.links.common.Menu;


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

  LikedByAdmin(comId:any, isLiked:boolean){
    const url = (this.CommonBaseUrl+this.likedByAdmin+"?CommentId="+comId+"&IsLiked="+isLiked)
    return this.http.get(url)
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
  UpdateBreak(status:any, userId:any){
    
    const url = (this.CommonBaseUrl+this.updateBreak+"?Status="+status+"&UserId="+userId)
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
  GetMenu(type:any, body:any){
    
    return this.http.put(this.IdentityBaseUrl+this.menu+type,body)
  }
}
var headers_object = new HttpHeaders({
  'Content-Type' : 'multipart/form-data'
});
const httpOptions = {
  headers: headers_object
};
