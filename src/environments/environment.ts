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
  title: 'Engage V2',
  IdentityBaseUrl: 'http://localhost:5036/api',
  InstaBaseUrl: 'https://insta.360scrm.com/api/', // other then post and data
  FbBaseUrl: 'https://face.360scrm.com/api/',
  YoutubeBaseUrl: 'https://tube.360scrm.com/api/',
  TwitterBaseUrl: 'https://tweet.360scrm.com/api/',
  EmailBaseUrl: 'https://mail.360scrm.com/api/',
  SmsBaseUrl: 'https://text.360scrm.com/api/',
  WhatsappBaseUrl: 'https://whats.360scrm.com/api/',
  WebChatBaseUrl: 'https://chat.360scrm.com/api/',
  CommonBaseUrl: 'https://common-engage.enteract.app/api/',
  
  links: {
    identity:{
      login:"Authentication/Login",
      access:"Authorization/Accesses/team_role",
      accessteam:"Accesses/team",
      accessrole:"Permissions/role",
      AddUser:"Users/CreateUser",
      UpdateUser:"Users/UpdateUser",
      AllRoles:"Roles/GetAll",
      AllTeams:"Teams/GetAll",
      GetAllUsers:"Users/GetAllUser",
      DeleteUser:"Users/DeleteUser",
      GetUserById:"Users/GetUserById",
      RolesPermissions:"Permissions",
      AddRole:"Permissions",
      TeamsAccesses:"Accesses",
      AddTeam:"Accesses",
      

    },
    console:{
      AddUser:"Users/CreateUser",
    },
    common: {
      RemoveTags: 'Tags/RemoveTagFromFeed',
      InsertSentiments: 'Tags/InsertSentimentForFeed',
      InsertTags: 'Tags/InsertTagsForFeed',
      ChannelList: 'Channel/GetChannelList',
      TagsList: 'Keyword/GetAllKeywordCategory',
      CommentRespond: 'Social/CommentRespond',
      MarkAsComplete: 'Social/MarkAsCompleted',
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
      UpdateBreak:"Team/UpdateBreaks",
      InstaStats:"Channel/GetInstagramPostStat",
      FbPostStats: 'Channel/GetFbPostStat',
      FbCommentStats: 'Channel/GetFbCommentStat',
      YoutubePostStats: 'Channel/GetYoutubePostState',
      Menu: 'Menu/'
      
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
