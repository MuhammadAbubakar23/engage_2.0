import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IHttpConnectionOptions } from '@microsoft/signalr';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import { AddTagService } from '../AddTagService/add-tag.service';
import { ApplySentimentService } from '../ApplySentimentService/apply-sentiment.service';
import { QueryStatusService } from '../queryStatusService/query-status.service';
import { RemoveAssignedQuerryService } from '../RemoveAssignedQuery/remove-assigned-querry.service';
import { RemoveTagService } from '../RemoveTagService/remove-tag.service';
import { ReplyService } from '../replyService/reply.service';
import { UnRespondedCountService } from '../UnRepondedCountService/un-responded-count.service';
import { UpdateCommentsService } from '../UpdateCommentsService/update-comments.service';
import { UpdateListService } from '../UpdateListService/update-list.service';
import { UpdateMessagesService } from '../UpdateMessagesService/update-messages.service';
import { CompanyidService } from '../companyidService/companyid.service';
import { BehaviorSubject } from 'rxjs';
import { ConnectionIdService } from '../connectionId/connection-id.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  data: any;
  addTags: any;
  removeTags: any;
  UnrespondedCount: any;
  reply: any;
  temporaryListObject: any;
  temporaryCommentObject: any;
  temporaryDMObject: any;

  token = localStorage.getItem('token');
  signalRStatus = localStorage.getItem('signalRStatus');
  companyId: number = 658;
  baseUrl: string = '';

  public hubconnection!: signalR.HubConnection;
  public connectionId!: string;
  public broadcastedData!: any[];

  SignalRCommonBaseUrl = environment.SignalRCommonBaseUrl;

  private connectionStateSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private storage: StorageService,
    private addTagService: AddTagService,
    private removeTagService: RemoveTagService,
    private unrespondedCountService: UnRespondedCountService,
    private updateListService: UpdateListService,
    private updateCommentsService: UpdateCommentsService,
    private updateMessagesService: UpdateMessagesService,
    private replyService: ReplyService,
    private queryStatusService: QueryStatusService,
    private removeAssignedQueryService: RemoveAssignedQuerryService,
    private applySentimentService: ApplySentimentService,
    private comanyidService: CompanyidService,
    private sendConnectionId : ConnectionIdService
  ) {
    this.baseUrl = window.location.origin;
    if (this.baseUrl == 'https://keportal.enteract.live') {
      this.companyId = 651;
    } else if (this.baseUrl == 'https://engage.jazz.com.pk') {
      this.companyId = 650;
    } else if (this.baseUrl == 'https://uiengage.enteract.app') {
      this.companyId = 657;
    } else if (this.baseUrl == 'https://tpplui.enteract.live') {
      this.companyId = 652;
    } else if (this.baseUrl == 'https://waengage.enteract.live') {
      this.companyId = 653;
    } else if (this.baseUrl == 'https://bzengage.enteract.live') {
      this.companyId = 654;
    } else if (this.baseUrl == 'https://uiengagerox.enteract.app') {
      this.companyId = 658;
    }
    this.comanyidService.sendcompanyid(this.companyId);
  }
  flag: string = '';

  startConnection() {
    // this.flag = this.router.url.split('/')[1];
    // if(this.flag == 'all-inboxes'){
    let team = this.storage.retrive('nocompass', 'O').local;
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return 'Bearer ' + localStorage.getItem('token');
      },
      headers: { 'X-Super-Team': JSON.stringify(this.companyId) },
      // headers: { "X-Super-Team": JSON.stringify(team.id) }
    };

    this.hubconnection = new signalR.HubConnectionBuilder()
      .withUrl(this.SignalRCommonBaseUrl + 'ConnectionHub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubconnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connectionStateSubject.next(true);
      })
      .then(() => this.getConnectionId())
      .catch((err) => console.log('Error while starting connection: ' + err));

    // }

    // Handle reconnection
    this.hubconnection.onreconnected(() => {
      
      console.log("SignalR reconnected, rejoining group");
      this.getConnectionId()
      // this.connectionStateSubject.next(true)
      this.storeLocally?.forEach((x:any)=>{
        this.joinGroup(x);
      })
    });
  }
  
  public getConnectionState(): BehaviorSubject<boolean> {
    return this.connectionStateSubject;
  }
  storeLocally:any[]=[];
  joinGroup(groupName: any) {
    
    if (this.hubconnection) {
      this.hubconnection
        .invoke('JoinGroup', groupName)
        .then(() => console.log(`Joined group ${groupName}`))
        .catch((err) =>
          console.error(`Error while joining group ${groupName}: ${err}`)
        );
    } else {
      console.error('SignalR connection not established.');
    }
    if(!this.storeLocally.includes(groupName)){
      this.storeLocally.push(groupName)
      console.log('groyupsArray',this.storeLocally)
    }
  }

  reConnect() {
    // // this.flag = this.router.url.split('/')[1];
    // // if(this.flag == 'all-inboxes'){
    // let team = this.storage.retrive("nocompass", "O").local;
    // const options: IHttpConnectionOptions = {
    //   accessTokenFactory: () => {
    //     return 'Bearer ' + localStorage.getItem('token');
    //   },
    //   headers: { "X-Super-Team": JSON.stringify(this.companyId) }
    //   // headers: { "X-Super-Team": JSON.stringify(team.id) }
    // };
    // this.hubconnection = new signalR.HubConnectionBuilder()
    //   .withUrl(this.SignalRCommonBaseUrl + 'ConnectionHub', options)
    //   .withAutomaticReconnect()
    //   .configureLogging(signalR.LogLevel.Information)
    //   .build();
    // this.hubconnection
    //   .start()
    //   .then(() => console.log('Connection started'))
    //   .then(() => this.getConnectionId())
    //   .catch((err) => console.log('Error while starting connection: ' + err));
    // // }
  }

  public updateListAndDetailDataListener = () => {
    
    this.hubconnection?.on('SendData', (data) => {
      if (
        data.conversationQueues != null &&
        data.conversationQueues.length > 0
      ) {
        data.conversationQueues.forEach((x: any) => {
          if (this.temporaryListObject) {
            const newTemporaryListObject = { ...this.temporaryListObject };
            const newListObject = { ...x };
            delete newTemporaryListObject['unrespondedCount'];
            delete newListObject['unrespondedCount'];
            if (
              JSON.stringify(newTemporaryListObject) !==
              JSON.stringify(newListObject)
            ) {
              this.temporaryListObject = x;
              this.updateListService.sendList(data.conversationQueues);
            }
          } else {
            this.temporaryListObject = x;
            this.updateListService.sendList(data.conversationQueues);
          }
        });
      }
      if (data.signalRConversations != null) {
        this.updateCommentsService.sendComment(data.signalRConversations);
      }
      if (data.signalRDMConversations != null) {
        data.signalRDMConversations.forEach((x: any) => {
          if (this.temporaryDMObject) {
            if (JSON.stringify(this.temporaryDMObject) !== JSON.stringify(x)) {
              this.temporaryDMObject = x;
              this.updateMessagesService.sendMessage(
                data.signalRDMConversations
              );
            }
          } else {
            this.temporaryDMObject = x;
            this.updateMessagesService.sendMessage(data.signalRDMConversations);
          }
        });
      }
      if (data.signalRPostConversations != null) {
        data.signalRPostConversations.forEach((x: any) => {
          if (this.temporaryCommentObject) {
            if (
              JSON.stringify(this.temporaryCommentObject) !== JSON.stringify(x)
            ) {
              this.temporaryCommentObject = x;
              this.updateCommentsService.sendComment(data.signalRPostConversations);
            }
          } else {
            this.temporaryCommentObject = x;
            this.updateCommentsService.sendComment(data.signalRPostConversations);
          }
        });
      }
    });
  };

  public addTagDataListener = () => {
    this.hubconnection?.on('ApplyTags', (addTags) => {
      this.addTagService.sendTags(addTags);
    });
  };

  public removeTagDataListener = () => {
    this.hubconnection?.on('RemoveTags', (removeTags) => {
      this.removeTagService.sendTags(removeTags);
    });
  };

  public unRespondedCountDataListener = () => {
    this.hubconnection?.on('UnrespondedCount', (UnrespondedCount) => {
      this.unrespondedCountService.sendUnRespondedCount(UnrespondedCount);
    });
  };

  public replyDataListener = () => {
    this.hubconnection?.on('QueryReply', (reply) => {
      this.replyService.sendReply(reply);
    });
  };

  public queryStatusDataListener = () => {
    this.hubconnection?.on('QueryStatusProcess', (queryStatus) => {
      this.queryStatusService.sendQueryStatus(queryStatus);
    });
  };

  public updateMessageStatusDataListener = () => {
    this.hubconnection?.on('UpdateMessageStatus', (queryStatus) => {
      this.queryStatusService.sendQueryStatus(queryStatus);
    });
  };

  public bulkQueryStatusDataListener = () => {
    this.hubconnection?.on('ListQueryStatusProcess', (queryStatus) => {
      this.queryStatusService.bulkSendQueryStatus(queryStatus);
    });
  };

  public assignQueryResponseListner = () => {
    this.hubconnection?.on('AssignQueryResponse', (removeAssignedQuerry) => {
      this.removeAssignedQueryService.sendAssignedQuerry(removeAssignedQuerry);
    });
  };

  public applySentimentListner = () => {
    this.hubconnection?.on('ApplySentimentTags', (appliedSentiment) => {
      this.applySentimentService.sendSentiment(appliedSentiment);
    });
  };

  public checkConnectionStatusListener = () => {
    this.hubconnection?.on('GetMessage', (status) => {
      this.hubconnection.invoke('SetConnection').then((data) => {});
    });
  };

  public getAllocatedProfilesListner = () => {
    this.hubconnection?.on('GetAllocatedProfiles', (res) => {
      // this.addTagService.sendTags(res);
    });
  };

  public getConnectionId = () => {
    let obj={
      'Bearer': localStorage.getItem('token') ,
      'companyId':this.companyId
    }
    this.hubconnection.invoke('GetConnectionId',obj).then((data) => {
      this.connectionId = data;
      localStorage.setItem('signalRConnectionId', this.connectionId)
      this.sendConnectionId.sendConnectionId(this.connectionId)
    });
  };
}
