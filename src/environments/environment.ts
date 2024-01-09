// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  fetchIntegrate: 'true',
  appKey:
    'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVoYW1tYWQucml4dmFuLndhaGVlZEBnbWFpbC5jb20iLCJleHAiOjE2NzYyMzA4MjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.NlSFdJSUQfDF0_hbXkfL_smZkfV8b9KFt4ToBFZDzO0',
  googleclientId:
    '867983649889-mu8n73d0clq5qvan437dmop87a9ofhot.apps.googleusercontent.com',
  googleclientSecret: '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',
  facebookclientId: '439165040679685',
  facebookclientSecret: 'b1ece7f6d042edefbb22c87815804c5b',
  instagramclientId: '243324534762428',
  instagramclientSecret: 'b48f01922a081352c29ed641abbc4f1b',
  linkdinclientId: '86gfpczqqo16t6',
  linkdinclientSecret: '4wp2Zjzqjw3PYAdt',
  twitterclientId: '57617762-IWEThd14hGdgr3bXuVNmLdb60Lo9OLEVJ1cFUE4JF',
  twitterclientSecret: 'Ex1XpdfYMFEAtWBJn9XOrtfxyu19INzNaPV155vocLomG',
  store: { types: { local: 'LS' } },
  title: 'abc',

  InstaBaseUrl: 'https://insta.360scrm.com/api/',
  // FbBaseUrl: 'https://face.360scrm.com/api/',
  FbBaseUrl: 'https://nextsparklypen70.conveyor.cloud/api/',
  YoutubeBaseUrl: 'https://tube.360scrm.com/api/',
  TwitterBaseUrl: 'https://tweet.360scrm.com/api/',
  EmailBaseUrl: 'https://mail.360scrm.com/api/',
  SmsBaseUrl: 'https://text.360scrm.com/api/',
  WhatsappBaseUrl: 'https://whats.360scrm.com/api/',
  WebChatBaseUrl: 'https://chat.360scrm.com/api/',
  LinkedInBaseUrl: 'https://linked.360scrm.com/api/',
  KelisteningBaseUrl:'https://listen.enteract.live/backend/api/',
  KemediaBaseUrl:'https://kemedia.360scrm.com/api/',
  KescrmBaseUrl:'https://kescrm.360scrm.com/',

  // ProfilerBaseUrl:'https://profiler.enteract.app/api/',

  // For KE
  IdentityBaseUrl: 'https://idtservice.enteract.live/api',
  CommonBaseUrl: 'https://comservices.enteract.live/api/',
  SignalRCommonBaseUrl: 'https://comservices.enteract.live/',
  ProfileBaseUrl: 'https://profiler.enteract.live/api/',
  // //  https://common.jazz.com.pk:8080 //https://comservices.enteract.live
  // ProfileBaseUrl:'https://profiler.enteract.live/api/',

  // For Jazz
  // IdentityBaseUrl: 'https://identity-engage.enteract.app/api',
  // CommonBaseUrl: 'https://common.jazz.com.pk:8080/api/',
  // SignalRCommonBaseUrl: 'https://common.jazz.com.pk:8080/',

  // For Total Parco
  // IdentityBaseUrl: 'https://tpplidp.360scrm.com/api',
  // CommonBaseUrl: 'https://tpplcom.360scrm.com/api/',
  // SignalRCommonBaseUrl: 'https://tpplcom.360scrm.com/',
  // consoleBaseUrl: 'https://tpplcons.360scrm.com/api/',

  // For Morinaga
  // IdentityBaseUrl: 'https://waidentity.enteract.live/api',
  // CommonBaseUrl: 'https://wacommon.enteract.live/api/',
  // SignalRCommonBaseUrl: 'https://wacommon.enteract.live/',
  ServiceBaseUrl: 'https://waservice.enteract.live/api/',
  // consoleBaseUrl: 'https://waconsole.enteract.live/api/',
  

  // For Testing
  // IdentityBaseUrl: 'https://identity-engage.enteract.app/api',
  //  CommonBaseUrl: 'https://common-engage.enteract.app/api/',
  // SignalRCommonBaseUrl: 'https://common-engage.enteract.app/',
  // ProfileBaseUrl: 'https://profiler.enteract.app/api/',
  
   //https://profiler.entract.live/
  consoleBaseUrl: 'https://console-engage.enteract.app/api/',

  CCMSURL: 'https://haccms.ibex.co/jomo/api/',

  JomoAccessToken: '407ecdb2308d5cc24e9f5d24a779e4a3151357bb',
  // for testing purpose
  // consoleBaseUrl: 'http://10.111.11.93:45455/api/',
  //  consoleBaseUrl: '',

  links: {
    identity: {
      login: 'Authentication/Login',
      //Company:"Teams/FetchAll",
      accesses: 'Teams/Accesses',
      properties: 'Teams/Properties',
      accessteam: 'Teams/Previews',
      permissionteam: 'Teams/Previews',
      TeamsAccesses: 'Teams/Fetch',
      AllTeams: 'Teams/FetchAll', // new to review
      AddTeam: 'Accesses/Teams',
      TeamProperties: 'Accesses/Properties',
      accessrole: 'Roles/Previews', //"Permissions/role",
      permissionrole: 'Roles/Previews', //"Permissions/role",
      RolesPermissions: 'Roles/Fetch',
      permissions: 'Roles/Permissions',
      RoleProperties: 'Permissions/Properties',
      AddRole: 'Permissions/Roles',
      UserRoles: 'Roles/Users',
      UserTeams: 'Teams/Users',
      AddUser: 'Identity/Add',
      UpdateUser: 'Identity/Update',
      DeleteUser: 'Identity/Delete',
      AllUsers: 'Users/GetAll',
      GetUserById: 'Users/GetById',
      // For console skill setup
      channels: 'Console/Properties/Channel/Tree/0',
      routing: 'Console/Properties/routing/Tree/0',
      deleteRoles: '/Permissions/Delete',
    },
    console: {
      AddUser: 'Users/CreateUser',
      CreateMessageTemplate: 'Template/Add',
      getAllMessages: 'Template/GetAll',
      addTemplate: 'Template/Add',
      updateTemplate: 'Template/Update',
      deleteMessages: 'Template/Delete',
      getQuickReply: 'QuickReply/GetAll',
      addQuickReply: 'QuickReply/Add',
      updateQuickReply: 'QuickReply/Update',
      deleteQuickReply: 'QuickReply/Delete',
      getSlaPolicy: 'SLAPolicies/GetAll',
      addSlaPolicy: 'SLAPolicies/Add',
      updateSlaPolicy: 'SLAPolicies/Update',
      getPolicyById: 'SLAPolicies/GetById',
      deleteSlaPolicy: 'SLAPolicies/Delete',
      getOperationalHours: 'SLAPolicies/GetOperationalHours',
      getBusinessHours: 'BusinessHours/GetAll',
      addBusinessHours: 'BusinessHours/Add',
      deleteBusinessHours: 'BusinessHours/Delete',
      updateBusinessHours: 'BusinessHours/Update',
      getBusinessById: 'BusinessHours/GetById',
      getEntractRoute: 'EnteractRoute/GetAll',
      addEntractRoute: 'EnteractRoute/Add',
      updateEntractRoute: 'EnteractRoute/Update',
      deleteEntractRoute: 'EnteractRoute/Delete',
      getSkills: 'Skill/GetAll',
      addSkill: 'Skill/Add',
      deleteSkill: 'Skill/Delete',
      getAllProfile: 'Profile/GetAll',
      addProfile: 'Profile/Add',
      attachFacebookPage: 'ProfileManagement/RegisterProfile',
      getTags: 'Tags/GetAll',
      getTagById: 'Tags/GetById',
      addTags: 'Tags/Add',
      updateTag: 'Tags/Update',
      deleteTags: 'Tags/Delete',
      getParents: 'Tags/GetParents',
      getAllRules: 'Rules/GetAll',
      getEntitiesRule: 'Rules/GetEntities',
      getRuleEntityProperties: 'Rules/GetEntitiesProperties/',
      getRuleById: 'Rules/GetById',
      addRules: 'Rules/Add',
      updateRules: 'Rules/Update',
      deleteRules: 'Rules/Delete',
      defaultTags: 'Tags/GetTags',
    },
    service: {
      addSurvey: 'Whatsapp/AddSurvey',
      addCSAT: 'Whatsapp/AddCSAT',
    },
    CCMS: {
      reason_types: 'Order/GetReasonTypes',
      reasons: 'Order/GetMainReasons/',
      GetTicketStatuses: 'Order/GetTicketStatuses',
      subReasons: 'Order/GetSubReasons/',
    },
    common: {
      RemoveTags: 'Tags/RemoveTagFromFeed',
      InsertSentiments: 'Tags/InsertSentimentForFeed',
      InsertTags: 'Tags/InsertTagsForFeed',
      ChannelList: 'Channel/GetChannelList',
      TagsList: 'Keyword/GetAllKeywordCategory',
      CommentRespond: 'Social/CommentRespond',
      MarkAsComplete: 'Social/MarkAsCompleted',
      SaveAsCompleted: 'Social/SaveAsCompleted',
      LikedByAdmin: 'Social/LikeByAdmin',
      QuickReplyList: 'Social/GetQuickReplyList',
      AssignQuerry: 'Query/AssignQuery',
      AgentsTeamList: 'Query/GetActiveAgent',
      AssignToAnotherAgent: 'Query/QueryAssignMultiUser',
      SlaList: 'Report/GetSLAChannelList',
      SlaDetail: 'Report/GetSLADetailList',
      SlaDM: 'Report/GetSLA_DM',
      ConversationDetail: 'Channel/GetChannelConversationDetail',
      MessageDetail: 'Channel/GetDMByPlatform',
      ReplyComment: 'Channel/ReplyChannelComment',
      HumanAgentTags: 'Tags/GetHumanAgentTag',
      AgentDetail: 'Team/GetById',
      UpdateBreak: 'SignalRConnector/UserOnBreak',
      InstaStats: 'Channel/GetInstagramPostStat',
      FbPostStats: 'Channel/GetFbPostStat',
      FbCommentStats: 'Channel/GetFbCommentStat',
      YoutubePostStats: 'Channel/GetYoutubePostStat',
      TwitterTweetStats: 'Channel/GetTwitterTweetStat',
      LinkedInPostStats: 'Channel/GetLinkedInPostStats',
      Menu: 'Menu/',
      queryCompleted: 'Social/QueryCompleted',
      profileDetails: 'Customer/GetCustomerById',
      updateProfile: 'Customer/UpdateCustomer',
      createTicket: 'Tickets/CreateTicket',
      allChannelsUnrespondedCounts: 'Channel/GetChannelUnrespondedCount',
      getOrderByCustomerEmailAddressOrPhoneNumber:
        'Order/GetOrdersByCustomerEmailAddress',
      dispositionHistory: 'Channel/GetDispositionHistory',
      markAllAsRead: 'Channel/ReadAllUnrespondedQuries',
      getAgentReport: 'Report/GetAgentTicketReport',
      getAllocatedProfiles: 'Query/GetAllocatedProfiles',
      repliesList: 'SentQueries/GetRepliesList',
      signOut: 'SignalRConnector/UserLogout',
      getCustomers: 'Customer/GetAllCustomersSocialProfile',
      updateStatus: 'Channel/UpdateMessageStatus',
      insertTagOnProfile: 'Tags/InsertTagsProfileFeed',
      removeTagOnProfile: 'Tags/RemoveTagProfileFeed',
      hideUnhideMessage: 'Publisher/HideQuery',
      dispositionTags: 'Keyword/GetAllDisposition',
      removeAssignedQuery: 'Query/RemoveAssignQuery',
      //Reports
      routeToAgents: 'Report/GetWhatsAppRouteToAgentReport',
      routeToAgentsCsv: 'Report/GetWhatsAppRouteAgentReportCSV',
      addUniqueCustomer: 'Report/GetWhatsAppUniqueCustomerReport',
      uniqueExportCsv: 'Report/GetWhatsAppUniqueCustomerReportCSV',
      addHandledBot: 'Report/GetWhatsAppBotHandleReport',
      addHandledBotCSV: 'Report/GetWhatsAppBotHandleReportCSV',
      addinboundoutbound: 'Report/GetInboundOutboundReport',
      twitterReport: 'Report/GetTwitterReport',
      twitterSLAReport: 'Report/GetTwitterSLAReport',
      twitterProfileWiseReport: 'Report/GetTwitterProfileWiseReport',
      getUserList: '/Users/GetUserList',
      getSentimentData: 'Keyword/GetAllSentiments',
      addAgentPerformance: 'Report/GetAgentPerformanceReport',
      shiftReport: 'Report/GetShiftReport',
      getWhatsAppRawDataReport: 'Report/GetWhatsAppRawDataReport',
      downloadWhatsAppRawDataReport: 'Report/GetWhatsAppCSVData',
      postSocialRawData: 'Report/GetAllChannelRawDataReport',
      downloadSocialRawData: 'Report/GetAllChannelRawDataReportCSV',
      facebookReport: 'Report/GetFacebookReport',
      facebookProfile: 'Report/GetFacebookProfileWiseReport',
      getAllSocialMatrics: 'Report/GetAllSocialMediaMatricsReport',
      instagramReport: 'Report/GetInstagramReport',
      instagramProfile: 'Report/GetInstagramProfileWiseReport',
      getTagReport: 'Report/GetTagsReport',
      downloadTagReport: 'Report/GetAgentTagsReportCSV',
      getLinkedInReport: 'Activity/GetOrganizationSharedInsights',
      emailShiftReport: 'Report/EmailShiftReport',
      getLinkedInFollowers: 'Activity/GetOrganizationInsights',
      regionwiseReport: 'Report/GetRegionWiseReport',
      wordCloud:'Report/GetKeWordCloud',
      areawiseReport:'Report/GetAreaWiseReport',
      keMediaReport:'MediaReport/GetMediaReport',
      PrintFeed:'Media/GetMediaPrintList'
    },
    scrmReports:{
      facebookscrmReport:'Facebook/FacebookGetPageReportStats',
      getfortesting:'/feedback/GetAllCampaignsWithCSAT'
    },
    facebook: {
      comments: 'Facebook/GetFbPost',
      messages: 'Facebook/GetFbDM',
      ProfileList: 'Facebook/GetFacebookProfileList',
      CommentReply: 'Facebook/CommentsReply',
      PageChatReply: 'Facebook/PageChatReplies',
      PostStats: 'Channel/GetFbPostStat',
      CommentStats: 'Channel/GetFbCommentStat',
    },
    instagram: {
      comments: 'Instagram/GetInstagramData',
      list: 'Instagram/GetChannelList',
      commentReply: 'Instagram/CommentReplayThread',
      postStats: 'Instagram/GetPostStat',
    },
    whatsapp: {
      messages: 'Whatsapp/GetWhatsappData',
      list: 'Whatsapp/GetWhatsappChannelList',
    },
    sms: {
      messages: 'SMS/GetSMSData',
      list: 'SMS/GetSMSChannelList',
      messageReply: 'SMS/SendSMSReply',
    },
    email: {
      emails: 'Email/GetMails',
      list: 'Email/GetLatestUnrespondedMails',
      emailReply: 'Email/SendEmailReply',
    },
    youtube: {
      comments: 'Youtube/GetPostsComments',
      list: 'Youtube/GetYoutubeAllUnresponded',
      commentReply: 'Youtube/CommentsReply',
      postStats: 'Youtube/GetPostsStats',
    },
    webChat: {
      messages: 'WebChat/GetUserChat',
      list: 'WebChat/GetUserList',
      messageReply: 'WebChat/SaveAgentReply',
    },
    profile: {
      KECSAT: 'CustomerCSAT/AddCSAT',
      getProfileInformationByID: 'ProfileInformation/GetProfileInformationByID',
      addProfileInformation: 'ProfileInformation/AddProfileInformation',
      searchProfileInformation: 'ProfileInformation/GetCustomerInformationByID',
      deattachProfileInformation:'ProfileInformation/DeAttachProfile',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
