import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Message, BotService } from 'src/app/modules/console/services/bot.service';

@Component({
  selector: 'app-chatwithintent',
  templateUrl: './chatwithintent.component.html',
  styleUrls: ['./chatwithintent.component.scss']
})
export class ChatwithintentComponent implements OnInit {
 
  messages: Message[] = [];
  expired: boolean = false;
  text: string='';
  selectedFile: File | null = null;
  toastermessage: string = "";
  isToaster: boolean = false;
  chatForm = new FormGroup({

    text: new FormControl(''),
  });
  constructor(private botService: BotService) {

   }

   ngOnInit() {
    this.botService.conversation.subscribe((val:any) => {
    this.messages = this.messages.concat(val);
  });
}

   sendMessage() {
    this.botService.chat(this.chatForm.value.text!).subscribe((result:any) => {
      const botMessage = new Message('bot',result);
      this.botService.conversation.next([botMessage]);
      this.chatForm.reset();
     },(error:any) => {
      alert("Error Occured")
    });
   }
   trainModel():void{
    this.botService.trainApi().subscribe((result:any) => {
      alert("Success!");
      },(error:any) => {
       alert("Error!");
     });

   }
   onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

   onSubmit() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.botService.fileUploadApi(formData).subscribe((res: any) => {

         alert('File uploaded successfully')
        // this.toastermessage = 'File uploaded successfully';
        // this.isToaster = true;
        // setTimeout(() => {
        //   this.isToaster = false;
        // }, 4000);
      })
    }
  }

}
