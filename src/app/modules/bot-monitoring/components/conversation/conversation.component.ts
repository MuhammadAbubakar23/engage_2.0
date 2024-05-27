import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class ConversationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
