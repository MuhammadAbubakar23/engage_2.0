import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
  
  // for testing purpose
  consoleBaseUrl = environment.consoleBaseUrl;

  resultData: any;
  CCMSURL = environment.CCMSURL;
  JomoAccessToken = environment.JomoAccessToken;
  CommonBaseUrl = environment.CommonBaseUrl;
  IdentityBaseUrl = environment.IdentityBaseUrl;
  FacebookBaseUrl = environment.FbBaseUrl;
  InstagramBaseUrl = environment.InstaBaseUrl;
  ServiceBaseUrl = environment.ServiceBaseUrl;
  ProfileBaseUrl = environment.ProfileBaseUrl;
  LinkedInBaseUrl = environment.LinkedInBaseUrl;
  KemediaBaseUrl=environment.KemediaBaseUrl;
  KescrmBaseUrl=environment.KescrmBaseUrl
  WhatsappBaseUrl =environment.WhatsappBaseUrl
  // KelisteningBaseUrl =environment.KelisteningBaseUrl;
  tagsList = environment.links.common.TagsList;
  insertTags = environment.links.common.InsertTags;
  removeTags = environment.links.common.RemoveTags;
  insertSentiments = environment.links.common.InsertSentiments;
  commentRespond = environment.links.common.CommentRespond;
  markAsComplete = environment.links.common.MarkAsComplete;
  likedByAdmin = environment.links.common.LikedByAdmin;
  quickReplyList = environment.links.common.QuickReplyList;
  quickReplyListForBazaar = environment.links.console.quickReplyListForBazaar;  
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
  insertTagOnProfile = environment.links.common.insertTagOnProfile;
  removeTagOnProfile = environment.links.common.removeTagOnProfile;
  hideUnhideMessage = environment.links.common.hideUnhideMessage;
  dispositionTags = environment.links.common.dispositionTags;
  removeAssignedQuery =environment.links.common.removeAssignedQuery
  getAllTeams= environment.links.console.getAllTeams
  addTeam = environment.links.console.addTeam
  updateTeam = environment.links.console.updateTeam
  deleteTeams=environment.links.console.deleteTeam
  deleteMultipleTeams=environment.links.console.deleteMultipleTeams
  //Reports
  addUniqueCustomer = environment.links.common.addUniqueCustomer;
  uniqueExportCsv = environment.links.common.uniqueExportCsv;
  addHandledBot = environment.links.common.addHandledBot;
  addHandledBotCSV = environment.links.common.addHandledBotCSV;
  routeToAgents = environment.links.common.routeToAgents;
  routeToAgentsCsv = environment.links.common.routeToAgentsCsv;
  addinboundoutbound = environment.links.common.addinboundoutbound;
  twitterReport = environment.links.common.twitterReport;
  twitterSLAReport = environment.links.common.twitterSLAReport;
  twitterProfileWiseReport = environment.links.common.twitterProfileWiseReport;
  getUserList = environment.links.common.getUserList;
  getSentimentData = environment.links.common.getSentimentData;
  addAgentPerformance = environment.links.common.addAgentPerformance;
  shiftReport = environment.links.common.shiftReport;
  getWhatsAppRawDataReport = environment.links.common.getWhatsAppRawDataReport;
  downloadWhatsAppRawDataReport =environment.links.common.downloadWhatsAppRawDataReport;
  postSocialRawData = environment.links.common.postSocialRawData;
  downloadSocialRawData = environment.links.common.downloadSocialRawData;
  facebookReport = environment.links.common.facebookReport;
  facebookProfile = environment.links.common.facebookProfile;
  getAllSocialMatrics = environment.links.common.getAllSocialMatrics;
  instagramReport = environment.links.common.instagramReport;
  instagramProfile = environment.links.common.instagramProfile;
  getTagReport = environment.links.common.getTagReport;
  getLinkedInReport = environment.links.common.getLinkedInReport;
  getLinkedInFollowers=environment.links.common.getLinkedInFollowers;
  emailShiftReport = environment.links.common.emailShiftReport;
  getFollowUpCount = environment.links.common.getFollowUpCount;
  
  downloadTagReport = environment.links.common.downloadTagReport;
  regionwiseReport=environment.links.common.regionwiseReport;
  wordCloud=environment.links.common.wordCloud;
  areawiseReport=environment.links.common.areawiseReport;
  keMediaReport=environment.links.common.keMediaReport;
  PrintFeed=environment.links.common.PrintFeed;
  CSATReport=environment.links.common.CSATReport;
  getInteractionReport = environment.links.common.getInteractionReport
  // SCRM Reports
  facebookscrmReport=environment.links.scrmReports.facebookscrmReport;
  getfortesting=environment.links.scrmReports.getfortesting
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
  getBusinessHoursById = environment.links.console.getBusinessHoursById;
  
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
  getUserSkills = environment.links.console.getUserSkills;
  addSkill = environment.links.console.addSkill;
  deleteSkill = environment.links.console.deleteSkill;
  getskillbyid=environment.links.console.getSkillsbyId;
  updateSkill=environment.links.console.updateSkill;
  getAllProfile = environment.links.console.getAllProfile;
  addProfile = environment.links.console.addProfile;
  attachFacebookPage = environment.links.console.attachFacebookPage;
  getTags = environment.links.console.getTags;
  getTagsByCompanyId =environment.links.console.getTagsByCompanyId
  getTagById = environment.links.console.getTagById;
  addTags = environment.links.console.addTags;
  updateTag = environment.links.console.updateTag;
  deleteTags = environment.links.console.deleteTags;
  getTagsByComayId = environment.links.console.getTagsByComayId;
  getAllTags = environment.links.console.defaultTags;
  // rules
  deleteRules = environment.links.console.deleteRules;
  getAllRules = environment.links.console.getAllRules;
  getRuleById = environment.links.console.getRuleById;
  addRules = environment.links.console.addRules;
  updateRules = environment.links.console.updateRules;
  getEntitiesRule = environment.links.console.getEntitiesRule;
  getRuleEntityProperties = environment.links.console.getRuleEntityProperties;

  getChannels = environment.links.identity.channels;
  deleteRoles = environment.links.identity.deleteRoles;

  // teams 
  // getAllTeams= environment.links.console.getAllTeams
  // addTeam = environment.links.console.addTeam
  // updateTeam = environment.links.console.updateTeam
  //service
  userlogin=environment.links.common.userlogin
  addSurvey = environment.links.service.addSurvey;
  addCSAT = environment.links.service.addCSAT;
  KECSAT = environment.links.profile.KECSAT;
  getProfileInformationByID = environment.links.profile.getProfileInformationByID;
  searchProfileInformation = environment.links.profile.searchProfileInformation;
  addProfileInformation = environment.links.profile.addProfileInformation;
  deattachProfileInformation=environment.links.profile.deattachProfileInformation
  // whatapp bot interaction 
  whatsappBotInteraction = environment.links.common.whatsappBotInteraction
  private _wordCloudDataS: any;
   activeChannel:any
  constructor(private http: HttpClient) {
   this.activeChannel=window.location.origin

   localStorage.setItem('activeChannel',this.activeChannel)
  }
 UserLogin(){
  
 const token =localStorage.getItem('token')
 
  let headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem('token')
  });

  let httpOptions = {
    headers: headers_object
  };
  
  return this.http.get(this.CommonBaseUrl+this.userlogin,httpOptions)
 }
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

  QuickReplyListForBazaarOnly () {
    return this.http.get(this.consoleBaseUrl + this.quickReplyListForBazaar);
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
  UpdateSlaPolicy( sla: any) {
    const url = `${this.consoleBaseUrl}${this.updateSlaPolicy}`;
    return this.http.post(url, sla);
  }
  GetPolicyById(policyid: string) {
    const url = `${this.consoleBaseUrl}${this.getPolicyById}?Id=${policyid}`;
    return this.http.get(url);
  }
  GetBusinessHoursById(policyid: string) {
    const url = `${this.consoleBaseUrl}${this.getBusinessHoursById}?Id=${policyid}`;
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
    return this.http.get(this.consoleBaseUrl + this.getBusinessHours);
  }
  AddBusinessHours(addHours: any) {
    return this.http.post(
      this.consoleBaseUrl + this.addBusinessHours,
      addHours
    );
  }
  DeleteBusinessHours(delHours: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteBusinessHours}?Id=${delHours}`;
    return this.http.get(url);
  }
  UpdateBusinessHours( bueiness: any) {
    const url = `${this.consoleBaseUrl}${this.updateBusinessHours}`;
    return this.http.post(url, bueiness);
  }
  GetBusinessById(BusinessId: string) {
    const url = `${this.consoleBaseUrl}${this.getBusinessById}?Id=${BusinessId}`;
    return this.http.get(url);
  }
  GetEntractRoute() {
    return this.http.get(this.consoleBaseUrl + this.getEntractRoute);
  }
  AddEntractRoute(addRoute: any) {
    return this.http.post(this.consoleBaseUrl + this.addEntractRoute, addRoute);
  }
  UpdateEntractRoute(RouteId: any, entract: any) {
    const url = `${this.consoleBaseUrl}${this.updateEntractRoute}?Id=${RouteId}`;
    return this.http.post(url, entract);
  }
  DeleteEntractRoute(delRoute: string): Observable<any> {
    const url = `${this.consoleBaseUrl}${this.deleteEntractRoute}?Id=${delRoute}`;
    return this.http.get(url);
  }
  GetSkill(body:any) {
    // return this.http.get(this.consoleBaseUrl + this.getSkills);
    return this.http.post(this.consoleBaseUrl + this.getSkills, body);
  }
  GetUserSkills() {
    
     return this.http.get(this.consoleBaseUrl + this.getUserSkills);
  }
  AddSkill(addSkill: any) {
    return this.http.post(this.consoleBaseUrl + this.addSkill, addSkill);
  }
  // DeleteSkill(delSkill: string): Observable<any> {
  //   const url = `${this.consoleBaseUrl}${this.deleteSkill}?Id=${delSkill}`;
  //   return this.http.get(url);
  // }
  DeleteSkill(delSkill: any): Observable<any> {
    return this.http.post(this.consoleBaseUrl + this.deleteSkill, delSkill);
  }
  GetAllProfile() {
    return this.http.get(this.consoleBaseUrl + this.getAllProfile);
  }
  AddProfile(addProfile: any) {
    return this.http.post(this.consoleBaseUrl + this.addProfile, addProfile);
  }
  AttachFacebookPage(body: any) {
    return this.http.post(
      this.FacebookBaseUrl + this.attachFacebookPage,
      body
    );
  }

  SignOut() {
    return this.http.get(this.CommonBaseUrl + this.signOut);
  }

  GetTags() {
    return this.http.get(this.consoleBaseUrl + this.getTags);
  }
  GetTagsByCompanyId(){
    return this.http.get(this.consoleBaseUrl + this.getTagsByCompanyId);

  }
  GetTagById(body: any) {
    const url = `${this.consoleBaseUrl}${this.getTagById}`;
    return this.http.post(url, body);
  }
  AddTags(addTags: any) {
    return this.http.post(this.consoleBaseUrl + this.addTags, addTags);
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

  GetTagsByCompayId() {
    return this.http.get(this.consoleBaseUrl + this.getTagsByComayId);
  }

  // rules

  GetAllRules() {
    return this.http.get(this.consoleBaseUrl + this.getAllRules);
  }
  GetRuleById(ruleId: string) {
    return this.http.get(`${this.consoleBaseUrl + this.getRuleById}?id=${ruleId} `)
    ;
  }
  AddRules(addrule: any) {
    return this.http.post(this.consoleBaseUrl + this.addRules, addrule);
  }
  UpdateRules(rule: any) {
    const url = `${this.consoleBaseUrl}${this.updateRules}`;
    return this.http.post(url, rule);
  }
  DeleteRules(delRules: any) {
    const url = `${this.consoleBaseUrl}${this.deleteRules}?Id=${delRules}`;
    return this.http.get(url);
  }
  GetEntitiesRule() {
    return this.http.get(this.consoleBaseUrl + this.getEntitiesRule);
  }
  GetRuleEntityProperties(entity: string) {
    return this.http.get(
      `${this.consoleBaseUrl}${this.getRuleEntityProperties}?tableName=${entity}`
    );
  }

  GetCustomers(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getCustomers, body);
  }

  GetChannels() {
    return this.http.get(this.IdentityBaseUrl + this.getChannels);
  }

  UpdateStatus(body: any) {
    return this.http.post(this.CommonBaseUrl + this.updateStatus, body);
  }

  InsertTagInProfile(body: any) {
    return this.http.post(this.CommonBaseUrl + this.insertTagOnProfile, body);
  }

  RemoveTagInProfile(body: any) {
    return this.http.post(this.CommonBaseUrl + this.removeTagOnProfile, body);
  }

  HideUnhideMessage(body:any) {
    // const url = this.CommonBaseUrl + this.hideUnhideMessage + '?QueryId=' + queryId + '&Status=' + status;
    // return this.http.get(url);
    return this.http.post(this.CommonBaseUrl + this.hideUnhideMessage, body);
  }
  // Survey form
  AddSurvey(body: any) {
    return this.http.post(this.ServiceBaseUrl + this.addSurvey, body);
  }
  AddCSATSurvey(body: any) {
    return this.http.post(this.ServiceBaseUrl + this.addCSAT, body);
  }

  GetDispositionTags() {
    return this.http.get(this.CommonBaseUrl + this.dispositionTags);
  }
  GetRouteToAgentsCsv(body: any) {
    return this.http.post(this.CommonBaseUrl + this.routeToAgentsCsv, body, {
      responseType: 'text',
    });
  }
  GetRouteToAgents(body: any) {
    return this.http.post(this.CommonBaseUrl + this.routeToAgents, body);
  }

  AddUniqueCustomer(body: any) {
    return this.http.post(this.CommonBaseUrl + this.addUniqueCustomer, body);
  }
  UniqueExportCsv(body: any) {
    return this.http.post(this.CommonBaseUrl + this.uniqueExportCsv, body, {
      responseType: 'text',
    });
  }
  AddHandledBot(body: any) {
    return this.http.post(this.CommonBaseUrl + this.addHandledBot, body);
  }
  AddHandledBotCSV(body: any) {
    return this.http.post(this.CommonBaseUrl + this.addHandledBotCSV, body, {
      responseType: 'text',
    });
  }

  Addinboundoutbound(body: any) {
    return this.http.post(this.CommonBaseUrl + this.addinboundoutbound, body);
  }

  GetTwitterReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.twitterReport, body);
  }

  GetTwitterSLAReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.twitterSLAReport, body);
  }

  GetTwitterProfileWiseReport(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.twitterProfileWiseReport,
      body
    );
  }

  GetUserList() {
    return this.http.get(this.IdentityBaseUrl + this.getUserList);
  }
  GetSentimentData() {
    return this.http.get(this.CommonBaseUrl + this.getSentimentData);
  }

  AddAgentPerformance(body: any) {
    return this.http.post(this.CommonBaseUrl + this.addAgentPerformance, body);
  }

  GetShiftReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.shiftReport, body);
  }

  GetWhatsAppReport(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.getWhatsAppRawDataReport,
      body
    );
  }

  DownloadWhatsAppReport(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.downloadWhatsAppRawDataReport,
      body,
      { responseType: 'text' }
    );
  }

  DownloadSocialRawData(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.downloadSocialRawData,
      body,
      { responseType: 'text' }
    );
  }
  PostSocialRawData(body: any) {
    return this.http.post(this.CommonBaseUrl + this.postSocialRawData, body);
  }
  // facebookreport
  Getfacebookreport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.facebookReport, body);
  }
  GetfacebookProfile(body: any) {
    return this.http.post(this.CommonBaseUrl + this.facebookProfile, body);
  }
  // Executive Dashboard
  GetAllSocialMatrics(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getAllSocialMatrics, body);
  }

  PostInstagramReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.instagramReport, body);
  }

  GetInstagramProfile(body: any) {
    return this.http.post(this.CommonBaseUrl + this.instagramProfile, body);
  }

  GetAllTags(): Observable<any> {
    return this.http.get(this.consoleBaseUrl + this.getAllTags);
  }

  GetAllTagsReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getTagReport, body);
  }
  DownloadTagsReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.downloadTagReport, body, {
      responseType: 'text',
    });
  }

  RemoveAssignedQuery(ProfileId: any) {
    const url = `${this.CommonBaseUrl}${this.removeAssignedQuery}?ProfileId=${ProfileId}`;
    return this.http.get(url);
  }

  getWordCloud(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(`https://tiktokcrawl.enteract.live/GetWordCloud?fromdate=${fromDate}&todate=${toDate}`)
  }

  GetLinkedInReportData(body:any){
    
    return this.http.post(this.LinkedInBaseUrl + this.getLinkedInReport, body);
  }
  GetLinkedInReportFollwers(body:any){
    return this.http.post(this.LinkedInBaseUrl+this.getLinkedInFollowers,body)

  }

  EmailShiftReport(body:any){
    return this.http.post(this.CommonBaseUrl + this.emailShiftReport, body);
  }

  CSATFormForKE(body:any) {
    return this.http.post(this.ProfileBaseUrl + this.KECSAT, body);
  }

  GetCustomerProfileDetails(body:any) {
    return this.http.post(this.ProfileBaseUrl + this.getProfileInformationByID, body);
    // return this.http.post("http://10.111.32.52:45455/api/" + this.getProfileInformationByID, body);
  }
  SearchCustomerProfileDetails(body:any) {
    return this.http.post(this.ProfileBaseUrl + this.searchProfileInformation, body);
  }
  AddProfileInformation(body:any) {
    return this.http.post(this.ProfileBaseUrl + this.addProfileInformation, body);
  }
  DeattachProfileInformation(body:any){
    return this.http.post(this.ProfileBaseUrl+this.deattachProfileInformation,body)
  }
  GetRegionWiseReport(body:any){
    return this.http.post(this.ProfileBaseUrl+this.regionwiseReport,body)
  }
  GetwordCloud(body:any){
    return this.http.post(this.CommonBaseUrl+this.wordCloud,body)
  }
  GetAreaWiseReport(body:any){
    return this.http.post(this.ProfileBaseUrl+this.areawiseReport,body)
  }
  GetAllKemediaReport(body:any){
    return this.http.post(this.KemediaBaseUrl+this.keMediaReport,body)
  }
  GetAllPrintFeed(body:any){
    return this.http.post(this.KemediaBaseUrl+this.PrintFeed,body)
  }
  GetKarachiCoordinates(){
    
    return this.http.get("../../../../../assets/karachiHeatMaoCoordinates.json")
  }
  GetFollowUpCount(body:any){
    return this.http.post(this.CommonBaseUrl+this.getFollowUpCount,body)
 }
 GetCSATReport(body:any){
  return this.http.post(this.ProfileBaseUrl+this.CSATReport,body)
 }
