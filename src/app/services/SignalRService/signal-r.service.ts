import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr'

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  data:any;

  public hubconnection!: signalR.HubConnection;
  public connectionId !: string;
  public broadcastedData !: any[];

  public startConnection = () => {
    
    this.hubconnection = new signalR.HubConnectionBuilder()
    .withUrl('https://common-engage.enteract.app/ConnectionHub')
    .build();

    this.hubconnection.start()
    .then(()=> console.log('Connection Starteddd'))
    .then(()=> this.getConnectionId())
    .catch(err => console.log('error ==>', err))
  }

  constructor() { }

  getConnectionId() {
    this.hubconnection.invoke('GetConnectionId')
    .then((data)=>{
      this.connectionId = data;
      console.log("invoke data",data)
    })

  }

  // public addTransferChatDataListener = () => {
  //   this.hubconnection.on('SendData', (data) => {
  //     debugger
  //     data.conversationQueues.forEach((newMsg: any) => {
  //       const index = this.ConversationList.findIndex((obj) => obj.user === newMsg.user);
  //       if (index !== -1) {
  //         this.ConversationList.forEach((main: any) => {
  //           if (newMsg.user == main.user) {
  //             this.listingDto = newMsg;
  //             this.listingDto.unrespondedCount = main.unrespondedCount + newMsg.unrespondedCount;
  //             this.ConversationList[index] = this.listingDto;
  //           }
  //         });
  //       } else {
  //         this.ConversationList.push(newMsg);
  //       }
  //       console.log("after signalR", this.ConversationList)
  //       this.changeDetect.detectChanges();
  //     });
  //   });
  // };
}
