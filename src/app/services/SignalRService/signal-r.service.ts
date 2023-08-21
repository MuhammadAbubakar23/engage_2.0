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

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  data: any;
  addTags: any;
  removeTags: any;
  UnrespondedCount: any;
  reply: any

  token = localStorage.getItem('token');
  signalRStatus = localStorage.getItem('signalRStatus')

  public hubconnection!: signalR.HubConnection;
  public connectionId!: string;
  public broadcastedData!: any[];

  SignalRCommonBaseUrl = environment.SignalRCommonBaseUrl;

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
    private applySentimentService: ApplySentimentService
  ) { }

  startConnection() {

    let team = this.storage.retrive("nocompass", "O").local;
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return 'Bearer ' + localStorage.getItem('token');
      },
      headers: { "X-Super-Team": JSON.stringify(team.id) }
    };

    this.hubconnection = new signalR.HubConnectionBuilder()
      .withUrl(this.SignalRCommonBaseUrl + 'ConnectionHub', options)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubconnection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => this.getConnectionId())
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  reConnect() {

    var conId = localStorage.getItem('signalRConnectionId')
    if (conId) {

      let team = this.storage.retrive("nocompass", "O").local;
      const options: IHttpConnectionOptions = {
        accessTokenFactory: () => {
          return 'Bearer ' + localStorage.getItem('token');
        },
        headers: { "X-Super-Team": JSON.stringify(team.id) }
      };

      this.hubconnection = new signalR.HubConnectionBuilder()
        .withUrl(this.SignalRCommonBaseUrl + 'ConnectionHub', options)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
      this.hubconnection
        .start()
        .then(() => console.log('Connection started'))
        .then(() => this.getConnectionId())
        .catch((err) => console.log('Error while starting connection: ' + err));
    }
  }


  public updateListAndDetailDataListener = () => {
debugger
    this.hubconnection.on('SendData', (data) => {
      if (data.conversationQueues != null) {
        this.updateListService.sendList(data.conversationQueues)
      }
      if (data.signalRConversiontions != null) {
        this.updateCommentsService.sendComment(data.signalRConversiontions)
      }
      if (data.signalRDMConversations != null) {
        this.updateMessagesService.sendMessage(data.signalRDMConversations)
      }
    });
  };

  public addTagDataListner = () => {
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
      this.hubconnection.invoke('SetConnection').then((data) => {
      });
    });
  };

  public getAllocatedProfilesListner = () => {
    this.hubconnection?.on('GetAllocatedProfiles', (res) => {
      // this.addTagService.sendTags(res);
    });
  };

  getConnectionId = () => {
    this.hubconnection.invoke('GetConnectionId').then((data) => {
      this.connectionId = data;
      localStorage.setItem('signalRConnectionId', this.connectionId)
    });
  };
}
