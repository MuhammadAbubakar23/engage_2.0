import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
  // for testing purpose
  // consoleBaseUrl = environment.consoleBaseUrl;
  consoleBaseUrl = "";

  resultData: any;
  // CCMSURL = environment.CCMSURL;
  CCMSURL = "";
  // JomoAccessToken = environment.JomoAccessToken;
  JomoAccessToken = "";
  CommonBaseUrl = environment.CommonBaseUrl;
  IdentityBaseUrl = environment.IdentityBaseUrl;
  FacebookBaseUrl = environment.FbBaseUrl;
  InstagramBaseUrl = environment.InstaBaseUrl;

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
  slaList = environment.links.common.SlaList;
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
  allChannelsUnrespondedCounts =
    environment.links.common.allChannelsUnrespondedCounts;
  getOrderByCustomerEmailAddressOrPhoneNumber =
    environment.links.common.getOrderByCustomerEmailAddressOrPhoneNumber;
  saveAsCompleted = environment.links.common.SaveAsCompleted;
  dispositionHistory = environment.links.common.dispositionHistory;
  markAllAsRead = environment.links.common.markAllAsRead;
  getAgentReport = environment.links.common.getAgentReport;
  getAllocatedProfiles = environment.links.common.getAllocatedProfiles;
  // createMessageTemplate = environment.links.console.CreateMessageTemplate;
  repliesList = environment.links.common.repliesList;
  signOut = environment.links.common.signOut;
  getCustomers = environment.links.common.getCustomers;
  updateStatus = environment.links.common.updateStatus;

  // for testing purpose
  getAllMessages = environment.links.console.getAllMessages;
  addTemplate = environment.links.console.addTemplate;
  updateTemplate = environment.links.console.updateTemplate;
  deleteMessages = environment.links.console.deleteMessages;
  getQuickReply = environment.links.console.getQuickReply;
  addQuickReply = environment.links.console.addQuickReply;
  updateQuickReply = environment.links.console.updateQuickReply;
  deleteQuickReply = environment.links.console.deleteQuickReply;
  getSlaPolicy = environment.links.console.getSlaPolicy;
  addSlaPolicy = environment.links.console.addSlaPolicy;
  updateSlaPolicy = environment.links.console.updateSlaPolicy;
  getPolicyById = environment.links.console.getPolicyById;
  deleteSlaPolicy = environment.links.console.deleteSlaPolicy;
  getOperationalHours = environment.links.console.getOperationalHours;
  getBusinessHours = environment.links.console.getBusinessHours;
  addBusinessHours = environment.links.console.addBusinessHours;
  deleteBusinessHours = environment.links.console.deleteBusinessHours;
  updateBusinessHours = environment.links.console.updateBusinessHours;
  getBusinessById = environment.links.console.getBusinessById;
  getEntractRoute = environment.links.console.getEntractRoute;
  addEntractRoute = environment.links.console.addEntractRoute;
  updateEntractRoute = environment.links.console.updateEntractRoute;
  deleteEntractRoute = environment.links.console.deleteEntractRoute;
  getSkills = environment.links.console.getSkills;
  addSkill = environment.links.console.addSkill;
  deleteSkill = environment.links.console.deleteSkill;
  getAllProfile = environment.links.console.getAllProfile;
  addProfile = environment.links.console.addProfile;
  attachFacebookPage = environment.links.console.attachFacebookPage;
  getTags = environment.links.console.getTags;
  getTagById = environment.links.console.getTagById;
  addTags = environment.links.console.addTags;
  updateTag = environment.links.console.updateTag;
  deleteTags = environment.links.console.deleteTags;
  getParents = environment.links.console.getParents;
  // rules
  deleteRules = environment.links.console.deleteRules
  getAllRules = environment.links.console.getAllRules;
  getRuleById = environment.links.console.getRuleById
  addRules = environment.links.console.addRules
  updateRules = environment.links.console.updateRules
  getEntitiesRule = environment.links.console.getEntitiesRule
  getRuleEntityProperties = environment.links.console.getRuleEntityProperties

  getChannels = environment.links.identity.channels;
  deleteRoles = environment.links.identity.deleteRoles
  constructor(private http: HttpClient) { }

  GetTagsList() {
    return this.http.get(this.CommonBaseUrl + this.tagsList);
  }

  InsertTag(form: any) {
    return this.http.post(this.CommonBaseUrl + this.insertTags, form);
  }

  RemoveTag(form: any) {
    return this.http.post(this.CommonBaseUrl + this.removeTags, form);
  }

  InsertSentiment(form: any) {
    return this.http.post(this.CommonBaseUrl + this.insertSentiments, form);
  }

  MarkAsComplete(data: any) {
    return this.http.post(this.CommonBaseUrl + this.markAsComplete, data);
  }

  QuickReplyList() {
    return this.http.get(this.CommonBaseUrl + this.quickReplyList);
  }

  CommentRespond(form: any) {
    return this.http.post(this.CommonBaseUrl + this.commentRespond, form);
  }

  QueryCompleted(form: any) {
    return this.http.post(this.CommonBaseUrl + this.queryCompleted, form);
  }

  LikedByAdmin(form: any) {
    return this.http.post(this.CommonBaseUrl + this.likedByAdmin, form);
  }

  AssignQuerry(data: any) {
    return this.http.post(this.CommonBaseUrl + this.assignQuerry, data);
  }

  GetAgentsTeamList() {
    return this.http.get(this.CommonBaseUrl + this.agentsTeamList);
  }

  AssignToAnotherAgent(data: any) {
    return this.http.post(this.CommonBaseUrl + this.assignToAnotherAgent, data);
  }

  GetSlaList(data: any) {
    return this.http.post(this.CommonBaseUrl + this.slaList, data);
  }
  GetSlaDetail(data: any) {
    return this.http.post(this.CommonBaseUrl + this.slaDetail, data);
  }
  GetSlaDM(data: any) {
    return this.http.post(this.CommonBaseUrl + this.slaDM, data);
  }

  GetConversationList(data: any) {
    return this.http.post(this.CommonBaseUrl + this.mainChannelList, data);
  }

  GetRepliesList(data: any) {
    return this.http.post(this.CommonBaseUrl + this.repliesList, data);
  }

  GetChannelConversationDetail(data: any) {
    return this.http.post(this.CommonBaseUrl + this.conversationDetail, data);
  }

  GetChannelMessageDetail(data: any) {
    return this.http.post(this.CommonBaseUrl + this.messageDetail, data);
  }
  ReplyComment(formData: any) {
    return this.http.post(this.CommonBaseUrl + this.replyComment, formData);
  }

  GetHumanAgentTag() {
    return this.http.get(this.CommonBaseUrl + this.humanAgentTags);
  }
  GetAgentById(agentId: any) {
    const url = this.CommonBaseUrl + this.agentDetail + '?UserId=' + agentId;
    return this.http.get(url);
  }
  UpdateBreak(status: any) {
    const url = this.CommonBaseUrl + this.updateBreak + '?Status=' + status;
    return this.http.get(url);
  }
  GetFbPostStats(pageId: any, postId: any) {
    return this.http.post(
      this.CommonBaseUrl +
      this.fbPostStats +
      '?PageId=' +
      pageId +
      '&postId=' +
      postId,
      null
    );
  }

  GetFbCommentStats(pageId: any, commentId: any) {
    return this.http.post(
      this.CommonBaseUrl +
      this.fbCommentStats +
      '?PageId=' +
      pageId +
      '&CommentId=' +
      commentId,
      null
    );
  }
  GetInstaPostStats(pageId: any, postId: any) {
    const url =
      this.CommonBaseUrl +
      this.instaStats +
      '?PageId=' +
      pageId +
      '&postId=' +
      postId;
    return this.http.get(url);
  }
  GetYoutubePostStats(postId: any) {
    const url =
      this.CommonBaseUrl + this.youtubePostStats + '?PostId=' + postId;
    return this.http.get(url);
  }
  GetTwitterTweetStats(profileId: any, tweetId: any) {
    return this.http.get(
      this.CommonBaseUrl +
      this.twitterTweetStats +
      '?ProfileExternalId=' +
      profileId +
      '&TweetId=' +
      tweetId
    );
  }
  GetLinkedInPostStats(postId: any) {
    return this.http.get(
      this.CommonBaseUrl + this.linkedInPostStats + '?PostId=' + postId
    );
  }
  GetMenu(type: any, body: any) {
    return this.http.post(this.IdentityBaseUrl + this.menu + type, body);
  }
  GetProfileDetails(id: any) {
    return this.http.get(
      this.CommonBaseUrl + this.profileDetails + '?CustomerId=' + id
    );
  }
  UpdateProfileDetails(form: any) {
    return this.http.post(this.CommonBaseUrl + this.updateProfile, form);
  }
  // 1
  GetReasonTypes() {
    return this.http.get(this.CommonBaseUrl + this.reason_types);
  }
  GetMainReasons(type: string) {
    const url = this.CommonBaseUrl + this.reasons + type;
    return this.http.get(this.CommonBaseUrl + this.reasons + type);
  }
  GetSubReasons(reasonId: number) {
    return this.http.get(this.CommonBaseUrl + this.subReasons + reasonId);
  }

  GetTicketStatuses() {
    return this.http.get(this.CommonBaseUrl + this.getTicketStatuses);
  }

  GetOrderByCustomerEmailAddressOrPhoneNumber(form: any) {
    return this.http.post(
      this.CommonBaseUrl + this.getOrderByCustomerEmailAddressOrPhoneNumber,
      form
    );
  }

  CreateTicket(form: any) {
    return this.http.post(this.CommonBaseUrl + this.createTicket, form);
  }

  GetAllChannelsUnrespondedCount() {
    return this.http.get(
      this.CommonBaseUrl + this.allChannelsUnrespondedCounts
    );
  }

  SubmitDispositionForm(form: any) {
    return this.http.post(this.CommonBaseUrl + this.saveAsCompleted, form);
  }

  GetDispositionHistory(body: any) {
    return this.http.post(this.CommonBaseUrl + this.dispositionHistory, body);
  }
  MarkAllAsRead(body: any) {
    return this.http.post(this.CommonBaseUrl + this.markAllAsRead, body);
  }

  GetAgentReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getAgentReport, body, {
      responseType: 'text',
    });
  }

  GetAllocatedProfiles() {
    return this.http.get(this.CommonBaseUrl + this.getAllocatedProfiles);
  }

  // CreateMessageTemplate(body: any) {
  //   return this.http.post(this.CommonBaseUrl + this.createMessageTemplate, body);
  // }

  // CreateSlaPolicy(body: any) {
  //   return this.http.post('https://10.111.32.97:45458/api/SLAPolicies/Add', body);
  // }

  GetAllMessages(templates: any) {
    return this.http.get(
      this.consoleBaseUrl + this.getAllMessages + '?templateType=' + templates
    );
  }
  Addtemplate(addData: any) {
    return this.http.post(this.consoleBaseUrl + this.addTemplate, addData);
  }
  UpdateTemplate(templateId: string, template: any) {
    const url = `${this.consoleBaseUrl}${this.updateTemplate}?Id=${templateId}`;
    return this.http.post(url, template);
  }
  DeleteMessage(deleteId: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteMessages}?Id=${deleteId}`;
    return this.http.get(url);
  }
  GetQuickReply() {
    return this.http.get(this.consoleBaseUrl + this.getQuickReply);
  }
  AddQuickReply(add: any) {
    return this.http.post(this.consoleBaseUrl + this.addQuickReply, add);
  }
  UpdateQuickReply(quickId: string, quick: any) {
    const url = `${this.consoleBaseUrl}${this.updateQuickReply}?Id=${quickId}`;
    return this.http.post(url, quick);
  }
  DeleteQuickReply(deleteId: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteQuickReply}?Id=${deleteId}`;
    return this.http.get(url);
  }
  GetSlaPolicy() {
    return this.http.get(this.consoleBaseUrl + this.getSlaPolicy);
  }
  AddSlaPolicy(addSla: any) {
    return this.http.post(this.consoleBaseUrl + this.addSlaPolicy, addSla);
  }
  UpdateSlaPolicy(slaId: string, sla: any) {
    const url = `${this.consoleBaseUrl}${this.updateSlaPolicy}?Id=${slaId}`;
    return this.http.post(url, sla);
  }
  GetPolicyById(policyid: string) {
    const url = `${this.consoleBaseUrl}${this.getPolicyById}?Id=${policyid}`;
    return this.http.get(url);
  }
  DeleteSlaPolicy(deleteSla: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteSlaPolicy}?Id=${deleteSla}`;
    return this.http.get(url);
  }
  GetOperationalHours() {
    return this.http.get(this.consoleBaseUrl + this.getOperationalHours);
  }
  GetBusinessHours() {
    return this.http.get(this.consoleBaseUrl + this.getBusinessHours)
  }
  AddBusinessHours(addHours: any) {
    return this.http.post(this.consoleBaseUrl + this.addBusinessHours, addHours)
  }
  DeleteBusinessHours(delHours: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteBusinessHours}?Id=${delHours}`;
    return this.http.get(url);
  }
  UpdateBusinessHours(hoursId: string, bueiness: any) {
    const url = `${this.consoleBaseUrl}${this.updateBusinessHours}?Id=${hoursId}`;
    return this.http.post(url, bueiness);
  }
  GetBusinessById(BusinessId: string) {
    const url = `${this.consoleBaseUrl}${this.getBusinessById}?Id=${BusinessId}`;
    return this.http.get(url);
  }
  GetEntractRoute() {
    return this.http.get(this.consoleBaseUrl + this.getEntractRoute)
  }
  AddEntractRoute(addRoute: any) {
    return this.http.post(this.consoleBaseUrl + this.addEntractRoute, addRoute)
  }
  UpdateEntractRoute(RouteId: any, entract: any) {
    const url = `${this.consoleBaseUrl}${this.updateEntractRoute}?Id=${RouteId}`;
    return this.http.post(url, entract);
  }
  DeleteEntractRoute(delRoute: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteEntractRoute}?Id=${delRoute}`;
    return this.http.get(url);
  }
  GetSkill() {
    return this.http.get(this.consoleBaseUrl + this.getSkills)
  }
  AddSkill(addSkill: any) {
    return this.http.post(this.consoleBaseUrl + this.addSkill, addSkill)
  }
  DeleteSkill(delSkill: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteSkill}?Id=${delSkill}`;
    return this.http.get(url);
  }

  GetAllProfile() {
    return this.http.get(this.consoleBaseUrl + this.getAllProfile)
  }
  AddProfile(addProfile: any) {

    return this.http.post(this.consoleBaseUrl + this.addProfile, addProfile)
  }
  AttachFacebookPage(body:any){
    return this.http.post(this.InstagramBaseUrl + this.attachFacebookPage, body)
  }

  SignOut() {
    return this.http.get(this.CommonBaseUrl + this.signOut)
  }

  GetTags() {
    return this.http.get(this.consoleBaseUrl + this.getTags);
  }
  GetTagById(body: any) {
    const url = `${this.consoleBaseUrl}${this.getTagById}`;
    return this.http.post(url, body);
  }
  AddTags(addTags: any) {
    return this.http.post(this.consoleBaseUrl + this.addTags, addTags)
  }
  UpdateTag(tagsId: string, tag: any) {
    const url = `${this.consoleBaseUrl}${this.updateTag}?Id=${tagsId}`;
    return this.http.post(url, tag);
  }
  DeleteTags(delTag: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteTags}?Id=${delTag}`;
    return this.http.get(url);
  }
  DeleteRoles(delRolId: any) {
    const url = `${this.IdentityBaseUrl}${this.deleteRoles}`;
    return this.http.post(url, delRolId);
  }

  GetParents() {
    return this.http.get(this.consoleBaseUrl + this.getParents);
  }

  // rules

  GetAllRules() {
    return this.http.get(this.consoleBaseUrl + this.getAllRules)
  }
  GetRuleById() {
    return this.http.get(this.consoleBaseUrl + this.getRuleById)
  }
  AddRules(addrule: any) {
    return this.http.post(this.consoleBaseUrl + this.addRules, addrule)
  }
  UpdateRules(ruleId: string, rule: any) {
    const url = `${this.consoleBaseUrl}${this.updateRules}?Id=${ruleId}`;
    return this.http.post(url, rule);
  }
  DeleteRules(delRules: any) {
    const url = `${this.consoleBaseUrl}${this.deleteRules}?Id=${delRules}`;
    return this.http.get(url);
  }
  GetEntitiesRule() {
    return this.http.get(this.consoleBaseUrl + this.getEntitiesRule);

  }
  GetRuleEntityProperties() {
    return this.http.get(this.consoleBaseUrl + this.getRuleEntityProperties);

  }

  GetCustomers(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getCustomers, body);
  }

  GetChannels() {
    return this.http.get(this.IdentityBaseUrl + '/' + this.getChannels)
  }

  UpdateStatus(body:any){
    return this.http.post(this.CommonBaseUrl+this.updateStatus, body)
  }
}

var headers_object = new HttpHeaders({
  'Content-Type': 'multipart/form-data',
});
const httpOptions = {
  headers: headers_object,
};
