import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bot-stepper-header',
  templateUrl: './chat-bot-stepper-header.component.html',
  styleUrls: ['./chat-bot-stepper-header.component.scss']
})
export class ChatBotStepperHeaderComponent implements OnInit {
  setName:any
  constructor() { }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  ngOnInit(): void {
    this.setName=sessionStorage.getItem("name")

  }

}
