import { Component, OnInit } from '@angular/core';

@Component({
  
  selector: 'app-chatbot-story-header',
  templateUrl: './chatbot-story-header.component.html',
  styleUrls: ['./chatbot-story-header.component.scss']
})
export class ChatbotStoryHeaderComponent implements OnInit {
  setName:any
  constructor() { }
  formatUtterance(utterance: string): string {
    return utterance.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  ngOnInit(): void {
    this.setName=localStorage.getItem("name")

  }


}
