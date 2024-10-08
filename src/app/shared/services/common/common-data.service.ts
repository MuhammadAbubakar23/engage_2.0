import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RuleWithCount } from '../../Models/ChannelRule';

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
  constructor(private http: HttpClient) { }
  // for testing purpose
  ConsoleBaseUrl = environment.ConsoleBaseUrl;
  resultData: any;
  CCMSURL = environment.CCMSURL;
  JomoAccessToken = environment.JomoAccessToken;
  CommonBaseUrl = environment.CommonBaseUrl;
  IdentityBaseUrl = environment.IdentityBaseUrl;
  FacebookBaseUrl = environment.FbBaseUrl;
  InstagramBaseUrl = environment.InstagramBaseUrl;
  ServiceBaseUrl = environment.ServiceBaseUrl;
  ProfileBaseUrl = environment.ProfileBaseUrl;
  LinkedInBaseUrl = environment.LinkedInBaseUrl;
  KemediaBaseUrl = environment.KemediaBaseUrl;
  KescrmBaseUrl = environment.KescrmBaseUrl;
  WhatsappBaseUrl = environment.DemoWhatsappBaseUrl;
  ReportsBaseUrl = environment.ReportsBaseUrl;
  faceRoxBaseUrl = environment.faceRoxBaseUrl;
  autoresponderbaseurl = environment.autoresponderbaseurl;
  metaWhatsapp = environment.MetaWhatsapp;
  exchangeEmailBaseUrl = environment.DemoExchangeEmailBaseUrl;
  playStoreBaseUrl = environment.PlayStoreBaseUrl;
  gSuitBaseUrl = environment.GSuitBaseUrl;
  whatsappBaseUrl = environment.DemoWhatsappBaseUrl;
  youtubeBaseUrl = environment.YoutubeBaseUrl;
  linkdinBaseUrl = environment.DemoLinkdinBaseUrl;

  profileBaseUrl = environment.botConfigBaseUrl;
  // channelBaseUrl = environment.ConsoleBaseUrl;
  botsBaseUrl = environment.botMoniteringBaseUrl;
  botConfigBaseUrl = environment.botConfigBaseUrl;
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
  sessionClose = environment.links.common.sessionClose;
  // createMessageTemplate = environment.links.console.CreateMessageTemplate;
  repliesList = environment.links.common.repliesList;
  signOut = environment.links.common.signOut;
  getCustomers = environment.links.common.getCustomers;
  updateStatus = environment.links.common.updateStatus;
  updateBotStatus = environment.links.common.updateBotStatus;
  insertTagOnProfile = environment.links.common.insertTagOnProfile;
  removeTagOnProfile = environment.links.common.removeTagOnProfile;
  hideUnhideMessage = environment.links.common.hideUnhideMessage;
  dispositionTags = environment.links.common.dispositionTags;
  removeAssignedQuery = environment.links.common.removeAssignedQuery;
  getAllTeams = environment.links.console.getAllTeams;
  addTeam = environment.links.console.addTeam;
  updateTeam = environment.links.console.updateTeam;
  getTeamType = environment.links.console.getTeamType;
  deleteTeams = environment.links.console.deleteTeam;
  teamGetById = environment.links.console.teamGetById;
  deleteMultipleTeams = environment.links.console.deleteMultipleTeams;
  getVoiceToken=environment.links.identity.getVoiceToken
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
  downloadWhatsAppRawDataReport =
    environment.links.common.downloadWhatsAppRawDataReport;
  postSocialRawData = environment.links.common.postSocialRawData;
  downloadSocialRawData = environment.links.common.downloadSocialRawData;
  facebookReport = environment.links.common.facebookReport;
  facebookProfile = environment.links.common.facebookProfile;
  getAllSocialMatrics = environment.links.common.getAllSocialMatrics;
  instagramReport = environment.links.common.instagramReport;
  instagramProfile = environment.links.common.instagramProfile;
  getTagReport = environment.links.common.getTagReport;
  getLinkedInReport = environment.links.common.getLinkedInReport;
  getLinkedInFollowers = environment.links.common.getLinkedInFollowers;
  emailShiftReport = environment.links.common.emailShiftReport;
  getFollowUpCount = environment.links.common.getFollowUpCount;
  getAllWing = environment.links.console.getAllWing;
  downloadTagReport = environment.links.common.downloadTagReport;
  regionwiseReport = environment.links.common.regionwiseReport;
  wordCloud = environment.links.common.wordCloud;
  areawiseReport = environment.links.common.areawiseReport;
  keMediaReport = environment.links.common.keMediaReport;
  PrintFeed = environment.links.common.PrintFeed;
  CSATReport = environment.links.common.CSATReport;
  getInteractionReport = environment.links.common.getInteractionReport;
  castRawDataReport=environment.links.console.castRawDataReport;
  // SCRM Reports
  facebookscrmReport = environment.links.scrmReports.facebookscrmReport;
  getfortesting = environment.links.scrmReports.getfortesting;
  // for testing purpose
  getAllMessages = environment.links.console.getAllMessages;
  botConfigDetails = environment.links.console.botConfigDetails;
  updateBotConfigDetail = environment.links.console.UpdateStatus;
  ViewBotConfig = environment.links.console.ViewBotConfig;
  addTemplate = environment.links.console.addTemplate;
  updateTemplate = environment.links.console.updateTemplate;
  deleteMessages = environment.links.console.deleteMessages;
  deleteBotConfig = environment.links.console.deleteBotConfig;
  getQuickReply = environment.links.console.getQuickReply;
  getActiveQuickReply = environment.links.console.getActiveQuickReply;
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
  getAllSkills = environment.links.console.getAllSkills;
  addSkill = environment.links.console.addSkill;
  addBotConfig = environment.links.console.addBotConfig;
  deleteSkill = environment.links.console.deleteSkill;
  getskillbyid = environment.links.console.getSkillsbyId;
  updateSkill = environment.links.console.updateSkill;
  getAllProfile = environment.links.console.getAllProfile;
  addProfile = environment.links.console.addProfile;
  attachFacebookPage = environment.links.console.attachFacebookPage;
  getTags = environment.links.console.getTags;
  getTagsAll = environment.links.console.getTagsAll;
  getTagsByCompanyId = environment.links.console.getTagsByCompanyId;
  getTagById = environment.links.console.getTagById;
  addTags = environment.links.console.addTags;
  updateTag = environment.links.console.updateTag;
  deleteTags = environment.links.console.deleteTags;
  getTagsByComayId = environment.links.console.getTagsByComayId;
  getAllTags = environment.links.console.defaultTags;
  getPolicyByWing = environment.links.console.getPolicyByWing;
  SlaResponder=environment.links.console.SlaResponder
  // ReportsBaseUrl = environment.ReportsBaseUrl;
  // rules
  deleteRules = environment.links.console.deleteRules;
  getAllRules = environment.links.console.getAllRules;
  getRuleById = environment.links.console.getRuleById;
  addRules = environment.links.console.addRules;
  updateRules = environment.links.console.updateRules;
  getEntitiesRule = environment.links.console.getEntitiesRule;
  getEntitiesRules = environment.links.console.getEntitiesRules;
  addRule = environment.links.console.addRule;
  getFbRule = environment.links.console.getFbRule;
  softDeleteFb = environment.links.console.softDeleteFb;
  getEntitiesProperties = environment.links.console.getEntitiesProperties;
  getRuleEntityProperties = environment.links.console.getRuleEntityProperties;
  getChannels = environment.links.identity.channels;
  consoleChannel = environment.links.identity.consoleChannls;
  deleteRoles = environment.links.identity.deleteRoles;
  getUserRoles = environment.links.identity.getUserRoles;
  getautoResponedFB = environment.links.console.getautoResponedFB;
  addFbResponed = environment.links.console.addFbResponed;
  getCompanyPages = environment.links.console.getCompanyPages;
  getProfileDetails = environment.links.console.getProfileDetails;
  getServices = environment.links.console.getServices;
  botsList = environment.links.console.getBotList;
  getActions = environment.links.console.getActions;
  getPlatorm = environment.links.console.getPlatform;
  getConsoleEntities = environment.links.console.getConsoleEntities;
  getConsoleEntityProperties =
    environment.links.console.getConsoleEntityProperties;
  getRuleType = environment.links.console.getRuleType;
  getRuleTag = environment.links.console.getRuleTag;
  getServicetree = environment.links.console.getServicetree;
  getTemplateStatus = environment.links.console.getTemplateStatus;
  deleteTemplate = environment.links.console.deleteTemplate;
  getRuleStatus = environment.links.console.getRuleStatus;
  getCompanyTeams = environment.links.console.getCompanyTeams;
  emailReport = environment.links.console.emailReport;
  // emailReport: 'Report/GetEmailReport',
  wallboardReport = environment.links.console.wallboardReport
  perviousWallboardReport = environment.links.console.perviousWallboardReport;
  wallboardCSATReport = environment.links.console.wallboardReport;
  getMonthToDateServiceLevel = environment.links.console.GetMonthToDateServiceLevel;
  getPreviousInteractionDashboard = environment.links.console.getPreviousInteractionDashboard;
  getCompanyWings=environment.links.console.getCompanyWings
  adminPanelBaseUrl='https://lhr-ivr1.enteract.live/console_sandbox/public/'