//  For SCRM Report
GetScrmFacebookReport(body:any){
   return this.http.post(this.KescrmBaseUrl+this.facebookscrmReport,body)
}

GetDatafortesting(){
  return this.http.get(this.KescrmBaseUrl+this.getfortesting)
}
editSkill(data: any) {
  return this.http.get(`${this.consoleBaseUrl}${this.getskillbyid}?SkillId=${data}`)
}
UpdateSkill(id: any, rule: any) {
  const url = (`${this.consoleBaseUrl}${this.updateSkill}?SkillId=${id}`)
  return this.http.post(url, rule)
}
GetAllTeams(){
  return this.http.get(this.IdentityBaseUrl + this.getAllTeams)
  }
  AddTeam(body:any){
    return this.http.post(this.IdentityBaseUrl+this.addTeam,body)
  }
  UpdateTeam(body:any){
    return this.http.post(this.IdentityBaseUrl+this.updateTeam,body)

  }
  DeleteSignalTeam(id:any){
    return this.http.delete(`${this.IdentityBaseUrl}${this.deleteTeams}?id=${id}`)
  }
  DeleteMultipleTeams(data:any){
    return this.http.delete(this.IdentityBaseUrl+this.deleteMultipleTeams,data)
  }
  WhatsappBotInteraction(body:any){
    return this.http.post(this.WhatsappBaseUrl+this.whatsappBotInteraction,body)
  }
  GetInteractionReport(body:any){
    return this.http.post(this.CommonBaseUrl+this.getInteractionReport,body)
  }
}


