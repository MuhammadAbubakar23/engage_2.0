export const environment = {
  production: false,
  fetchIntegrate: 'true',
  appKey: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVoYW1tYWQucml4dmFuLndhaGVlZEBnbWFpbC5jb20iLCJleHAiOjE2NzYyMzA4MjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.NlSFdJSUQfDF0_hbXkfL_smZkfV8b9KFt4ToBFZDzO0',
  googleclientId:'867983649889-mu8n73d0clq5qvan437dmop87a9ofhot.apps.googleusercontent.com',
  googleclientSecret:'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',
  facebookclientId:'439165040679685',
  facebookclientSecret:'b1ece7f6d042edefbb22c87815804c5b',
  instagramclientId:'243324534762428',
  instagramclientSecret :'b48f01922a081352c29ed641abbc4f1b',
  linkdinclientId:'86gfpczqqo16t6',
  linkdinclientSecret :'4wp2Zjzqjw3PYAdt',
  twitterclientId:'57617762-IWEThd14hGdgr3bXuVNmLdb60Lo9OLEVJ1cFUE4JF',
  twitterclientSecret :'Ex1XpdfYMFEAtWBJn9XOrtfxyu19INzNaPV155vocLomG',
  store: {
    types: { local: 'LS' },
  },
  title: 'abc',
  IdentityBaseUrl: 'https://identity-engage.enteract.app/api', // 'http://localhost:5036/api',
  InstaBaseUrl: 'https://insta.360scrm.com/api/', // other then post and data
  FbBaseUrl: 'https://face.360scrm.com/api/',
  YoutubeBaseUrl: 'https://tube.360scrm.com/api/',
  TwitterBaseUrl: 'https://tweet.360scrm.com/api/',
  EmailBaseUrl: 'https://mail.360scrm.com/api/',
  SmsBaseUrl: 'https://text.360scrm.com/api/',
  WhatsappBaseUrl: 'https://whats.360scrm.com/api/',
  WebChatBaseUrl: 'https://chat.360scrm.com/api/',
  CommonBaseUrl: 'https://common-engage.enteract.app/api/',
  CCMSURL: 'https://haccms.ibex.co/jomo/api/',

  JomoAccessToken: '407ecdb2308d5cc24e9f5d24a779e4a3151357bb',
  // for testing purpose 
  // consoleBaseUrl: 'https://10.111.32.97:45458/api',
  consoleBaseUrl: 'https://console-engage.enteract.app/api/',

  links: {
    identity:{
      login:"Authentication/Login",
      accesses:"Teams/Accesses",
      properties:"Teams/Properties",
      permissions:"Roles/Permissions",
      accessteam:"Accesses/team",
      accessrole:"Permissions/role",
      permissionteam:"Accesses/team",
      permissionrole:"Permissions/role",
      RolesPermissions:"Permissions",
      TeamsAccesses:"Accesses",
      
      AddRole:"Permissions",
      AddTeam:"Accesses",
      TeamProperties:"Teams/PropAccesses",
      RoleProperties:"Roles/PropPermis",

      AllRoles:"Roles/GetAll",
      AllTeams:"Teams/GetAll",

      AddUser:"Users/CreateUser",
      UpdateUser:"Users/UpdateUser",
      GetAllUsers:"Users/GetAllUser",
      DeleteUser:"Users/DeleteUser",
      GetUserById:"Users/GetUserById", 
      

    },
    console:{
      AddUser:"Users/CreateUser",
      CreateMessageTemplate:"Template/Add",
      getAllMessages:'Template/GetAll',
      addTemplate:'Template/Add',
      updateTemplate:'Template/Update',
      deleteMessages: 'Template/Delete',
      getQuickReply : 'QuickReply/GetAll', 
      addQuickReply : 'QuickReply/Add',
      updateQuickReply: 'QuickReply/Update',
      deleteQuickReply : 'QuickReply/Delete',
      getSlaPolicy : 'SLAPolicies/GetAll',
      addSlaPolicy : 'SLAPolicies/Add',
      updateSlaPolicy : 'SLAPolicies/Update',
      getPolicyById : 'SLAPolicies/GetById',
      deleteSlaPolicy : 'SLAPolicies/Delete',
      getOperationalHours : 'SLAPolicies/GetOperationalHours'
    },
    CCMS:{
      reason_types:'Order/GetReasonTypes',
      reasons:'Order/GetMainReasons/',
      GetTicketStatuses:'Order/GetTicketStatuses',
      subReasons:'Order/GetSubReasons/'
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
      AgentsTeamList: 'Team/GetAllTeams',
      AssignToAnotherAgent: 'Query/QueryAssignMultiUser',
      SlaList:"Report/GetSLAChannelList",
      SlaDetail:"Report/GetSLADetailList",
      SlaDM:"Report/GetSLA_DM",
      ConversationDetail:"Channel/GetChannelConversationDetail",
      MessageDetail:"Channel/GetDMByPlatform",
      ReplyComment:"Channel/ReplyChannelComment",
      HumanAgentTags:"Tags/GetHumanAgentTag",
      AgentDetail:"Team/GetById",
      UpdateBreak:"SignalRConnector/UserOnBreak",
      InstaStats:"Channel/GetInstagramPostStat",
      FbPostStats: 'Channel/GetFbPostStat',
      FbCommentStats: 'Channel/GetFbCommentStat',
      YoutubePostStats: 'Channel/GetYoutubePostStat',
      TwitterTweetStats: 'Channel/GetTwitterTweetStat',
      LinkedInPostStats: 'Channel/GetLinkedInPostStats',
      Menu: 'Menu/',
      queryCompleted:'Social/QueryCompleted',
      profileDetails: 'Customer/GetCustomerById',
      updateProfile:'Customer/UpdateCustomer',
      createTicket:'Tickets/CreateTicket',
      allChannelsUnrespondedCounts: 'Channel/GetChannelUnrespondedCount',
      getOrderByCustomerEmailAddressOrPhoneNumber: 'Order/GetOrdersByCustomerEmailAddress',
      dispositionHistory : 'Channel/GetDispositionHistory',
      markAllAsRead : 'Channel/ReadAllUnrespondedQuries',
      getAgentReport : 'Report/GetAgentTicketReport',
      getAllocatedProfiles : 'Query/GetAllocatedProfiles',
      repliesList: 'SentQueries/GetRepliesList'
      
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
  },
};