endPoint='engage_menus/'
AdminPanelToken=sessionStorage.getItem('adminPenalToken')
  // teams
  // getAllTeams= environment.links.console.getAllTeams
  // addTeam = environment.links.console.addTeam
  // updateTeam = environment.links.console.updateTeam
  //service
  userlogin = environment.links.common.userlogin;
  rolesPermissions = environment.links.identity.RolesPermissions;
  reportsMenus = environment.links.identity.ReportsMenus;
  consoleMenus = environment.links.identity.ConsoleMenus;
  addSurvey = environment.links.service.addSurvey;
  addCSAT = environment.links.service.addCSAT;
  KECSAT = environment.links.profile.KECSAT;
  getProfileInformationByID =
    environment.links.profile.getProfileInformationByID;
  searchProfileInformation = environment.links.profile.searchProfileInformation;
  addProfileInformation = environment.links.profile.addProfileInformation;
  deattachProfileInformation =
    environment.links.profile.deattachProfileInformation;
  // whatapp bot interaction
  whatsappBotInteraction = environment.links.common.whatsappBotInteraction;


  getTagsBySupreamId = environment.links.console.getTagsBySupreamId
  addTagTeams = environment.links.console.addTagTeams;
  updateTagTeams = environment.links.console.updateTagTeams;
  getSkillTeamById = environment.links.console.getSkillTeamById;
  deleteTagTeam = environment.links.console.deleteTagTeam;
  //For Access Report
  addAccessReports = environment.links.console.addAccessReports;
  getActors = environment.links.console.getActors;
  getReports = environment.links.console.getReports;

  private _wordCloudDataS: any;
  baseUrl: any;

  gethttpOptions() {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
    let httpOptions = {
      headers: headers_object,
    };
    return httpOptions;
  }
  UserLogin() {
    let httpOptions = this.gethttpOptions();
    return this.http.get(this.CommonBaseUrl + this.userlogin, httpOptions);
  }
  getPermissionByRole(form: any) {
    return this.http.post(
      this.IdentityBaseUrl + this.rolesPermissions,
      form
    );
  }
  getReportsMenuByRole(form: any) {
    return this.http.post(this.ReportsBaseUrl + this.reportsMenus, form);
  }
  getConsoleMenuByRole(actorId: any) {
    return this.http.get(`${this.IdentityBaseUrl}${this.consoleMenus}?ActorId=${actorId}`);
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
  QuickReplyListForBazaarOnly() {
    return this.http.get(
      this.ConsoleBaseUrl + this.quickReplyListForBazaar
    );
  }
  CommentRespond(form: any) {
    return this.http.post(this.CommonBaseUrl + this.commentRespond, form);
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
    return this.http.post(
      this.CommonBaseUrl + this.assignToAnotherAgent,
      data
    );
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
    return this.http.post(
      this.CommonBaseUrl + this.conversationDetail,
      data
    );
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
    const url =
      this.CommonBaseUrl + this.agentDetail + '?UserId=' + agentId;
    return this.http.get(url);
  }
  UpdateBreak(status: any) {
    const url = this.CommonBaseUrl + this.updateBreak + '?Status=' + status;
    return this.http.get(url);
  }
  GrammerChange(body:any){
    const url = "https://engage10aicomposerbackend-api.enteract.app/grammar";
    return this.http.post(url, body)
  }
  ToneChange(body:any){
    const url = "https://engage10aicomposerbackend-api.enteract.app/change_tone";
    return this.http.post(url, body)
  }
  LanguageChange(body:any){
    const url = "https://engage10aicomposerbackend-api.enteract.app/translate";
    return this.http.post(url, body)
  }
  GetChatSentiment(body:any){
    const url = "http://3.142.27.167:5005/sentiment_analysis";
    return this.http.post(url,body)
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
  // auto responder apis
  getAutoRespondFB(body: any) {
    return this.http.post(
      this.autoresponderbaseurl + this.getautoResponedFB,
      body
    );
  }
  getAllAutoRespondLinkedin(body: any) {
    return this.http.post(this.linkdinBaseUrl + this.getautoResponedFB, body);
  }
  getAllAutoRespondMetaWA(body: any) {
    return this.http.post(this.metaWhatsapp + this.getautoResponedFB, body);
  }
  getAllAutoRespondExChange(body: any) {
    return this.http.post(this.exchangeEmailBaseUrl + this.getautoResponedFB, body);
  }
  getAllAutoRespondWa(body: any) {
    return this.http.post(this.whatsappBaseUrl + this.getautoResponedFB, body);
  }
  getAllAutoRespondYt(body: any) {
    return this.http.post(this.youtubeBaseUrl + this.getautoResponedFB, body);
  }
  getAllAutoRespondPs(body: any) {
    return this.http.post(this.playStoreBaseUrl + this.getautoResponedFB, body);
  }
  getAllAutoRespondGsuit(body: any) {
    return this.http.post(this.gSuitBaseUrl + this.getautoResponedFB, body);
  }
  getAllAutoRespondInsta(body: any) {
    return this.http.post(this.InstagramBaseUrl + this.getautoResponedFB, body);
  }

  getChannelsList() {
    return this.http.get(this.ConsoleBaseUrl + this.getServices);
  }
  getBots() {
    return this.http.get(this.botsBaseUrl + this.botsList);
  }
  AddFbResponed(body: any) {
    return this.http.post(this.autoresponderbaseurl + this.addFbResponed, body);
  }
  AddInstaResponed(body: any) {
    return this.http.post(this.InstagramBaseUrl + this.addFbResponed, body);
  }
  AddWsResponed(body: any) {
    return this.http.post(this.WhatsappBaseUrl + this.addFbResponed, body);
  }
  AddExchangeEmailtResponed(body: any) {
    return this.http.post(this.exchangeEmailBaseUrl + this.addFbResponed, body);
  }
  AddMetWaResponed(body: any) {
    return this.http.post(this.metaWhatsapp + this.addFbResponed, body);
  }

  AddGsuitResponed(body: any) {
    return this.http.post(this.gSuitBaseUrl + this.addFbResponed, body);
  }
  AddLinkDinResponed(body: any) {
    return this.http.post(this.linkdinBaseUrl + this.addFbResponed, body);
  }
  AddPsResponed(body: any) {
    return this.http.post(this.playStoreBaseUrl + this.addFbResponed, body);
  }
  AddYtResponed(body: any) {
    return this.http.post(this.youtubeBaseUrl + this.addFbResponed, body);
  }


  GetCompanyPages() {
    return this.http.get(this.autoresponderbaseurl + this.getCompanyPages);
  }
  GetProfileInfo(url: any) {
    return this.http.get(url + this.getProfileDetails);
  }

  GetActions() {
    return this.http.get(this.autoresponderbaseurl + this.getActions);
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
  GetAllChannelsUnrespondedCount(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.allChannelsUnrespondedCounts,
      body
    );
  }
  SubmitDispositionForm(form: any) {
    return this.http.post(this.CommonBaseUrl + this.saveAsCompleted, form);
  }
  GetDispositionHistory(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.dispositionHistory,
      body
    );
  }
  MarkAllAsRead(body: any) {
    return this.http.post(this.CommonBaseUrl + this.markAllAsRead, body);
  }
  GetAgentReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getAgentReport, body, {
      responseType: 'text',
    });
  }
  GetAllocatedProfiles(wing: string, skillSlug: string) {
    return this.http.get(
      this.CommonBaseUrl +
      this.getAllocatedProfiles +
      '?Wings=' +
      wing +
      '&SkillSlug=' +
      skillSlug
    );
  }
  // CreateMessageTemplate(body: any) {
  //   return this.http.post(this.CommonBaseUrl + this.createMessageTemplate, body);
  // }
  // CreateSlaPolicy(body: any) {
  //   return this.http.post('https://10.111.32.97:45458/api/SLAPolicies/Add', body);
  // }
  GetAllMessages(templates: any) {
    return this.http.post(
      this.ConsoleBaseUrl + this.getAllMessages,
      templates
    );
  }
  GetBotConfig(url: any, body: any) {
    return this.http.post(url + this.botConfigDetails, body);
  }
  Addtemplate(addData: any) {
    return this.http.post(this.ConsoleBaseUrl + this.addTemplate, addData);
  }
  UpdateTemplate(templateId: string, template: any) {
    const url = `${this.ConsoleBaseUrl}${this.updateTemplate}?Id=${templateId}`;
    return this.http.post(url, template);
  }
  DeleteMessage(deleteId: string): Observable<any> {
    const url = `${this.ConsoleBaseUrl}${this.deleteMessages}?Id=${deleteId}`;
    return this.http.get(url);
  }
  DeleteBotConfig(
    baseUrl: any,
    id: any,
    pageId: any,
    Type: any
  ): Observable<any> {
    const url = `${baseUrl}${this.deleteBotConfig}?id=${id}&PageId=${pageId}&Type=${Type}`;
    return this.http.get(url);
  }
  UpdateBotStatus(
    baseUrl: any,
    id: any,
    pageId: any,
    contentType: any,
    Status: any
  ) {
    const url = `${baseUrl}${this.updateBotConfigDetail}?id=${id}&PageID=${pageId}&ContentType=${contentType}&status=${Status}`;
    return this.http.post(url, 'null');
  }
  GetQuickReply(body: any) {
    return this.http.post(this.ConsoleBaseUrl + this.getQuickReply, body);
  }
  GetActiveQuickReply(body: any) {
    return this.http.post(this.ConsoleBaseUrl + this.getActiveQuickReply, body);
  }
  AddQuickReply(add: any) {
    return this.http.post(this.ConsoleBaseUrl + this.addQuickReply, add);
  }
  UpdateQuickReply(quickId: string, quick: any) {
    const url = `${this.ConsoleBaseUrl}${this.updateQuickReply}?Id=${quickId}`;
    return this.http.post(url, quick);
  }
  DeleteQuickReply(delResponse: any): Observable<any> {
    const url = `${this.ConsoleBaseUrl}${this.deleteQuickReply}`;
    return this.http.post(url, delResponse);
    // const url = `${this.ConsoleBaseUrl}${this.deleteQuickReply}?Id=${deleteId}`;
    // return this.http.get(url);
  }
  GetSlaPolicy(body: any) {
    return this.http.post(this.ConsoleBaseUrl + this.getSlaPolicy, body);
  }
  AddSlaPolicy(addSla: any) {
    return this.http.post(this.ConsoleBaseUrl + this.addSlaPolicy, addSla);
  }
  UpdateSlaPolicy(sla: any) {
    const url = `${this.ConsoleBaseUrl}${this.updateSlaPolicy}`;
    return this.http.post(url, sla);
  }
  GetPolicyById(policyid: string) {
    const url = `${this.ConsoleBaseUrl}${this.getPolicyById}?Id=${policyid}`;
    return this.http.get(url);
  }
  GetBusinessHoursById(policyid: string) {
    const url = `${this.ConsoleBaseUrl}${this.getBusinessHoursById}?Id=${policyid}`;
    return this.http.get(url);
  }
  DeleteSlaPolicy(deleteSla: string): Observable<any> {
    const url = `${this.ConsoleBaseUrl}${this.deleteSlaPolicy}?Id=${deleteSla}`;
    return this.http.get(url);
  }
  GetOperationalHours() {
    return this.http.get(this.ConsoleBaseUrl + this.getOperationalHours);
  }
  GetBusinessHours(body: any) {
    return this.http.post(
      this.IdentityBaseUrl + this.getBusinessHours,
      body
    );
  }
  AddBusinessHours(addHours: any) {
    return this.http.post(
      this.IdentityBaseUrl + this.addBusinessHours,
      addHours
    );
  }
  DeleteBusinessHours(delHours: string): Observable<any> {
    const url = `${this.IdentityBaseUrl}${this.deleteBusinessHours}?Id=${delHours}`;
    return this.http.get(url);
  }
  UpdateBusinessHours(bueiness: any) {
    const url = `${this.IdentityBaseUrl}${this.updateBusinessHours}`;
    return this.http.post(url, bueiness);
  }
  GetBusinessById(BusinessId: string) {
    const url = `${this.IdentityBaseUrl}${this.getBusinessById}?Id=${BusinessId}`;
    return this.http.get(url);
  }
  GetEntractRoute() {
    return this.http.get(this.ConsoleBaseUrl + this.getEntractRoute);
  }
  AddEntractRoute(addRoute: any) {
    return this.http.post(
      this.ConsoleBaseUrl + this.addEntractRoute,
      addRoute
    );
  }
  UpdateEntractRoute(RouteId: any, entract: any) {
    const url = `${this.ConsoleBaseUrl}${this.updateEntractRoute}?Id=${RouteId}`;
    return this.http.post(url, entract);
  }
  DeleteEntractRoute(delRoute: string): Observable<any> {
    const url = `${this.ConsoleBaseUrl}${this.deleteEntractRoute}?Id=${delRoute}`;
    return this.http.get(url);
  }
  GetAllSkills(body: any) {
    var url = "https://console-engage.enteract.app/api/"
    return this.http.post(url + this.getAllSkills, body);
  }
  GetSkills(body: any) {
    return this.http.post(this.ConsoleBaseUrl + this.getSkills, body);
  }
  AddSkill(addSkill: any) {
    return this.http.post(this.ConsoleBaseUrl + this.addSkill, addSkill);
  }
  AddBotConfig(url: any, body: any) {
    return this.http.post(url + this.addBotConfig, body);
  }
  GetBotConfigById(pageId: any, Type: any) {
    const url = `${this.botConfigBaseUrl}${this.ViewBotConfig}?PageID=${pageId}&Type=${Type}`;
    return this.http.get(url);
  }
  // DeleteSkill(delSkill: string): Observable<any> {
  //   const url = `${this.ConsoleBaseUrl}${this.deleteSkill}?Id=${delSkill}`;
  //   return this.http.get(url);
  // }
  DeleteSkill(delSkill: any): Observable<any> {
    return this.http.post(this.ConsoleBaseUrl + this.deleteSkill, delSkill);
  }
  GetAllProfile() {
    return this.http.get(this.ConsoleBaseUrl + this.getAllProfile);
  }
  AddProfile(addProfile: any) {
    return this.http.post(
      this.ConsoleBaseUrl + this.addProfile,
      addProfile
    );
  }
  AttachFacebookPage(body: any) {
    let httpOptions = this.gethttpOptions();
    return this.http.post(
      this.FacebookBaseUrl + this.attachFacebookPage,
      body,
      httpOptions
    );
  }
  AttachInstagramPage(body: any) {
    let httpOptions = this.gethttpOptions();
    return this.http.post(
      this.InstagramBaseUrl + this.attachFacebookPage,
      body,
      httpOptions
    );
  }
  SignOut() {
    return this.http.get(this.CommonBaseUrl + this.signOut);
  }
  GetTags() {
    return this.http.get(this.ConsoleBaseUrl + this.getTags);
  }
  GetTagsByCompanyId() {
    
    return this.http.get(this.ConsoleBaseUrl + this.getTagsByCompanyId);
  }
  GetTagById(body: any) {
    const url = `${this.ConsoleBaseUrl}${this.getTagById}`;
    return this.http.post(url, body);
  }
  AddTags(addTags: any) {
    return this.http.post(this.ConsoleBaseUrl + this.addTags, addTags);
  }
  UpdateTag(tagsId: string, tag: any) {
    const url = `${this.ConsoleBaseUrl}${this.updateTag}?Id=${tagsId}`;
    return this.http.post(url, tag);
  }
  DeleteTags(delTag: any): Observable<any> {
    const url = `${this.ConsoleBaseUrl}${this.deleteTags}`;
    return this.http.post(url, delTag);
  }
  DeleteRoles(delRolId: any) {
    const url = `${this.IdentityBaseUrl}${this.deleteRoles}`;
    return this.http.post(url, delRolId);
  }
  GetTagsByCompayId() {
    return this.http.get(this.ConsoleBaseUrl + this.getTagsByComayId);
  }
  // rules
  GetAllRules(body: any) {
    return this.http.post(this.ConsoleBaseUrl + this.getAllRules, body);
  }
  GetAllFbRules(body: any) {
    return this.http.post<RuleWithCount>(
      this.autoresponderbaseurl + this.getFbRule,
      body
    );
  }
  GetInstaAllRules(body: any) {
    return this.http.post<RuleWithCount>(this.InstagramBaseUrl + this.getFbRule, body);
  }
  GetWslRules(body: any) {
    return this.http.post<RuleWithCount>(this.whatsappBaseUrl + this.getFbRule, body);
  }
  GetGsuitRules(body: any) {
    return this.http.post<RuleWithCount>(this.gSuitBaseUrl + this.getFbRule, body);
  }
  GetMetaWaRules(body: any) {
    return this.http.post<RuleWithCount>(this.metaWhatsapp + this.getFbRule, body);
  }
  GetExchangeEmailRules(body: any) {
    return this.http.post<RuleWithCount>(this.exchangeEmailBaseUrl + this.getFbRule, body);
  }
  GetPsAllRules(body: any) {
    return this.http.post<RuleWithCount>(this.playStoreBaseUrl + this.getFbRule, body);
  }
  GetYTAllRules(body: any) {
    return this.http.post<RuleWithCount>(this.youtubeBaseUrl + this.getFbRule, body);
  }
  GetLinkdinAllRules(body: any) {
    return this.http.post<RuleWithCount>(this.linkdinBaseUrl + this.getFbRule, body);
  }

  GetRuleById(ruleId: string) {
    return this.http.get(
      `${this.ConsoleBaseUrl + this.getRuleById}?id=${ruleId} `
    );
  }
  AddRules(addrule: any) {
    return this.http.post(this.ConsoleBaseUrl + this.addRules, addrule);
  }
  AddFBRule(addrule: any) {
    return this.http.post(this.autoresponderbaseurl + this.addRule, addrule);
  }
  AddInstaRule(addrule: any) {
    return this.http.post(this.InstagramBaseUrl + this.addRule, addrule);
  }
  AddLinkdinRule(addrule: any) {
    return this.http.post(this.linkdinBaseUrl + this.addRule, addrule);
  }
  AddPsRule(addrule: any) {
    return this.http.post(this.playStoreBaseUrl + this.addRule, addrule);
  }
  AddWaRule(addrule: any) {
    return this.http.post(this.whatsappBaseUrl + this.addRule, addrule);
  }
  AddMetaWaRule(addrule: any) {
    return this.http.post(this.metaWhatsapp + this.addRule, addrule);
  }
  AddexchangeEmailRule(addrule: any) {
    return this.http.post(this.exchangeEmailBaseUrl + this.addRule, addrule);
  }
  AddEmailRule(addrule: any) {
    return this.http.post(this.gSuitBaseUrl + this.addRule, addrule);
  }
  AddYTRule(addrule: any) {
    return this.http.post(this.youtubeBaseUrl + this.addRule, addrule);
  }

  UpdateRules(rule: any) {
    const url = `${this.ConsoleBaseUrl}${this.updateRules}`;
    return this.http.post(url, rule);
  }
  DeleteRules(delRules: any) {
    const url = `${this.ConsoleBaseUrl}${this.deleteRules}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteFbRules(delRules: any) {
    const url = `${this.autoresponderbaseurl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteLinkdinRules(delRules: any) {
    const url = `${this.linkdinBaseUrl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeletePsRules(delRules: any) {
    const url = `${this.playStoreBaseUrl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteWaRules(delRules: any) {
    const url = `${this.whatsappBaseUrl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteMetaWaRules(delRules: any) {
    const url = `${this.metaWhatsapp}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteExchangeEmailRules(delRules: any) {
    const url = `${this.exchangeEmailBaseUrl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteGSuitRules(delRules: any) {
    const url = `${this.gSuitBaseUrl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteYTRules(delRules: any) {
    const url = `${this.youtubeBaseUrl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }
  DeleteInstaRules(delRules: any) {
    const url = `${this.InstagramBaseUrl}${this.softDeleteFb}?Id=${delRules}`;
    return this.http.get(url);
  }

  GetEntitiesRule() {
    return this.http.get(this.ConsoleBaseUrl + this.getEntitiesRule);
  }
  GetEntitiesRules() {
    return this.http.get(this.autoresponderbaseurl + this.getEntitiesRules);
  }
  GetRuleEntitiesProperties(entity: any) {
    return this.http.get(
      `${this.autoresponderbaseurl}${this.getEntitiesProperties}?tableName=${entity}`
    );
  }
  GetRuleEntityProperties(entity: any) {
    return this.http.get(
      `${this.ConsoleBaseUrl}${this.getRuleEntityProperties}?tableName=${entity}`
    );
  }
  GetCustomers(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getCustomers, body);
  }
  // GetChannels() {
  //   return this.http.get(this.IdentityBaseUrl + this.getChannels);
  // }
  GetConsoleChannels() {
    return this.http.get(this.ConsoleBaseUrl + this.consoleChannel);
  }
  UpdateStatus(body: any) {
    return this.http.post(this.CommonBaseUrl + this.updateStatus, body);
  }
  InsertTagInProfile(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.insertTagOnProfile,
      body
    );
  }
  RemoveTagInProfile(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.removeTagOnProfile,
      body
    );
  }
  HideUnhideMessage(body: any) {
    // const url = this.CommonBaseUrl + this.hideUnhideMessage + '?QueryId=' + queryId + '&Status=' + status;
    // return this.http.get(url);
    return this.http.post(
      this.CommonBaseUrl + this.hideUnhideMessage,
      body
    );
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
    return this.http.post(
      this.ReportsBaseUrl + this.routeToAgentsCsv,
      body,
      {
        responseType: 'text',
      }
    );
  }
  GetRouteToAgents(body: any) {
    return this.http.post(this.ReportsBaseUrl + this.routeToAgents, body);
  }
  AddUniqueCustomer(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.addUniqueCustomer,
      body
    );
  }
  UniqueExportCsv(body: any) {
    return this.http.post(this.ReportsBaseUrl + this.uniqueExportCsv, body, {
      responseType: 'text',
    });
  }
  AddHandledBot(body: any) {
    return this.http.post(this.ReportsBaseUrl + this.addHandledBot, body);
  }
  AddHandledBotCSV(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.addHandledBotCSV,
      body,
      {
        responseType: 'text',
      }
    );
  }
  Addinboundoutbound(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.addinboundoutbound,
      body
    );
  }
  GetTwitterReport(body: any) {
    return this.http.post(this.ReportsBaseUrl + this.twitterReport, body);
  }
  GetTwitterSLAReport(body: any) {
    return this.http.post(this.CommonBaseUrl + this.twitterSLAReport, body);
  }
  GetTwitterProfileWiseReport(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.twitterProfileWiseReport,
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
    return this.http.post(
      this.ReportsBaseUrl + this.addAgentPerformance,
      body
    );
  }
  GetShiftReport(body: any) {
    return this.http.post(this.ReportsBaseUrl + this.shiftReport, body);
  }
  GetWhatsAppReport(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.getWhatsAppRawDataReport,
      body
    );
  }
  DownloadWhatsAppReport(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.downloadWhatsAppRawDataReport,
      body,
      { responseType: 'text' }
    );
  }
  DownloadSocialRawData(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.downloadSocialRawData,
      body,
      { responseType: 'text' }
    );
  }
  PostSocialRawData(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.postSocialRawData,
      body
    );
  }
  // facebookreport
  Getfacebookreport(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.facebookReport,
      body
    );
  }
  GetfacebookProfile(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.facebookProfile,
      body
    );
  }
  // Executive Dashboard
  GetAllSocialMatrics(body: any) {
    return this.http.post(
      this.CommonBaseUrl + this.getAllSocialMatrics,
      body
    );
  }
  PostInstagramReport(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.instagramReport,
      body
    );
  }
  GetInstagramProfile(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.instagramProfile,
      body
    );
  }
  GetAllTags(): Observable<any> {
    return this.http.get(this.ConsoleBaseUrl + this.getAllTags);
  }
  GetAllTag(body: any) {
    return this.http.post(this.ConsoleBaseUrl + this.getTagsAll, body);
  }
  GetAllTagsReport(body: any) {
    return this.http.post(this.ReportsBaseUrl + this.getTagReport, body);
  }
  DownloadTagsReport(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.downloadTagReport,
      body,
      {
        responseType: 'text',
      }
    );
  }
  RemoveAssignedQuery(body: any) {
    // const url = `${this.CommonBaseUrl}${this.removeAssignedQuery}?ProfileId=${ProfileId}`;
    // return this.http.get(url);
    return this.http.post(
      this.CommonBaseUrl + this.removeAssignedQuery,
      body
    );
  }
  getWordCloud(fromDate: string, toDate: string): Observable<any> {
    return this.http.get(
      `https://tiktokcrawl.enteract.live/GetWordCloud?fromdate=${fromDate}&todate=${toDate}`
    );
  }
  getSessionId(customerNumber: any, ClientNumber: any) {
    return this.http.get(
      `${this.ServiceBaseUrl}${this.sessionClose}?customerIdentifier=${customerNumber}&clientIdentifier=${ClientNumber}`
    );
  }
  GetLinkedInReportData(body: any) {
    return this.http.post(
      this.LinkedInBaseUrl + this.getLinkedInReport,
      body
    );
  }
  GetLinkedInReportFollwers(body: any) {
    return this.http.post(
      this.LinkedInBaseUrl + this.getLinkedInFollowers,
      body
    );
  }
  EmailShiftReport(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.emailShiftReport,
      body
    );
  }
  CSATFormForKE(body: any) {
    return this.http.post(this.ProfileBaseUrl + this.KECSAT, body);
  }
  GetCustomerProfileDetails(body: any) {
    return this.http.post(
      this.ProfileBaseUrl + this.getProfileInformationByID,
      body
    );
    // return this.http.post("http://10.111.32.52:45455/api/" + this.getProfileInformationByID, body);
  }
  SearchCustomerProfileDetails(body: any) {
    return this.http.post(
      this.ProfileBaseUrl + this.searchProfileInformation,
      body
    );
  }
  AddProfileInformation(body: any) {
    return this.http.post(
      this.ProfileBaseUrl + this.addProfileInformation,
      body
    );
  }
  DeattachProfileInformation(body: any) {
    return this.http.post(
      this.ProfileBaseUrl + this.deattachProfileInformation,
      body
    );
  }
  GetRegionWiseReport(body: any) {
    return this.http.post(
      this.ProfileBaseUrl + this.regionwiseReport,
      body
    );
  }
  GetwordCloud(body: any) {
    return this.http.post(this.CommonBaseUrl + this.wordCloud, body);
  }
  GetAreaWiseReport(body: any) {
    return this.http.post(this.ProfileBaseUrl + this.areawiseReport, body);
  }
  GetAllKemediaReport(body: any) {
    return this.http.post(this.KemediaBaseUrl + this.keMediaReport, body);
  }
  GetAllPrintFeed(body: any) {
    return this.http.post(this.KemediaBaseUrl + this.PrintFeed, body);
  }
  GetKarachiCoordinates() {
    return this.http.get(
      '../../../../../assets/karachiHeatMaoCoordinates.json'
    );
  }
  GetFollowUpCount(body: any) {
    return this.http.post(this.CommonBaseUrl + this.getFollowUpCount, body);
  }
  GetCSATReport(body: any) {
    return this.http.post(this.ProfileBaseUrl + this.CSATReport, body);
  }
  //  For SCRM Report
  GetScrmFacebookReport(body: any) {
    return this.http.post(this.KescrmBaseUrl + this.facebookscrmReport, body);
  }
  GetDatafortesting() {
    return this.http.get(this.KescrmBaseUrl + this.getfortesting);
  }
  editSkill(data: any) {
    return this.http.get(
      `${this.ConsoleBaseUrl}${this.getskillbyid}?SkillId=${data}`
    );
  }
  UpdateSkill(id: any, rule: any) {
    const url = `${this.ConsoleBaseUrl}${this.updateSkill}?SkillId=${id}`;
    return this.http.post(url, rule);
  }
  GetVoiceToken(slug:any){
    return this.http.get(`${this.IdentityBaseUrl}${this.getVoiceToken}?actorSlug=${slug} `,{ responseType: 'text' })
  }
  GetAllTeams(body: any) {
    return this.http.post(this.IdentityBaseUrl + this.getAllTeams, body);
  }
  // DeleteSignalTeam(delSkill: any): Observable<any> {
  //   return this.http.post(this.IdentityBaseUrl + this.deleteTeams, delSkill);
  // }
  AddTeam(body: any) {
    return this.http.post(this.IdentityBaseUrl + this.addTeam, body);
  }
  UpdateTeam(body: any) {
    return this.http.post(this.IdentityBaseUrl + this.updateTeam, body);
  }
  GetTeamType() {
    return this.http.get(this.IdentityBaseUrl + this.getTeamType);
  }
  DeleteSignalTeam(id: any) {
    return this.http.get(
      `${this.IdentityBaseUrl}${this.deleteTeams}?id=${id}`
    );
  }
  TeamGetById(id: number) {
    const url = `${this.IdentityBaseUrl}${this.teamGetById}/${id}`;
    return this.http.get(url);
  }
  DeleteMultipleTeams(data: any) {
    return this.http.delete(
      this.IdentityBaseUrl + this.deleteMultipleTeams,
      data
    );
  }
  WhatsappBotInteraction(body: any) {
    return this.http.post(
      this.WhatsappBaseUrl + this.whatsappBotInteraction,
      body
    );
  }
  GetInteractionReport(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.getInteractionReport,
      body
    );
  }
  GetAllWing() {
    return this.http.get(this.IdentityBaseUrl + this.getAllWing);
  }
  GetRoles() {
    return this.http.get(this.IdentityBaseUrl + this.getUserRoles);
  }
  GetPlatorm() {
    return this.http.get(this.ConsoleBaseUrl + this.getPlatorm);
  }
  GetConsoleEntities(serviceId: any): Observable<any> {
    const url = `${this.ConsoleBaseUrl}${this.getConsoleEntities}?serviceId=${serviceId}`;
    return this.http.post<any>(url, {});
  }
  GetConsoleEntityProperties(entityId: any) {
    const url = `${this.ConsoleBaseUrl}${this.getConsoleEntityProperties}?entityId=${entityId}`;
    return this.http.get<any>(url, {});
  }
  GetRuleType() {
    return this.http.get(this.ConsoleBaseUrl + this.getRuleType);
  }
  GetRuleTag(id: any) {
    const url = `${this.ConsoleBaseUrl}${this.getRuleTag}?id=${id}`;
    return this.http.get<any>(url, {});
  }
  GetServicetree() {
    return this.http.get(this.ConsoleBaseUrl + this.getServicetree);
  }
  GetTemplateStatus(id: any, status: boolean) {
    const url = `${this.autoresponderbaseurl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetInstaTemplateStatus(id: any, status: boolean) {
    const url = `${this.InstagramBaseUrl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetLinkedinTemplateStatus(id: any, status: boolean) {
    const url = `${this.linkdinBaseUrl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetWaTemplateStatus(id: any, status: boolean) {
    const url = `${this.whatsappBaseUrl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetPsTemplateStatus(id: any, status: boolean) {
    const url = `${this.playStoreBaseUrl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetGSuitTemplateStatus(id: any, status: boolean) {
    const url = `${this.gSuitBaseUrl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetYtTemplateStatus(id: any, status: boolean) {
    const url = `${this.youtubeBaseUrl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetMetaWaTemplateStatus(id: any, status: boolean) {
    const url = `${this.metaWhatsapp}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetExchangeEmailTemplateStatus(id: any, status: boolean) {
    const url = `${this.exchangeEmailBaseUrl}${this.getTemplateStatus}?templateId=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }

  DeleteTemplate(id: any) {
    const url = `${this.autoresponderbaseurl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeleteInstaTemplate(id: any) {
    const url = `${this.InstagramBaseUrl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeleteLinkedinTemplate(id: any) {
    const url = `${this.linkdinBaseUrl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeleteExchangeTemplate(id: any) {
    const url = `${this.exchangeEmailBaseUrl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeleteMetaWaTemplate(id: any) {
    const url = `${this.metaWhatsapp}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeleteYTTemplate(id: any) {
    const url = `${this.youtubeBaseUrl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeletePsTemplate(id: any) {
    const url = `${this.playStoreBaseUrl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeleteGsuitTemplate(id: any) {
    const url = `${this.gSuitBaseUrl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }
  DeleteWaTemplate(id: any) {
    const url = `${this.whatsappBaseUrl}${this.deleteTemplate}?templateId=${id}`;
    return this.http.get<any>(url, {});
  }

  GetPolicyByWing(wing: string) {
    const url = `${this.ConsoleBaseUrl}${this.getPolicyByWing}?Id=${wing}`;
    return this.http.get(url);
  }
  GetCompanyTeams() {
    return this.http.get(this.IdentityBaseUrl + this.getCompanyTeams);
  }
  GetWings(){
    var ConsoleBaseUrl = "https://console-engage.enteract.app/api/";
    return this.http.get(ConsoleBaseUrl + "Tags/GetCompanyWings");
  }
  GetRuleStatus(id: any, status: boolean) {
    const url = `${this.autoresponderbaseurl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }

  GetInstaRuleStatus(id: any, status: boolean) {
    const url = `${this.InstagramBaseUrl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetWaRuleStatus(id: any, status: boolean) {
    const url = `${this.whatsappBaseUrl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetPsRuleStatus(id: any, status: boolean) {
    const url = `${this.playStoreBaseUrl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetGSuitRuleStatus(id: any, status: boolean) {
    const url = `${this.gSuitBaseUrl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetYTRuleStatus(id: any, status: boolean) {
    const url = `${this.youtubeBaseUrl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetLinkdinRuleStatus(id: any, status: boolean) {
    const url = `${this.linkdinBaseUrl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetMetaWARuleStatus(id: any, status: boolean) {
    const url = `${this.metaWhatsapp}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  GetExchangeEmailRuleStatus(id: any, status: boolean) {
    const url = `${this.exchangeEmailBaseUrl}${this.getRuleStatus}?Id=${id}&status=${status}`;
    return this.http.get<any>(url, {});
  }
  AddTagTeams(tagteam: any) {
    var url = "https://console-engage.enteract.app/api/"
    return this.http.post(
      url + this.addTagTeams,
      tagteam
    );
  }
  UpdateTagTeams(tagteam: any) {
    return this.http.post(
      this.ConsoleBaseUrl + this.updateTagTeams,
      tagteam
    );
  }
  DeleteTagTeam(id: any): Observable<any> {
    const url = `${this.ConsoleBaseUrl}${this.deleteTagTeam}?Id=${id}`;
    return this.http.get(url);
  }

  GetSkillTeamById(skillTeamId: string) {
    const url = `${this.ConsoleBaseUrl}${this.getSkillTeamById}?Id=${skillTeamId}`;
    return this.http.get(url);
  }
  GetTagBySupreamId(id: number) {
    return this.http.get(`${this.ConsoleBaseUrl + this.getTagsBySupreamId}?id=${id} `)
      ;
  }



  AddAccessReports(reports: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.addAccessReports,
      reports
    );
  }

  GetActors() {
    return this.http.get(`${this.IdentityBaseUrl + this.getActors}?roles=${57}&roles=${58}`);
  }

  GetReports(teamSlug: any) {
    return this.http.post(this.ReportsBaseUrl + this.getReports, teamSlug)
  }
  GetemailReport(body: any) {
    return this.http.post(this.ReportsBaseUrl + this.emailReport, body)
  }
  GetwallboradReport() {
    return this.http.get(this.ReportsBaseUrl + this.wallboardReport)
  }
  GetPerviousWallboardReport() {
    return this.http.get(this.ReportsBaseUrl + this.perviousWallboardReport)
  }
  GetWallboardCsatReport() {
    return this.http.get(this.ProfileBaseUrl + this.wallboardCSATReport)
  }
  GetMonthToDateServiceLevel() {
    return this.http.get(this.ReportsBaseUrl + this.getMonthToDateServiceLevel)
  }
  GetPreviousInteractionDashboard(body: any) {
    return this.http.post(
      this.ReportsBaseUrl + this.getPreviousInteractionDashboard,
      body
    );
  }
  getAdminPenalMenus(){
    return this.http.get(this.adminPanelBaseUrl+this.endPoint + this.AdminPanelToken)
  }
  GetSlaReponder(slug:any){
    return this.http.get(`${this.ConsoleBaseUrl}${this.SlaResponder}?Id=${slug}`)
  }
  GetCastRawDataReport(body:any){
    return this.http.post(this.ProfileBaseUrl + this.castRawDataReport,body)
  }
  GetCompanyWingsForReporting(){
    return this.http.get(this.ConsoleBaseUrl + this.getCompanyWings)
  }

}
