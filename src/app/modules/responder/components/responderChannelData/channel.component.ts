import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommentStatusDto } from 'src/app/shared/Models/CommentStatusDto';
import {
  commentsDto,
  conversationDetailDto,
  messagesDto,
  newpostcommentDto,
  postStatsDto,
} from 'src/app/shared/Models/concersationDetailDto';
import { ReplyDto } from 'src/app/shared/Models/ReplyDto';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { InsertSentimentForFeedDto } from 'src/app/shared/Models/InsertSentimentForFeedDto';
import { InsertTagsForFeedDto } from 'src/app/shared/Models/InsertTagsForFeedDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { Subscription } from 'rxjs';
import { LikeByAdminDto } from 'src/app/shared/Models/LikeByAdminDto';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { AddTagService } from 'src/app/services/AddTagService/add-tag.service';
import { RemoveTagService } from 'src/app/services/RemoveTagService/remove-tag.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from 'src/app/services/UpdateCommentsService/update-comments.service';
import { UpdateMessagesService } from 'src/app/services/UpdateMessagesService/update-messages.service';
import { ReplyService } from 'src/app/services/replyService/reply.service';
import { QueryStatusService } from 'src/app/services/queryStatusService/query-status.service';
import { CreateTicketService } from 'src/app/services/CreateTicketService/create-ticket.service';
import { TicketResponseService } from 'src/app/shared/services/ticketResponse/ticket-response.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { UserInformationService } from 'src/app/services/userInformationService/user-information.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
import {
  DMData,
  ManipulatedDMDto,
} from 'src/app/shared/Models/ManipulatedDMDto';
import { SkillIdsService } from 'src/app/services/sendSkillIds/skill-ids.service';
import { SkillslugService } from 'src/app/services/skillSlug/skillslug.service';
import { ConnectionIdService } from 'src/app/services/connectionId/connection-id.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { AudioRecordingService } from 'src/app/shared/services/audioRecording/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit {
  backgroundColorClass: string = '';
  iconClass: string = '';
  mentionedCommentOrMessage: string = '';
  instagramBusinessAccountId: string = '';
  baseUrl: string = '';
  activeClient: string = '';
  DMPlatform: string = '';
  activeDropdown: number | null = null;
  activeInnerDropdown: {
    parentIndex: number | null;
    childIndex: number | null;
  } = { parentIndex: null, childIndex: null }; // Initialize to null
  showLikeBtnTo: string = 'facebook, linkedin, youtube';
  showHideBtnTo: string = 'facebook';
  showGifBtnOnChannels: any[] = ['FC', 'FCP', 'IM'];
  showGifBtnToClients: any[] = ['localhost', 'staging', 'jazz'];
  showAttachmentBtnTo: any[] = ['FC', 'FCP', 'IM', 'WM', 'LIC'];
  commentTab: any[] = ['FC', 'IC', 'YC', 'LIC', 'PSR', 'WM'];
  messageTab: any[] = ['FCP', 'IM', 'TM', 'TDM', 'TTR', 'SMS'];
  showCustomerSatistactionForm: any[] = [
    'localhost',
    'staging',
    'ke',
    'morinaga',
  ];
  showCustomerInformationForm: any[] = ['localhost', 'staging', 'morinaga'];
  DMTab: boolean = false;
  CmntTab: boolean = false;
  NewCmntTab: boolean = false;
  MentionTab: boolean = false;
  TweetTab: boolean = false;
  totalUnrespondedMentionCountByCustomer: number = 0;
  TotalMentionQueryCount: number = 0;
  mentionsArray: any[] = [];
  groupedMentions: any[] = [];
  groupedTweets: any[] = [];
  TMReply: boolean = false;
  TTReply: boolean = false;
  Emojies = [
    { id: 1, emoji: '🙁', tile: 'sad' },
    { id: 2, emoji: '😀', tile: 'happy' },
    { id: 3, emoji: '😇', tile: 'bleassed' },
    { id: 4, emoji: '😊', tile: 'smile' },
    { id: 5, emoji: '😔', tile: 'ohh' },
    { id: 6, emoji: '😧', tile: 'worried' },
    { id: 7, emoji: '👌', tile: 'superb' },
    { id: 8, emoji: '👍', tile: 'thumbs up' },
    { id: 9, emoji: '🤩', tile: 'wow' },
  ];
  Gifs = [
    {
      id: 1,
      name: 'Excited_1',
      src: `${this.baseUrl}${'/assets/images/Gifs/excited_1.gif'}`,
    },
    {
      id: 2,
      name: 'Excited_2',
      src: `${this.baseUrl}${'/assets/images/Gifs/excited_2.gif'}`,
    },
    {
      id: 3,
      name: 'Excited_3',
      src: `${this.baseUrl}${'/assets/images/Gifs/excited_3.gif'}`,
    },
    {
      id: 4,
      name: 'Excited_4',
      src: `${this.baseUrl}${'/assets/images/Gifs/excited_4.gif'}`,
    },
    {
      id: 5,
      name: 'Excited_5',
      src: `${this.baseUrl}${'/assets/images/Gifs/excited_7.gif'}`,
    },
    {
      id: 6,
      name: 'Excited_6',
      src: `${this.baseUrl}${'/assets/images/Gifs/excited_6.gif'}`,
    },
    // {
    //   id: 7,
    //   name:'Excited_7',
    //   src: 'https://media.giphy.com/media/ZbUIi5RuPahtCN90OL/giphy.gif?cid=ecf05e47iwajtt9pygv589ngfjsocp5cl0lspqwp039ck556&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    // },
    {
      id: 8,
      name: 'thumbsUp_1',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_1.gif'}`,
    },
    {
      id: 9,
      name: 'thumbsUp_2',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_2.gif'}`,
    },
    {
      id: 10,
      name: 'thumbsUp_3',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_3.gif'}`,
    },
    {
      id: 11,
      name: 'thumbsUp_4',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_4.gif'}`,
    },
    {
      id: 12,
      name: 'thumbsUp_5',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_5.gif'}`,
    },
    {
      id: 13,
      name: 'thumbsUp_6',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_6.gif'}`,
    },
    {
      id: 14,
      name: 'thumbsUp_7',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_7.gif'}`,
    },
    {
      id: 15,
      name: 'thumbsUp_8',
      src: `${this.baseUrl}${'/assets/images/Gifs/thumbsUp_8.gif'}`,
    },
    {
      id: 16,
      name: 'Appreciate_Thank You_1',
      src: `${this.baseUrl}${'/assets/images/Gifs/thanks_1.gif'}`,
    },
    {
      id: 17,
      name: 'Appreciate_Thank You_2',
      src: `${this.baseUrl}${'/assets/images/Gifs/thanks_2.gif'}`,
    },
    {
      id: 18,
      name: 'Appreciate_Thank You_3',
      src: `${this.baseUrl}${'/assets/images/Gifs/thanks_3.gif'}`,
    },
    {
      id: 19,
      name: 'Appreciate_Thank You_4',
      src: `${this.baseUrl}${'/assets/images/Gifs/thanks_4.gif'}`,
    },
    {
      id: 20,
      name: 'Appreciate_Thank You_5',
      src: `${this.baseUrl}${'/assets/images/Gifs/thanks_5.gif'}`,
    },
    {
      id: 21,
      name: 'Appreciate_Thank You_6',
      src: `${this.baseUrl}${'/assets/images/Gifs/thanks_6.gif'}`,
    },
    {
      id: 22,
      name: 'Appreciate_Thank You_7',
      src: `${this.baseUrl}${'/assets/images/Gifs/thanks_7.gif'}`,
    },
    {
      id: 23,
      name: 'cool_1',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_1.gif'}`,
    },
    {
      id: 24,
      name: 'cool_2',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_2.gif'}`,
    },
    {
      id: 25,
      name: 'cool_3',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_3.gif'}`,
    },
    {
      id: 26,
      name: 'cool_4',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_4.gif'}`,
    },
    {
      id: 27,
      name: 'cool_5',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_5.gif'}`,
    },
    {
      id: 28,
      name: 'cool_6',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_6.gif'}`,
    },
    {
      id: 29,
      name: 'cool_7',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_7.gif'}`,
    },
    {
      id: 30,
      name: 'cool_8',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_8.gif'}`,
    },
    {
      id: 31,
      name: 'cool_9',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_9.gif'}`,
    },
    {
      id: 32,
      name: 'cool_10',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_10.gif'}`,
    },
    {
      id: 33,
      name: 'cool_11',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_11.gif'}`,
    },
    {
      id: 34,
      name: 'cool_12',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_12.gif'}`,
    },
    {
      id: 35,
      name: 'cool_13',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_13.gif'}`,
    },
    {
      id: 37,
      name: 'cool_14',
      src: `${this.baseUrl}${'/assets/images/Gifs/cool_14.gif'}`,
    },
  ];
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('textarea') textarea!: ElementRef;
  @ViewChild('Gif') Gif!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('radioInput', { static: false })
  radioInput!: ElementRef<HTMLInputElement>;
  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement) {
    this.adjustTextareaHeight(textarea);
  }
  Newpost: any[] = [];
  totalComments: number = 0;
  totalMessages: number = 0;
  flag: string = '';
  commentDto = new commentsDto();
  messageDto = new messagesDto();
  newpostcommentDto = new newpostcommentDto();
  updatedComments: any;
  updatedMessages: any;
  newPostComment: any[] = [];
  postIdArray: any[] = [];
  spinner1running = false;
  spinner2running = false;
  newcomment: any;
  addTags: any;
  removeTags: any;
  isAttachment = false;
  showGifButton: boolean = true;
  showAttachmentButton: boolean = true;
  newImageName: any;
  sendSelectedGif: any[] = [];
  isGifSelected: boolean = false;
  selectedGifFiles: any[] = [];
  userProfileId = 0;
  profileId: string = '';
  profilePageId: string = '';
  text: string = '';
  Comments: any;
  messageOrDM: any[] = [];
  TwitterMentions: any[] = [];
  TwitterTweets: any[] = [];
  TagsList: any[] = [];
  totalUnrespondedMsgCountByCustomer: any = 0;
  pageNumber: any = 1;
  pageSize: any = 10;
  commentIdForStats: any;
  newReply: any;
  queryStatus: any;
  userInformation: any;
  profileInformation: any;
  mentionedCommentOrMessageId: number = 0;
  agentId: any;
  platform: any;
  postType: any;
  ImageName: any;
  ImageArray: any[] = [];
  totalUnrespondedCmntCountByCustomer: number = 0;
  totalUnrespondedNewPostCmntCountByCustomer: number = 0;
  postIdForStats: any;
  pageIdForStats: any;
  totalPostReactionsCount: number = 0;
  totalCommentReactionsCount: number = 0;
  pageName: any = '';
  FbStats: any;
  AlterMsg: any = '';
  channelDM: ManipulatedDMDto[] = [];
  channelDMSingle: ManipulatedDMDto = new ManipulatedDMDto();
  TotalCmntQueryCount: number = 0;
  TotalMsgQueryCount: number = 0;
  TotalTweetQueryCount: number = 0;
  totalUnrespondedTweetCountByCustomer: number = 0;
  id = this.fetchId.getOption();
  slaId = this.fetchId.getSlaId();
  queryType = this.fetchPostType.postType;
  ReplyDto = new ReplyDto();
  ConverstationDetailDto = new conversationDetailDto();
  insertSentimentForFeedDto = new InsertSentimentForFeedDto();
  commentStatusDto = new CommentStatusDto();
  insertTagsForFeedDto = new InsertTagsForFeedDto();
  postStatsDto = new postStatsDto();
  filterDto = new FiltersDto();
  UploadedFile: FormData = new FormData();
  likeByAdminDto = new LikeByAdminDto();
  show = false;
  isOpen = false;
  active = false;
  cmntReply = false;
  newCmntReply = false;
  checkTag = false;
  activeTag = false;
  querryCompleted = false;
  markAsComplete = false;
  toastermessage = false;
  searchText: string = '';
  searchGif: string = '';
  PostStatsArray: postStatsDto[] = [];
  CommentStatsDto: any[] = [];
  quickRepliesList: any[] = [];
  HumanAgentTags: any[] = [];
  Keywords: any[] = [];
  commentsArray: any[] = [];
  groupArrays: any[] = [];
  messagesArray: any[] = [];
  groupedMessages: any[] = [];
  quickReplySearchText: string = '';
  teamPermissions: any;
  messagesStatus: any[] = [];
  Sentiments: any[] = [];
  hasReplyEmojiPermission: boolean = false;
  hasReplySentPermission: boolean = false;
  hasReplyAttachmentPermission: boolean = false;
  hasReplyCsatPermission: boolean = false;
  hasQueryStatusPermission: boolean = false;
  hasReplyQuickPermission: boolean = false;
  hasQuickReplyPermission: boolean = false;
  hasQuickLikesPermission: boolean = false;
  hasQuerySentimentsPermission: boolean = false;
  hasQueryTicketssPermission: boolean = false;

  sendSelectedAudio:any[]=[];
  audioAdded:boolean = false

  fetchedPostType: string = '';
  public Subscription!: Subscription;
  public criteria!: SortCriteria;
  constructor(
    private fetchId: FetchIdService,
    private toggleService: ToggleService,
    private commondata: CommonDataService,
    private SpinnerService: NgxSpinnerService,
    private changeDetect: ChangeDetectorRef,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private unrespondedCountService: UnRespondedCountService,
    private updateCommentsService: UpdateCommentsService,
    private updateMessagesService: UpdateMessagesService,
    private replyService: ReplyService,
    private queryStatusService: QueryStatusService,
    private createTicketService: CreateTicketService,
    private ticketResponseService: TicketResponseService,
    private router: Router,
    private stor: StorageService,
    private userInfoService: UserInformationService,
    private el: ElementRef,
    private renderer: Renderer2,
    private fetchPostType: FetchPostTypeService,
    private getWing: GetWingsService,
    private getSkillSlug: SkillslugService,
    private _perS: PermissionService,
    private getConnectionId: ConnectionIdService,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      debugger
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );

      const selectedAudio = new File([data.blob], data.title, {type: data.blob.type});
          this.sendSelectedAudio.push(selectedAudio);
          this.ImageName = this.sendSelectedAudio;
          this.audioAdded = true;
    });
  }
  
  hasPermission(permissionName: string) {
    const isAccessible = this._perS.hasPermission(permissionName);
    return isAccessible;
  }
  ngOnInit(): void {
    this.hasReplyEmojiPermission = this.hasPermission('_repemo_');
    this.hasReplySentPermission = this.hasPermission('_repsnd_');
    this.hasReplyQuickPermission = this.hasPermission('_repqik_');
    this.hasQueryStatusPermission = this.hasPermission('_qrysta_');
    this.hasReplyCsatPermission = this.hasPermission('_repcsat_');
    this.hasReplyAttachmentPermission = this.hasPermission('_repatc_');
    this.hasQuickReplyPermission = this.hasPermission('_repqik_');
    this.hasQuickLikesPermission = this.hasPermission('_qrylik_');
    this.hasQuerySentimentsPermission = this.hasPermission('_qrysnt_');
    this.hasQueryTicketssPermission = this.hasPermission('_qrysnt_');

    this.platform = this.fetchId.platform;
    this.flag = this.router.url.split('/')[2];
    this.getClassOfHeaderBackground(this.platform);
    this.baseUrl = window.location.origin;
    if (this.baseUrl == 'https://keportal.enteract.live') {
      this.activeClient = 'ke';
    } else if (this.baseUrl == 'https://engage.jazz.com.pk') {
      this.activeClient = 'jazz';
    } else if (this.baseUrl == 'https://uiengage.enteract.app') {
      this.activeClient = 'rox';
    } else if (this.baseUrl == 'https://tpplui.enteract.live') {
      this.activeClient = 'tppl';
    } else if (this.baseUrl == 'https://waengage.enteract.live') {
      this.activeClient = 'morinaga';
    } else if (this.baseUrl == 'https://bzengage.enteract.live') {
      this.activeClient = 'bazaar';
    } else if (this.baseUrl == 'https://uiengagerox.enteract.app') {
      this.activeClient = 'staging';
    } else if (this.baseUrl == 'https://localhost:4200') {
      this.activeClient = 'localhost';
    } else if (this.baseUrl == 'http://localhost:4200') {
      this.activeClient = 'localhost';
    } else if (this.baseUrl == 'https://engageui.enteract.live') {
      this.activeClient = 'damo';
    }
    // this.ImageName=[ {name: 'gif', lastModified: 1713945235285, lastModifiedDate:" Wed Apr 24 2024 12:53:55 GMT+0500 (Pakistan Standard Time)", webkitRelativePath: '', size: 1202167, }];
    this.fetchedPostType = this.fetchPostType.postType;
    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    this.renderer.addClass(textarea, 'auto-resize');
    this.adjustTextareaHeight(textarea);
    this.teamPermissions = this.stor.retrive('permissionteam', 'O').local;
    const menu = this.stor.retrive('Tags', 'O').local;
    menu.forEach((item: any) => {
      if (item.name == 'Tags') {
        item.subTags.forEach((singleTagObj: any) => {
          if (!this.TagsList.includes(singleTagObj)) {
            this.TagsList.push(singleTagObj);
          }
        });
      }
      if (item.name == 'Messages Status') {
        item.subTags.forEach((messagesStatusObj: any) => {
          if (!this.messagesStatus.includes(messagesStatusObj)) {
            this.messagesStatus.push(messagesStatusObj);
          }
        });
      }
      if (item.name == 'Sentiments') {
        item.subTags.forEach((sentimentObj: any) => {
          if (!this.Sentiments.includes(sentimentObj)) {
            this.Sentiments.push(sentimentObj);
          }
        });
      }
    });
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
    this.fetchData();
    // this.getComments();
    // this.getMessages();
    this.quickRepliesGeneric();
    this.humanAgentTags();
    this.Subscription = this.addTagService.receiveTags().subscribe((res) => {
      this.addTags = res;
      this.addTagDataListener();
    });
    this.Subscription = this.removeTagService.receiveTags().subscribe((res) => {
      this.removeTags = res;
      this.removeTagDataListener();
    });
    this.Subscription = this.updateCommentsService
      .receiveComment()
      .subscribe((res) => {
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          this.updatedComments = res;
          this.Newpost = res;
          this.updateCommentsDataListener();
        }
      });
    this.Subscription = this.updateMessagesService
      .receiveMessage()
      .subscribe((res) => {
        if (
          this.flag == 'focused' ||
          this.flag == 'assigned_to_me' ||
          this.flag == 'follow_up'
        ) {
          this.updatedMessages = res;
          this.updateMessagesDataListener();
        }
      });
    this.Subscription = this.replyService.receiveReply().subscribe((res) => {
      this.newReply = res;
      this.replyDataListener();
    });
    this.Subscription = this.queryStatusService
      .receiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateQueryStatusDataListener();
      });
    this.Subscription = this.queryStatusService
      .bulkReceiveQueryStatus()
      .subscribe((res) => {
        this.queryStatus = res;
        this.updateBulkQueryStatusDataListener();
      });
    this.Subscription = this.unrespondedCountService
      .getUnRespondedCount()
      .subscribe((res) => {
        const assignedProfileId = Number(
          sessionStorage.getItem('assignedProfile')
        );
        if (
          (this.flag == 'focused' ||
            this.flag == 'assigned_to_me' ||
            this.flag == 'follow_up') &&
          res.contentCount.profileId == assignedProfileId
        ) {
          if (this.commentTab.includes(res.contentCount.contentType)) {
            this.totalUnrespondedCmntCountByCustomer =
              res.contentCount.unrespondedCount;
          } else if (this.messageTab.includes(res.contentCount.contentType)) {
            this.totalUnrespondedMsgCountByCustomer =
              res.contentCount.unrespondedCount;
          }
        }
      });
    this.ticketResponseService.getTicketId().subscribe((res) => {
      this.updateTicketId(res);
    });
  }
  skillIdArray: number[] = [];
  async fetchData() {
    // this.spinner1running = true;
    // this.SpinnerService.show();
    const channelFeatures = [
      {
        platform: 'Facebook',
        featureSet: [
          {
            queryType: 'comment',
            contentType: 'FC',
          },
          {
            queryType: 'dm',
            contentType: 'FCP',
          },
        ],
      },
      {
        platform: 'Instagram',
        featureSet: [
          {
            queryType: 'comment',
            contentType: 'IC',
          },
          {
            queryType: 'dm',
            contentType: 'IM',
          },
        ],
      },
      {
        platform: 'LinkedIn',
        featureSet: [
          {
            queryType: 'comment',
            contentType: 'LIC',
          },
        ],
      },
      {
        platform: 'Youtube',
        featureSet: [
          {
            queryType: 'comment',
            contentType: 'YC',
          },
        ],
      },
      {
        platform: 'Twitter',
        featureSet: [
          {
            queryType: 'mention',
            contentType: 'TM',
          },
          {
            queryType: 'dm',
            contentType: 'TDM',
          },
          {
            queryType: 'tweet',
            contentType: 'TTR',
          },
        ],
      },
      {
        platform: 'WhatsApp',
        featureSet: [
          {
            queryType: 'comment',
            contentType: 'WC',
          },
        ],
      },
      {
        platform: 'PlayStore',
        featureSet: [
          {
            queryType: 'dm',
            contentType: 'PSR',
          },
        ],
      },
      {
        platform: 'SMS',
        featureSet: [
          {
            queryType: 'dm',
            contentType: 'SMS',
          },
        ],
      },
    ];
    const channelWithFeature = channelFeatures.find(
      (x) => x.platform === this.platform
    );
    if (channelWithFeature != null) {
      this.filterDto = {
        // fromDate: new Date(),
        // toDate: new Date(),
        user: this.id,
        pageId: '',
        plateForm: this.platform,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        isAttachment: false,
        hasBlueTick: false,
        queryType: this.queryType,
        text: '',
        flag: this.flag,
        userName: '',
        notInclude: '',
        include: '',
        wings: this.getWing.wings,
        skills: this.getSkillSlug.getSkillSlug(),
      };
      for (const x of channelWithFeature.featureSet) {
        if (x.queryType === 'comment') {
          this.filterDto.queryType = x.contentType;
          await this.getComments(this.filterDto);
        } else if (x.queryType === 'dm') {
          this.filterDto.queryType = x.contentType;
          await this.getMessages(this.filterDto);
        } else if (x.queryType === 'mention') {
          this.filterDto.queryType = x.contentType;
          await this.getMentions(this.filterDto);
        } else if (x.queryType === 'tweet') {
          this.filterDto.queryType = x.contentType;
          await this.getTweets(this.filterDto);
        }
      }
    }
  }
  getClassOfHeaderBackground(platform: string) {
    if (platform == 'Facebook') {
      this.iconClass = 'fab fa-facebook-f';
      this.backgroundColorClass = 'navyBg';
    } else if (platform == 'Instagram') {
      this.iconClass = 'fab fa-instagram';
      this.backgroundColorClass = 'instabg';
    } else if (platform == 'LinkedIn') {
      this.iconClass = 'fab fa-linkedin-in';
      this.backgroundColorClass = 'linkedinbg';
    } else if (platform == 'WhatsApp') {
      this.iconClass = 'fab fa-whatsapp';
      this.backgroundColorClass = 'mintBg';
    } else if (platform == 'WebChat') {
      this.iconClass = 'fa-light fa-messages text-white';
      this.backgroundColorClass = 'webchatbg';
    } else if (platform == 'SMS') {
      this.iconClass = 'fal fa-comment-alt-lines';
      this.backgroundColorClass = 'cherryBg';
    } else if (platform == 'Youtube') {
      this.iconClass = 'fab fa-youtube';
      this.backgroundColorClass = 'radicalBg';
    } else if (platform == 'Twitter') {
      this.iconClass = 'fab fa-twitter';
      this.backgroundColorClass = 'oceanBg';
    } else if (platform == 'PlayStore') {
      this.iconClass = 'fa-brands fa-google-play';
      this.backgroundColorClass = 'googleplaybg';
    }
  }
  getComments(filter: FiltersDto) {
    if (this.id != null || undefined) {
      sessionStorage.setItem('storeOpenedId', this.id);
      try {
        // this.spinner1running = true;
        // this.SpinnerService.show();
        this.commondata
          .GetChannelConversationDetail(filter)
          .subscribe((res: any) => {
            if (Object.keys(res).length > 0) {
              this.activeTabValue = 'Cmnt';
              this.ConverstationDetailDto = res;
              this.Comments = this.ConverstationDetailDto.List;
              this.userInformation = res.List[0].user;
              this.userInfoService.shareUserInformation(res.List[0].user);
              this.TotalCmntQueryCount = res.TotalQueryCount;
              this.pageName =
                this.Comments[0]?.post?.profile?.clientAppName ||
                this.Comments[0]?.comments[0]?.sendTo;
              sessionStorage.setItem(
                'lastQueryId',
                this.Comments[0].comments[0].id
              );
              this.commentsArray = [];
              this.Comments?.forEach((item: any) => {
                this.commentsArray = [];
                item.comments.forEach((cmnt: any) => {
                  this.commentsArray.push(cmnt);
                  let groupedItems = this.commentsArray.reduce(
                    (acc: any, aa: any) => {
                      const date = aa.createdDate.split('T')[0];
                      if (!acc[date]) {
                        acc[date] = [];
                      }
                      acc[date].push(aa);
                      return acc;
                    },
                    {}
                  );
                  item['groupedComments'] = Object.keys(groupedItems).map(
                    (createdDate) => {
                      return {
                        createdDate,
                        items: groupedItems[createdDate],
                      };
                    }
                  );
                  item['groupedComments'].forEach((x: any) => {
                    const groupdispostion = x.items;
                    this.groupAndModifyData(groupdispostion);
                  });
                });
              });
              this.totalUnrespondedCmntCountByCustomer = res.TotalCount;
              // this.SpinnerService.hide();
              // this.spinner1running = false;
            }
          });
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        // this.spinner1running = false;
        // this.SpinnerService.hide();
      }
    }
  }

  updateCommentsDataListener() {
    if (!this.id) {
      this.id = sessionStorage.getItem('storeOpenedId') || '{}';
    }

    if (this.updatedComments.length > 0) {
      this.updatedComments.forEach((xyz: any) => {
        if (this.id == xyz?.user?.userId) {
          xyz?.comments.forEach((abc: any) => {
            const commentDto = {
              id: abc?.id,
              wings: abc?.wings,
              postId: xyz?.post?.postId,
              commentId: abc?.commentId,
              message: abc?.message,
              contentType: abc?.contentType,
              userName: abc?.userName || abc?.userId,
              queryStatus: abc?.queryStatus,
              createdDate: abc?.createdDate,
              insertionDate: abc?.insertionDate,
              ticketId: abc?.ticketId,
              fromUserProfilePic: abc?.fromUserProfilePic,
              body: abc?.body,
              sentimentValue: abc?.sentimentValue,
              language: abc?.language,
              isHide: abc?.isHide,
              isLikedByAdmin: abc?.isLikedByAdmin,
              channelId: abc?.channelId,
              conversationId: abc?.conversationId,
              attachmentUrl: abc?.attachmentUrl,
              attachmentType: abc?.attachmentType,
              sendTo: abc?.sendTo,
              unrespondedCount: abc?.unrespondedCount,
              attachments: abc?.attachments,
              replies: abc?.replies,
              sentiment: abc?.sentiment,
              tags: abc?.tags,
              to: abc?.to,
              cc: abc?.cc,
              bcc: abc?.bcc,
              dispositions: abc?.dispositions,
              signalRGroupName: abc?.signalRGroupName,
            };

            sessionStorage.setItem('lastQueryId', commentDto.id.toString());

            let foundPost = false;

            this.Comments.forEach((item: any) => {
              if (item.post?.postId === xyz?.post?.postId) {
                foundPost = true;
                item.comments.push(commentDto);
                item.groupedComments = this.groupCommentsByDate(item.comments);
                this.totalUnrespondedCmntCountByCustomer += 1;
              }
            });

            if (!foundPost) {
              if (this.newPostComment.length > 0) {
                this.newPostComment?.forEach((x: any) => {
                  this.Newpost?.forEach((y: any) => {
                    if (y.post?.postId == x.post?.postId) {
                      x.comments.push(commentDto);
                      x.groupedComments = this.groupCommentsByDate(x.comments);
                    } else {
                      this.Newpost.forEach((x: any) => {
                        this.newPostComment.push(x);
                        x.groupedComments = this.groupCommentsByDate(
                          x.comments
                        );
                      });
                    }
                  });
                });
              } else {
                this.Newpost.forEach((x: any) => {
                  this.newPostComment.push(x);
                  this.newCmntReply = true;
                  x.groupedComments = this.groupCommentsByDate(x.comments);
                });
              }
              this.totalUnrespondedNewPostCmntCountByCustomer += 1;
            }
          });
        } else if(this.id == xyz?.userId){
          // xyz?.forEach((abc: any) => {
            const commentDto = {
              id: xyz?.id,
              wings: xyz?.wings,
              postId: xyz?.post?.postId,
              commentId: xyz?.commentId,
              message: xyz?.message,
              contentType: xyz?.contentType,
              userName: xyz?.userName || xyz?.userId,
              queryStatus: xyz?.queryStatus,
              createdDate: xyz?.createdDate,
              insertionDate: xyz?.insertionDate,
              ticketId: xyz?.ticketId,
              fromUserProfilePic: xyz?.fromUserProfilePic,
              body: xyz?.body,
              sentimentValue: xyz?.sentimentValue,
              language: xyz?.language,
              isHide: xyz?.isHide,
              isLikedByAdmin: xyz?.isLikedByAdmin,
              channelId: xyz?.channelId,
              conversationId: xyz?.conversationId,
              attachmentUrl: xyz?.attachmentUrl,
              attachmentType: xyz?.attachmentType,
              sendTo: xyz?.sendTo,
              unrespondedCount: xyz?.unrespondedCount,
              attachments: xyz?.attachments,
              replies: xyz?.replies,
              sentiment: xyz?.sentiment,
              tags: xyz?.tags,
              to: xyz?.to,
              cc: xyz?.cc,
              bcc: xyz?.bcc,
              dispositions: xyz?.dispositions,
              signalRGroupName: xyz?.signalRGroupName,
            };

            sessionStorage.setItem('lastQueryId', commentDto.id.toString());


            this.Comments[0].comments.push(commentDto)
            this.Comments[0].groupedComments = this.groupCommentsByDate(this.Comments[0].comments);
            this.totalUnrespondedCmntCountByCustomer += 1;
            
            // forEach((item: any) => {
            //     item.comments.push(commentDto);
            //     item.groupedComments = this.groupCommentsByDate(item.comments);
            //     this.totalUnrespondedCmntCountByCustomer += 1;
            // });
          // });
        }
      });
    }

    this.changeDetect.detectChanges();
  }

  groupCommentsByDate(comments: any[]) {
    const groupedItems = comments.reduce((acc: any, item: any) => {
      const date = item.createdDate?.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    return Object.keys(groupedItems).map((createdDate) => ({
      createdDate,
      items: groupedItems[createdDate],
    }));
  }

  updateMessagesDataListener() {
    if (!this.id) {
      this.id = sessionStorage.getItem('storeOpenedId') || '{}';
    }
    const skillSlug = sessionStorage.getItem('skillSlug');
    this.updatedMessages.forEach((xyz: any) => {
      if (skillSlug == xyz?.skillSlug) {
        if (this.id == xyz?.fromId) {
          this.messageDto = {
            id: xyz?.id,
            contentType: xyz?.contentType,
            queryStatus: xyz?.queryStatus,
            createdDate: xyz?.createdDate,
            attachments: xyz?.attachments,
            replies: [],
            sentiment: '',
            tags: [],
            msgId: xyz?.msgId,
            fromId: xyz?.fromId,
            fromName: xyz?.fromName,
            fromProfilePic: xyz?.fromProfilePic,
            toId: xyz?.toId,
            toName: xyz?.toName,
            msgText: xyz?.msgText,
            agentId: '',
            customerSocailProfileId: 0,
            profileId: xyz?.profileId,
            profilePageId: xyz?.profilePageId,
            wings: xyz?.wings,
            signalRGroupName: xyz?.signalRGroupName,
            skillSlug: xyz?.skillSlug,
          };
          sessionStorage.setItem('lastQueryId', this.messageDto.id.toString());
          if (this.messageDto.contentType == 'TTR') {
            this.TwitterTweets.unshift(this.messageDto);
            this.commentsArray.unshift(this.messageDto);
            let groupedItems = this.commentsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              },
              {}
            );
            this.groupedTweets = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
            this.totalUnrespondedTweetCountByCustomer =
              this.totalUnrespondedTweetCountByCustomer + 1;
          } else if (this.messageDto.contentType == 'TM') {
            this.TwitterMentions.unshift(this.messageDto);
            this.mentionsArray.unshift(this.messageDto);
            let groupedItems = this.mentionsArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              },
              {}
            );
            this.groupedMentions = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
            this.totalUnrespondedMentionCountByCustomer =
              this.totalUnrespondedMentionCountByCustomer + 1;
          } else {
            this.messageOrDM.unshift(this.messageDto);
            this.messagesArray.unshift(this.messageDto);
            let groupedItems = this.messagesArray.reduce(
              (acc: any, item: any) => {
                const date = item.createdDate?.split('T')[0];
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(item);
                return acc;
              },
              {}
            );
            this.groupedMessages = Object.keys(groupedItems).map(
              (createdDate) => {
                return {
                  createdDate,
                  items: groupedItems[createdDate],
                };
              }
            );
            this.totalUnrespondedMsgCountByCustomer =
              this.totalUnrespondedMsgCountByCustomer + 1;
          }
        }
      }
    });
    this.changeDetect.detectChanges();
  }
  addTagDataListener() {
    this.Comments?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.addTags.feedId) {
            if (this.addTags.type == 'Tag') {
              if (singleCmnt.tags.length == 0) {
                singleCmnt.tags.push(this.addTags);
              } else if (singleCmnt.tags.length > 0) {
                const tag = singleCmnt.tags.find(
                  (x: any) => x.name == this.addTags.name
                );
                if (tag != null || tag != undefined) {
                  const index = singleCmnt.tags.indexOf(tag);
                  if (index !== -1) {
                    singleCmnt.tags.splice(index, 1);
                  }
                } else {
                  if (!singleCmnt.tags.includes(this.addTags)) {
                    singleCmnt.tags.push(this.addTags);
                  }
                }
              }
            }
            if (this.addTags.type == 'Sentiment') {
              singleCmnt.sentiment = this.addTags;
            }
          }
        });
      });
    });
    // for new post
    this.newPostComment?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.addTags.feedId) {
            if (this.addTags.type == 'Tag') {
              if (singleCmnt.tags.length == 0) {
                singleCmnt.tags.push(this.addTags);
              } else if (singleCmnt.tags.length > 0) {
                const tag = singleCmnt.tags.find(
                  (x: any) => x.name == this.addTags.name
                );
                if (tag != null || tag != undefined) {
                  const index = singleCmnt.tags.indexOf(tag);
                  if (index !== -1) {
                    singleCmnt.tags.splice(index, 1);
                  }
                } else {
                  if (!singleCmnt.tags.includes(this.addTags)) {
                    singleCmnt.tags.push(this.addTags);
                  }
                }
              }
            }
            if (this.addTags.type == 'Sentiment') {
              singleCmnt.sentiment = this.addTags;
            }
          }
        });
      });
    });
    this.messageOrDM?.forEach((msg: any) => {
      if (msg.id == this.addTags.feedId) {
        if (this.addTags.type == 'Tag') {
          if (msg.tags.length == 0) {
            msg.tags.push(this.addTags);
          } else if (msg.tags.length > 0) {
            const tag = msg.tags.find(
              (x: any) => x.name == this.addTags.tagName
            );
            if (tag != null || tag != undefined) {
              const index = msg.tags.indexOf(tag);
              if (index !== -1) {
                msg.tags.splice(index, 1);
              }
            } else {
              msg.tags.push(this.addTags);
            }
          }
        }
        if (this.addTags.type == 'Sentiment') {
          msg.sentiment = this.addTags;
        }
      }
    });

    this.TwitterMentions?.forEach((tm: any) => {
      if (tm.id == this.addTags.feedId) {
        if (this.addTags.type == 'Tag') {
          if (tm.tags.length == 0) {
            tm.tags.push(this.addTags);
          } else if (tm.tags.length > 0) {
            const tag = tm.tags.find(
              (x: any) => x.name == this.addTags.tagName
            );
            if (tag != null || tag != undefined) {
              const index = tm.tags.indexOf(tag);
              if (index !== -1) {
                tm.tags.splice(index, 1);
              }
            } else {
              tm.tags.push(this.addTags);
            }
          }
        }
        if (this.addTags.type == 'Sentiment') {
          tm.sentiment = this.addTags;
        }
      }
    });

    this.TwitterTweets?.forEach((ttr: any) => {
      if (ttr.id == this.addTags.feedId) {
        if (this.addTags.type == 'Tag') {
          if (ttr.tags.length == 0) {
            ttr.tags.push(this.addTags);
          } else if (ttr.tags.length > 0) {
            const tag = ttr.tags.find(
              (x: any) => x.name == this.addTags.tagName
            );
            if (tag != null || tag != undefined) {
              const index = ttr.tags.indexOf(tag);
              if (index !== -1) {
                ttr.tags.splice(index, 1);
              }
            } else {
              ttr.tags.push(this.addTags);
            }
          }
        }
        if (this.addTags.type == 'Sentiment') {
          ttr.sentiment = this.addTags;
        }
      }
    });
    this.changeDetect.detectChanges();
  }
  removeTagDataListener() {
    this.Comments?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.removeTags.feedId) {
            var tag = singleCmnt.tags.find(
              (x: any) => x.name == this.removeTags.tagName
            );
            const index = singleCmnt.tags.indexOf(tag);
            if (index !== -1) {
              singleCmnt.tags.splice(index, 1);
            }
          }
        });
      });
    });
    // for new comment
    this.newPostComment?.forEach((post: any) => {
      post.groupedComments.forEach((cmnt: any) => {
        cmnt.items.forEach((singleCmnt: any) => {
          if (singleCmnt.id == this.removeTags.feedId) {
            var tag = singleCmnt.tags.find(
              (x: any) => x.name == this.removeTags.tagName
            );
            const index = singleCmnt.tags.indexOf(tag);
            if (index !== -1) {
              singleCmnt.tags.splice(index, 1);
            }
          }
        });
      });
    });
    this.messageOrDM?.forEach((msg: any) => {
      if (msg.id == this.removeTags.feedId) {
        var tag = msg.tags.find((x: any) => x.name == this.removeTags.tagName);
        const index = msg.tags.indexOf(tag);
        if (index !== -1) {
          msg.tags.splice(index, 1);
        }
      }
    });

    this.TwitterMentions?.forEach((tm: any) => {
      if (tm.id == this.removeTags.feedId) {
        var tag = tm.tags.find((x: any) => x.name == this.removeTags.tagName);
        const index = tm.tags.indexOf(tag);
        if (index !== -1) {
          tm.tags.splice(index, 1);
        }
      }
    });

    this.TwitterTweets?.forEach((ttr: any) => {
      if (ttr.id == this.removeTags.feedId) {
        var tag = ttr.tags.find((x: any) => x.name == this.removeTags.tagName);
        const index = ttr.tags.indexOf(tag);
        if (index !== -1) {
          ttr.tags.splice(index, 1);
        }
      }
    });
    this.changeDetect.detectChanges();
  }
  updateQueryStatusDataListener() {
    if (this.Comments) {
      this.Comments?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.queryStatus.queryId) {
              singleCmnt.queryStatus = this.queryStatus.queryStatus;
              singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
            }
          });
        });
      });
    }
    // for new comment
    if (this.newPostComment) {
      this.newPostComment?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.queryStatus.queryId) {
              singleCmnt.queryStatus = this.queryStatus.queryStatus;
              singleCmnt.isLikedByAdmin = this.queryStatus.isLikes;
            }
          });
        });
      });
    }
    if (this.messageOrDM) {
      this.messageOrDM?.forEach((msg: any) => {
        if (msg.id == this.queryStatus.queryId) {
          msg.queryStatus = this.queryStatus.queryStatus;
        }
      });
    }

    if (this.TwitterMentions) {
      this.TwitterMentions?.forEach((tm: any) => {
        if (tm.id == this.queryStatus.queryId) {
          tm.queryStatus = this.queryStatus.queryStatus;
        }
      });
    }

    if (this.TwitterTweets) {
      this.TwitterTweets?.forEach((ttr: any) => {
        if (ttr.id == this.queryStatus.queryId) {
          ttr.queryStatus = this.queryStatus.queryStatus;
        }
      });
    }
    this.changeDetect.detectChanges();
  }
  updateBulkQueryStatusDataListener() {
    this.queryStatus.forEach((query: any) => {
      if (this.commentTab.includes(query.feedType)) {
        this.Comments?.forEach((post: any) => {
          post.groupedComments.forEach((cmnt: any) => {
            cmnt.items.forEach((singleCmnt: any) => {
              if (singleCmnt.id == query.queryId) {
                singleCmnt.queryStatus = query.queryStatus;
                this.totalUnrespondedCmntCountByCustomer = 0;
              }
            });
          });
        });
      }
      if (this.messageTab.includes(query.feedType)) {
        this.messageOrDM?.forEach((msg: any) => {
          if (msg.id == query.queryId) {
            msg.queryStatus = query.queryStatus;
            this.totalUnrespondedMsgCountByCustomer = 0;
          }
        });
      }
    });
    this.changeDetect.detectChanges();
  }
  replyDataListener() {
    if (this.commentTab.includes(this.newReply.contentType)) {
      this.Comments?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.newReply.commentId) {
              singleCmnt.replies.push(this.newReply);
              singleCmnt.queryStatus = this.newReply.queryStatus;
            }
          });
        });
      });
    }
    // for new post comment reply
    if (this.commentTab.includes(this.newReply.contentType)) {
      this.newPostComment?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == this.newReply.commentId) {
              if (singleCmnt.replies == null) {
                singleCmnt.replies = [];
              }
              singleCmnt.replies.push(this.newReply);
              singleCmnt.queryStatus = this.newReply.queryStatus;
            }
          });
        });
      });
    }
    if (this.messageTab.includes(this.newReply.contentType)) {
      this.messageOrDM?.forEach((msg: any) => {
        if (msg.id == this.newReply.commentId) {
          msg.replies.push(this.newReply);
          msg.queryStatus = this.newReply.queryStatus;
        }
      });

      this.TwitterMentions?.forEach((tm: any) => {
        if (tm.id == this.newReply.commentId) {
          tm.replies.push(this.newReply);
          tm.queryStatus = this.newReply.queryStatus;
        }
      });

      this.TwitterTweets?.forEach((ttr: any) => {
        if (ttr.id == this.newReply.commentId) {
          ttr.replies.push(this.newReply);
          ttr.queryStatus = this.newReply.queryStatus;
        }
      });
    }
    this.changeDetect.detectChanges();
  }
  async getMessages(filter: FiltersDto) {
    if (this.id != null || undefined) {
      sessionStorage.setItem('storeOpenedId', this.id);
      // this.spinner1running = true;
      // this.SpinnerService.show();
      try {
        this.commondata
          .GetChannelMessageDetail(filter)
          .subscribe((res: any) => {
            if (Object.keys(res).length > 0) {
              this.activeTabValue = 'DM';
              this.filterDto.queryType = res.List?.dm[0].contentType;
              this.messageOrDM = this.groupAndModifyData(res.List?.dm);
              this.userInformation = res.List.user;
              this.profileInformation = res.List.profile;
              this.userInfoService.shareUserInformation(res.List.user);
              this.pageName = res.List?.profile.clientAppName;
              this.totalUnrespondedMsgCountByCustomer = res.TotalCount;
              this.TotalMsgQueryCount = res.TotalQueryCount;
              sessionStorage.setItem('lastQueryId', this.messageOrDM[0].id);
              this.messagesArray = [];
              this.groupedMessages = [];
              this.messageOrDM.forEach((item: any) => {
                this.messagesArray.push(item);
                let groupedItems = this.messagesArray.reduce(
                  (acc: any, item: any) => {
                    const date = item.createdDate?.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(item);
                    return acc;
                  },
                  {}
                );
                this.groupedMessages = Object.keys(groupedItems).map(
                  (createdDate) => {
                    return {
                      createdDate,
                      items: groupedItems[createdDate],
                    };
                  }
                );
                // this.SpinnerService.hide();
                // this.spinner1running = false;
              });
            }
          });
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        // this.spinner1running = false;
        // this.SpinnerService.hide();
      }
    }
  }
  async getMentions(filter: FiltersDto) {
    if (this.id != null || undefined) {
      sessionStorage.setItem('storeOpenedId', this.id);
      // this.spinner1running = true;
      // this.SpinnerService.show();
      try {
        this.commondata
          .GetChannelMessageDetail(filter)
          .subscribe((res: any) => {
            if (Object.keys(res).length > 0) {
              this.activeTabValue = 'TM';
              this.filterDto.queryType = 'TM';
              this.TwitterMentions = res.List.dm;
              this.userInformation = res.List.user;
              this.profileInformation = res.List.profile;
              this.instagramBusinessAccountId =
                res.List?.profile?.instagramBusinessAccountId;
              this.DMPlatform = res.List?.platform;
              this.userInfoService.shareUserInformation(res.List.user);
              this.pageName = res.List?.profile.clientAppName;
              this.totalUnrespondedMentionCountByCustomer = res.TotalCount;
              this.TotalMentionQueryCount = res.TotalQueryCount;
              sessionStorage.setItem('lastQueryId', this.TwitterMentions[0].id);
              this.mentionsArray = [];
              this.groupedMentions = [];
              // if (this.TwitterTweets.length == 0) {
              //   // this.TTReply = false;
              //   // this.TMReply = true;
              //   // this.TDMReply = false;
              // }
              this.TwitterMentions.forEach((item: any) => {
                this.mentionsArray.push(item);
                let groupedItems = this.mentionsArray.reduce(
                  (acc: any, item: any) => {
                    const date = item.createdDate?.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(item);
                    return acc;
                  },
                  {}
                );
                this.groupedMentions = Object.keys(groupedItems).map(
                  (createdDate) => {
                    return {
                      createdDate,
                      items: groupedItems[createdDate],
                    };
                  }
                );
                // this.SpinnerService.hide();
                // this.spinner1running = false;
              });
            }
          });
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        // this.spinner1running = false;
        // this.SpinnerService.hide();
      }
    }
  }
  async getTweets(filter: FiltersDto) {
    if (this.id != null || undefined) {
      sessionStorage.setItem('storeOpenedId', this.id);
      // this.spinner1running = true;
      // this.SpinnerService.show();
      try {
        this.commondata
          .GetChannelMessageDetail(filter)
          .subscribe((res: any) => {
            if (Object.keys(res).length > 0) {
              this.activeTabValue = 'TTR';
              this.filterDto.queryType = 'TTR';
              this.TwitterTweets = res.List?.dm;
              this.userInformation = res.List?.user;
              this.userInfoService.shareUserInformation(res.List.user);
              this.pageName = res.List?.profile.clientAppName;
              this.totalUnrespondedTweetCountByCustomer = res.TotalCount;
              this.TotalTweetQueryCount = res.TotalQueryCount;
              this.commentsArray = [];
              this.groupedTweets = [];
              sessionStorage.setItem('lastQueryId', this.TwitterTweets[0].id);
              this.TwitterTweets.forEach((item: any) => {
                this.commentsArray.push(item);
                let groupedItems = this.commentsArray.reduce(
                  (acc: any, item: any) => {
                    const date = item.createdDate?.split('T')[0];
                    if (!acc[date]) {
                      acc[date] = [];
                    }
                    acc[date].push(item);
                    return acc;
                  },
                  {}
                );
                this.groupedTweets = Object.keys(groupedItems).map(
                  (createdDate) => {
                    return {
                      createdDate,
                      items: groupedItems[createdDate],
                    };
                  }
                );
              });
              // this.SpinnerService.hide();
              // this.spinner1running = false;
            }
          });
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        // this.spinner1running = false;
        // this.SpinnerService.hide();
      }
    }
  }
  groupAndModifyData(data: any[]) {
    // Step 1: Group the data based on disposition.createdDate
    const groupedData: { [key: string]: any[] } = {};
    data.forEach((item) => {
      const createdDate = item?.dispositions?.createdDate;
      if (!groupedData[createdDate]) {
        groupedData[createdDate] = [];
      }
      groupedData[createdDate].push(item);
    });
    // Step 2 and 3: Remove disposition object from all records except the one with the max insertionDate
    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        const group = groupedData[key];
        const maxInsertionDateItem = group.reduce((prev, current) => {
          return new Date(prev.insertionDate) > new Date(current.insertionDate)
            ? prev
            : current;
        });
        group.forEach((item) => {
          if (item !== maxInsertionDateItem) {
            item.dispositions = null;
          }
        });
      }
    }
    // Step 4: Restore the original state of the data
    const restoredData = [];
    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        restoredData.push(...groupedData[key]);
      }
    }
    return restoredData;
  }
  onFileChanged() {
    Array.from(this.fileInput.nativeElement.files).forEach((file: any) => {
      if (file.size > 4 * 1024 * 1024) {
        this.reloadComponent('Attachments');
      } else if (this.fileInput.nativeElement.files.length > 0) {
        this.isAttachment = true;
        if (this.isAttachment == true) {
          this.showGifButton = false;
        }
        const filesArray = Array.from(this.fileInput.nativeElement.files);
        filesArray.forEach((attachment: any) => {
          this.ImageArray.push(attachment);
        });
        const files = this.ImageArray.map((file: any) => file); // Create a new array with the remaining files
        const newFileList = new DataTransfer();
        files.forEach((file: any) => newFileList.items.add(file)); // Add the files to a new DataTransfer object
        this.ImageName = newFileList.files;
      }
    });
  }
  addGif(gifUrl: any) {
    this.selectedGifFiles = [];
    fetch(gifUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // const originalFileName = gifUrl.src;
        const gifFile = new File([blob], '.gif', { type: 'image/gif' });
        if (this.selectedGifFiles.length === 0) {
          // If no GIF present, push the new one
          this.sendGifAsFormData(gifFile, gifUrl);
        } else {
          // If GIF already present, replace it with the new one
          this.selectedGifFiles = [{ gifFile, gifUrl }];
          this.newImageName = this.selectedGifFiles;
          this.changeDetect.detectChanges();
        }
        if (this.selectedGifFiles.some((item) => item.gifUrl === gifUrl)) {
        }
      });
  }
  sendGifAsFormData(gifFile: File, gifUrl: string) {
    this.sendSelectedGif = [];
    const formData = new FormData();
    this.selectedGifFiles.push({ gifFile, gifUrl });
    this.newImageName = this.selectedGifFiles;
    this.selectedGifFiles.forEach((x: any) => {
      const gifUrl = x.gifUrl.src;
      // this.sendSelectedGif.push(x.gifUrl.src)
      fetch(gifUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const selectGif = new File([blob], 'test.gif', { type: 'image/gif' });
          this.sendSelectedGif.push(selectGif);
          this.ImageName = this.sendSelectedGif;
        });
    });
    // this.ImageName = this.selectedGifFiles
    if (this.selectedGifFiles.length > 0) {
      this.isGifSelected = true;
    }
    if (this.isGifSelected == true) {
      this.showAttachmentButton = false;
    }
    this.changeDetect.detectChanges();
  }
  fbStats() {
    // this.shareFbResService.updateMessage(this.Comments);
    if (this.Comments != null || undefined) {
      this.Comments?.forEach(async (post: any): Promise<void> => {
        this.postIdForStats = post.post?.postId;
        this.pageIdForStats = post.post?.postId.split('_')[0];
        await this.commondata
          .GetFbPostStats(this.pageIdForStats, this.postIdForStats)
          .subscribe((postStats: any) => {
            post.post['postStats'] = postStats;
            this.totalPostReactionsCount =
              postStats.reactioinsLIst.like +
              postStats.reactioinsLIst.love +
              postStats.reactioinsLIst.wow +
              postStats.reactioinsLIst.haha +
              postStats.reactioinsLIst.sorry +
              postStats.reactioinsLIst.anger +
              postStats.reactioinsLIst.sad +
              postStats.reactioinsLIst.thankful +
              postStats.reactioinsLIst.pride +
              postStats.reactioinsLIst.cARE;
            // this.SpinnerService.hide();
          });
      });
    }
    this.Comments?.forEach((post: any) => {
      post.comments.forEach(async (comment: any) => {
        this.commentIdForStats = comment.commentId;
        await this.commondata
          .GetFbCommentStats(this.pageIdForStats, this.commentIdForStats)
          .subscribe((commentStats: any) => {
            comment['comStats'] = commentStats;
            this.totalCommentReactionsCount =
              commentStats.reactioinsLIst.like +
              commentStats.reactioinsLIst.love +
              commentStats.reactioinsLIst.wow +
              commentStats.reactioinsLIst.haha +
              commentStats.reactioinsLIst.sorry +
              commentStats.reactioinsLIst.anger +
              commentStats.reactioinsLIst.sad +
              commentStats.reactioinsLIst.thankful +
              commentStats.reactioinsLIst.pride +
              commentStats.reactioinsLIst.cARE;
          });
      });
    });
  }
  replyForm = new FormGroup({
    text: new FormControl('', Validators.required),
    commentId: new FormControl(0),
    platform: new FormControl(''),
    contentType: new FormControl(''),
    profileId: new FormControl(''),
    profilePageId: new FormControl(''),
    userProfileId: new FormControl(0),
    responseByName: new FormControl(''),
    instagramBusinessAccountId: new FormControl(''),
    connectionId: new FormControl(''),
  });
  SendCommentInformation(comId: any) {
    this.Comments?.forEach((xyz: any) => {
      xyz?.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;
          this.mentionedCommentOrMessage = comment.message;
          this.mentionedCommentOrMessageId = comment.id;
          this.platform = xyz?.platform;
          this.postType = comment.contentType;
          this.userProfileId = this.userInformation.id;
          this.profileId = xyz?.post?.profile?.profile_Id;
          this.profilePageId = xyz?.post?.profile?.page_Id;
        }
      });
    });
  }
  SendnewCommentInformation(comId: any) {
    this.newPostComment?.forEach((xyz: any) => {
      xyz?.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          // show mentioned reply
          this.show = true;
          this.mentionedCommentOrMessage = comment.message;
          this.mentionedCommentOrMessageId = comment.id;
          this.platform = xyz?.platform;
          this.postType = comment.contentType;
          this.userProfileId = this.userInformation.id;
          this.profileId = xyz?.post?.profile?.profile_Id;
          this.profilePageId = xyz?.post?.profile?.page_Id;
        }
      });
    });
  }
  SendMessageInformation(id: any) {
    this.messageOrDM?.forEach((msg: any) => {
      if (msg.id == id) {
        // show mentioned reply
        this.show = true;
        this.mentionedCommentOrMessage = msg?.msgText;
        this.mentionedCommentOrMessageId = msg?.id;
        this.platform = this.platform;
        this.postType = msg?.contentType;
        this.profileId = this.profileInformation?.profile_Id;
        this.profilePageId = this.profileInformation?.page_Id;
        this.userProfileId = this.userInformation?.id;
      }
    });

    this.TwitterMentions?.forEach((tm: any) => {
      if (tm.id == id) {
        // show mentioned reply
        this.show = true;
        this.mentionedCommentOrMessage = tm?.msgText;
        this.mentionedCommentOrMessageId = tm?.id;
        this.platform = this.platform;
        this.postType = tm?.contentType;
        this.profileId = this.profileInformation?.profile_Id;
        this.profilePageId = this.profileInformation?.page_Id;
        this.userProfileId = this.userInformation?.id;
      }
    });

    this.TwitterTweets?.forEach((ttr: any) => {
      if (ttr.id == id) {
        // show mentioned reply
        this.show = true;
        this.mentionedCommentOrMessage = ttr?.msgText;
        this.mentionedCommentOrMessageId = ttr?.id;
        this.platform = this.platform;
        this.postType = ttr?.contentType;
        this.profileId = this.profileInformation?.profile_Id;
        this.profilePageId = this.profileInformation?.page_Id;
        this.userProfileId = this.userInformation?.id;
      }
    });
  }
  closeMentionedReply() {
    this.show = false;
    this.clearInputField();
  }
  clearInputField() {
    this.ImageArray = [];
    this.show = false;
    this.textarea.nativeElement.value = '';
    const dataTransfer = new DataTransfer();
    this.fileInput.nativeElement.files = dataTransfer.files;
    this.text = '';
    this.mentionedCommentOrMessageId = 0;
    this.isGifSelected = false;
    this.showAttachmentButton = true;
    this.newImageName = [];
    this.isAttachment = false;
    this.showGifButton = true;
    this.selectedGifFiles = [];
    this.ImageName = [];
    this.sendSelectedGif = [];
    this.detectChanges();
  }
  submitReply() {
    if (this.mentionedCommentOrMessageId == 0) {
      this.reloadComponent('selectComment');
    } else {
      var formData = new FormData();
      if (this.ImageName != null || undefined) {
        for (let index = 0; index < this.ImageName.length; index++) {
          formData.append('File', this.ImageName[index]);
        }
      }
      if (this.text !== '') {
        this.replyForm.patchValue({
          text: this.text,
        });
      }
      this.replyForm.patchValue({
        commentId: this.mentionedCommentOrMessageId,
        platform: this.platform,
        contentType: this.postType,
        profileId: this.profileId,
        profilePageId: this.profilePageId,
        userProfileId: this.userProfileId,
        responseByName: this.pageName,
        instagramBusinessAccountId: this.instagramBusinessAccountId,
        connectionId: this.getConnectionId.connectionId,
      });
      formData.append('CommentReply', JSON.stringify(this.replyForm.value));
      if (
        this.replyForm.value.text !== '' &&
        this.replyForm.value.text !== null &&
        this?.ImageName?.length > 0 &&
        this.ImageName != undefined
      ) {
        this.reloadComponent('both-text-and-attachment-added');
      } else if (
        (this.replyForm.value.text !== '' &&
          this.replyForm.value.text !== null) ||
        (this?.ImageName?.length > 0 && this.ImageName != undefined)
      ) {
        this.spinner1running = true;
        this.SpinnerService.show();
        this.commondata.ReplyComment(formData).subscribe(
          (res: any) => {
            this.spinner1running = false;
            this.SpinnerService.hide();
            this.clearInputField();
            this.reloadComponent('fbmessage');
            this.replyForm.reset({
              text: '',
              commentId: 0,
              platform: '',
              contentType: '',
              profileId: '',
              profilePageId: '',
              userProfileId: 0,
              responseByName: '',
              instagramBusinessAccountId: '',
              connectionId: '',
            });
            if (this.radioInput != undefined) {
              this.radioInput.nativeElement.checked = false;
            }
          },
          (error) => {
            alert(error.message);
            // this.spinner1running = false;
            // this.SpinnerService.hide();
          }
        );
      } else {
        this.reloadComponent('empty-input-field');
      }
    }
    this.quickReplySearchText = '';
  }
  toggle(child: string, cmntId: any) {
    if (sessionStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }
    this.createTicketService.setCommentId(cmntId);
  }
  sendQuickReplyGeneric(value: any) {
    this.quickRepliesList.forEach((x: any) => {
      if (x.subReply === null && x.id === value) {
        this.text = x?.text + ' ';
        this.insertAtCaret(this.text);
      } else if (x.subReply) {
        this.nthLevel(x.subReply, value);
      }
    });
  }
  nthLevel(replies: any[], value: any) {
    replies.forEach((reply: any) => {
      if (reply.subReply === null && reply.id === value) {
        this.text = reply.text + ' ';
        this.insertAtCaret(this.text);
      } else if (reply.subReply) {
        this.nthLevel(reply.subReply, value);
      }
    });
  }
  quickRepliesGeneric() {
    this.commondata.QuickReplyList().subscribe((res: any) => {
      this.quickRepliesList = res;
    });
  }
  humanAgentTags() {
    this.commondata.GetHumanAgentTag().subscribe((res: any) => {
      this.HumanAgentTags = res;
    });
  }
  sendHumanAgentTag(value: any) {
    var abc = this.HumanAgentTags.find((res: any) => res.value == value);
    this.text = abc?.text;
    this.replyForm.patchValue({ text: this.text });
  }
  insertTagsForFeed(comId: number, tagName: string, platform: string) {
    this.insertTagsForFeedDto = {
      feedId: comId,
      tagName: tagName,
      type: 'Tag',
      platform: platform,
      wings: this.getWing.wings,
      connectionId: this.getConnectionId.connectionId,
    };
    this.Comments?.forEach((abc: any) => {
      abc?.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          if (comment.tags.length == 0) {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          } else if (comment.tags.length > 0) {
            const value = comment.tags.find((x: any) => x.name == tagName);
            if (value != null || value != undefined) {
              this.removeTagFromFeed(comId, tagName, platform);
            } else {
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.reloadComponent('ApplyTag');
                  this.activeTag = true;
                  this.checkTag = true;
                });
            }
          }
        }
      });
    });
    // for new posttag
    this.newPostComment?.forEach((abc: any) => {
      abc?.comments.forEach((comment: any) => {
        if (comment.id == comId) {
          if (comment.tags.length == 0) {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          } else if (comment.tags.length > 0) {
            const value = comment.tags.find((x: any) => x.name == tagName);
            if (value != null || value != undefined) {
              this.removeTagFromFeed(comId, tagName, platform);
            } else {
              this.commondata
                .InsertTag(this.insertTagsForFeedDto)
                .subscribe((res: any) => {
                  this.reloadComponent('ApplyTag');
                  this.activeTag = true;
                  this.checkTag = true;
                });
            }
          }
        }
      });
    });
    this.messageOrDM?.forEach((msg: any) => {
      if (msg.id == comId) {
        if (msg.tags.length == 0) {
          this.commondata
            .InsertTag(this.insertTagsForFeedDto)
            .subscribe((res: any) => {
              this.reloadComponent('ApplyTag');
              this.activeTag = true;
              this.checkTag = true;
            });
        } else if (msg.tags.length > 0) {
          const value = msg.tags.find((x: any) => x.name == tagName);
          if (value != null || value != undefined) {
            this.removeTagFromFeed(comId, tagName, platform);
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          }
        }
      }
    });

    this.TwitterMentions?.forEach((tm: any) => {
      if (tm.id == comId) {
        if (tm.tags.length == 0) {
          this.commondata
            .InsertTag(this.insertTagsForFeedDto)
            .subscribe((res: any) => {
              this.reloadComponent('ApplyTag');
              this.activeTag = true;
              this.checkTag = true;
            });
        } else if (tm.tags.length > 0) {
          const value = tm.tags.find((x: any) => x.name == tagName);
          if (value != null || value != undefined) {
            this.removeTagFromFeed(comId, tagName, platform);
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          }
        }
      }
    });

    this.TwitterTweets?.forEach((ttr: any) => {
      if (ttr.id == comId) {
        if (ttr.tags.length == 0) {
          this.commondata
            .InsertTag(this.insertTagsForFeedDto)
            .subscribe((res: any) => {
              this.reloadComponent('ApplyTag');
              this.activeTag = true;
              this.checkTag = true;
            });
        } else if (ttr.tags.length > 0) {
          const value = ttr.tags.find((x: any) => x.name == tagName);
          if (value != null || value != undefined) {
            this.removeTagFromFeed(comId, tagName, platform);
          } else {
            this.commondata
              .InsertTag(this.insertTagsForFeedDto)
              .subscribe((res: any) => {
                this.reloadComponent('ApplyTag');
                this.activeTag = true;
                this.checkTag = true;
              });
          }
        }
      }
    });
  }
  removeTagFromFeed(feedId: number, tagName: any, platform: string) {
    if (
      this.flag == 'focused' ||
      this.flag == 'assigned_to_me' ||
      this.flag == 'follow_up'
    ) {
      this.insertTagsForFeedDto = {
        feedId: feedId,
        tagName: tagName,
        type: 'Tag',
        platform: platform,
        wings: this.getWing.wings,
        connectionId: this.getConnectionId.connectionId,
      };
      this.commondata
        .RemoveTag(this.insertTagsForFeedDto)
        .subscribe((res: any) => {
          this.reloadComponent('RemoveTag');
          this.activeTag = false;
          this.checkTag = false;
        });
    }
  }
  insertSentimentForFeed(comId: number, sentimenName: any, platform: string) {
    this.insertTagsForFeedDto = {
      feedId: comId,
      tagName: sentimenName,
      type: 'Sentiment',
      platform: platform,
      wings: this.getWing.wings,
      connectionId: this.getConnectionId.connectionId,
    };
    this.commondata
      .InsertSentiment(this.insertTagsForFeedDto)
      .subscribe((res: any) => {
        this.reloadComponent('Sentiment');
      });
  }
  commentStatus(comId: any, type: any) {
    this.commentStatusDto = {
      id: comId,
      type: type,
      plateForm: this.platform,
      profileId: Number(sessionStorage.getItem('profileId')),
      wings: this.getWing.wings,
      skillSlug: this.getSkillSlug.skillSlug[0],
      connectionId: this.getConnectionId.connectionId,
    };
    this.commondata.CommentRespond(this.commentStatusDto).subscribe(() => {});
  }
  likeByAdmin(
    comId: any,
    isLiked: boolean,
    platform: any,
    profilePageId: any,
    profileId: any,
    userId: any
  ) {
    isLiked = !isLiked;
    this.likeByAdminDto = {
      platform: platform,
      commentId: comId,
      isLiked: isLiked,
      profilePageId: profilePageId,
      profileId: profileId,
      userFromId: userId,
    };
    this.commondata.LikedByAdmin(this.likeByAdminDto).subscribe((res: any) => {
      if (isLiked == true) {
        this.reloadComponent('Like');
      }
      if (isLiked == false) {
        this.reloadComponent('disLike');
      }
    });
  }
  reloadComponent(type: any) {
    if (type == 'messageUnhided') {
      this.AlterMsg = 'Comment Unhided Sucessfully';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'messageHided') {
      this.AlterMsg = 'Comment Hided Sucessfully';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Attachments') {
      this.AlterMsg = 'File size must be less than 4MB';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'spam') {
      this.AlterMsg = 'Message has been marked as spam!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'removeSpam') {
      this.AlterMsg = 'Message has been removed from spam items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'starred') {
      this.AlterMsg = 'Profile(s) has been marked as starred!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'removeStarred') {
      this.AlterMsg = 'Profile(s) has been removed from starred items';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'both-text-and-attachment-added') {
      this.AlterMsg = 'Text and Attachment cannot be sent at the same time';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'empty-input-field') {
      this.AlterMsg = 'Please write something!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'selectComment') {
      this.AlterMsg = 'No comment or message is selected!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'comment') {
      this.AlterMsg = 'Comment Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'fbmessage') {
      this.AlterMsg = 'Message Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'ApplyTag') {
      this.AlterMsg = 'Tag Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'RemoveTag') {
      this.AlterMsg = 'Tag Removed Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Sentiment') {
      this.AlterMsg = 'Sentiment Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Like') {
      this.AlterMsg = 'Liked Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'disLike') {
      this.AlterMsg = 'Dislike Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
  removeAttachedFile(index: any) {
    const filesArray = Array.from(this.ImageName);
    filesArray.splice(index, 1);
    this.ImageArray.splice(index, 1);
    const files = filesArray.map((file: any) => file); // Create a new array with the remaining files
    const newFileList = new DataTransfer();
    files.forEach((file) => newFileList.items.add(file)); // Add the files to a new DataTransfer object
    this.fileInput.nativeElement.files = newFileList.files;
    this.detectChanges();
    if (this.ImageName.length == 0) {
      this.isAttachment = false;
      this.showGifButton = true;
    }
  }
  removeAttachedFileGif(id: any) {
    const index = this.newImageName.findIndex(
      (item: any) => item.gifUrl.id === id
    );
    if (index >= -1) {
      this.newImageName.splice(index, 1);
    }
    this.isGifSelected = false;
    this.showAttachmentButton = true;
  }
  detectChanges(): void {
    if (this.fileInput) {
      this.ImageName = this.fileInput.nativeElement.files;
    }
    this.text = this.textarea.nativeElement.value;
  }
  insertAtCaret(text: string) {
    const textarea = this.textarea.nativeElement;
    textarea.focus();
    if (typeof textarea.selectionStart != 'undefined') {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const scrollTop = textarea.scrollTop;
      textarea.value =
        textarea.value.substring(0, startPos) +
        text +
        textarea.value.substring(endPos, textarea.value.length);
      textarea.selectionStart = startPos + text.length;
      textarea.selectionEnd = startPos + text.length;
      textarea.scrollTop = scrollTop;
      this.detectChanges();
    }
  }
  insertEmoji(emoji: any) {
    this.insertAtCaret(' ' + emoji + ' ');
  }
  onScrollComments() {
    if (this.TotalCmntQueryCount > this.filterDto.pageSize) {
      this.filterDto.pageSize = this.filterDto.pageSize + 10;
      this.getComments(this.filterDto);
    }
  }
  onScrollMessages() {
    if (this.TotalMsgQueryCount > this.filterDto.pageSize) {
      this.filterDto.pageSize = this.filterDto.pageSize + 10;
      this.getMessages(this.filterDto);
    }
  }
  onScrollMentions() {
    if (this.TotalMentionQueryCount > this.filterDto.pageSize) {
      this.filterDto.pageSize = this.filterDto.pageSize + 10;
      this.getMentions(this.filterDto);
    }
  }
  onScrollTweets() {
    if (this.TotalTweetQueryCount > this.filterDto.pageSize) {
      this.filterDto.pageSize = this.filterDto.pageSize + 10;
      this.getTweets(this.filterDto);
    }
  }
  updateTicketId(res: any) {
    if (this.Comments) {
      this.Comments?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == res.queryId) {
              singleCmnt.ticketId = res.ticketId;
            }
          });
        });
      });
    }
    if (this.messageOrDM) {
      this.messageOrDM?.forEach((msg: any) => {
        if (msg.id == res.queryId) {
          msg.ticketId = res.ticketId;
        }
      });
    }
    this.changeDetect.detectChanges();
  }
  closeQuickResponseSidebar() {
    this.quickReplySearchText = '';
    if (this.radioInput != undefined) {
      this.radioInput.nativeElement.checked = false;
    }
  }
  isImage(attachment: any): boolean {
    return (
      attachment?.mediaType?.toLowerCase().includes('image') ||
      attachment?.mediaType?.toLowerCase().includes('photo') ||
      attachment?.mediaType?.toLowerCase().includes('share')
    );
  }
  isVideo(attachment: any): boolean {
    return attachment?.mediaType?.toLowerCase().startsWith('video');
  }
  isAudio(attachment: any): boolean {
    return attachment?.mediaType?.toLowerCase().startsWith('audio');
  }
  isOther(attachment: any): boolean {
    return (
      !this.isImage(attachment) &&
      !this.isVideo(attachment) &&
      !this.isAudio(attachment)
    );
  }
  hideMessage(queryId: number, status: boolean, platform: string) {
    var obj = {
      platform: platform,
      queryId: queryId,
      status: status,
    };
    this.commondata.HideUnhideMessage(obj).subscribe((res: any) => {
      this.Comments?.forEach((post: any) => {
        post.groupedComments.forEach((cmnt: any) => {
          cmnt.items.forEach((singleCmnt: any) => {
            if (singleCmnt.id == queryId) {
              singleCmnt.isHide = status;
              if (status == true) {
                this.reloadComponent('messageHided');
              } else if (status == false) {
                this.reloadComponent('messageUnhided');
              }
            }
          });
        });
      });
    });
  }
  c_satForm() {
    let data = this.stor.retrive('main', 'O').local;
    const email = data.originalUserName;
    const customerId = sessionStorage.getItem('storeOpenedId');
    const channel = sessionStorage.getItem('parent');
    this.insertAtCaret(
      this.baseUrl +
        '/survey/customer_satisfaction?channel=' +
        channel +
        '&customerId=' +
        customerId +
        '&email=' +
        email
    );
  }
  c_informationForm() {
    const customerId = sessionStorage.getItem('storeOpenedId');
    this.insertAtCaret(
      this.baseUrl + '/survey/customer_details?customerId=' + customerId + ' '
    );
  }
  toggleCollapse(index: number) {
    this.activeDropdown = this.activeDropdown === index ? null : index;
  }
  toggleInnerCollapse(parentIndex: number, childIndex: number) {
    this.activeInnerDropdown =
      this.activeInnerDropdown.parentIndex === parentIndex &&
      this.activeInnerDropdown.childIndex === childIndex
        ? { parentIndex: null, childIndex: null }
        : { parentIndex, childIndex };
  }
  isDropdownActive(index: number): boolean {
    return this.activeDropdown === index;
  }
  isInnerDropdownActive(parentIndex: number, childIndex: number): boolean {
    return (
      this.activeInnerDropdown.parentIndex === parentIndex &&
      this.activeInnerDropdown.childIndex === childIndex
    );
  }
  handleTextareaKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submitReply();
    }
  }
  adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  activeTabValue: string = 'Cmnt';
  activeTab(value: any) {
    this.activeTabValue = value;
    if (value == 'DM') {
      this.filterDto.queryType = 'TDM';
    } else if (value == 'Cmnt') {
      this.filterDto.queryType = sessionStorage.getItem('contentType') || '';
    } else {
      this.filterDto.queryType = value;
    }
  }

  ///// audio recording

  isRecording = false;
  recordedTime:any;
  blobUrl:any;
  teste:any;

  

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }
}
