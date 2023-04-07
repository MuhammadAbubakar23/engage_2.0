// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  fetchIntegrate: 'true',
  appKey: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibXVoYW1tYWQucml4dmFuLndhaGVlZEBnbWFpbC5jb20iLCJleHAiOjE2NzYyMzA4MjYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzY5LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.NlSFdJSUQfDF0_hbXkfL_smZkfV8b9KFt4ToBFZDzO0',
  store: {
    types: { local: 'LS' },
  },
  title: 'abc',
  IdentityBaseUrl: 'https://identity-engage.enteract.app/api',
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

  links: {
    identity:{
      login:"Authentication/Login",
      access:"Authorization/Accesses/team_role",
      accessteam:"Authorization/Accesses/team",
      accessrole:"Authorization/Accesses/role",
      AddUser:"Users/CreateUser",
      UpdateUser:"Users/UpdateUser",
      AllRoles:"Roles/GetAll",
      AllTeams:"Teams/GetAll",
      GetAllUsers:"Users/GetAllUser",
      DeleteUser:"Users/DeleteUser",
      GetUserById:"Users/GetUserById",

    },
    console:{
      AddUser:"Users/CreateUser",
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
      AgentsTeamList: 'Query/GetActiveAgent',
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
      markAllAsRead : 'Channel/ReadAllUnrespondedQuries'
      
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
