import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatVisibilityService } from 'src/app/modules/bot-monitoring/services/chat-visibility.service';

@Component({
  selector: 'app-monitoring-menu',
  templateUrl: './monitoring-menu.component.html',
  styleUrls: ['./monitoring-menu.component.scss']
})
export class MonitoringMenuComponent implements OnInit {
  searchText: any = '';
  defaultChatItems: any[] = [
    { 'id': 1, 'name': 'Usman khan', 'lastMessage': "How are you?", 'time': '12:22AM', 'count': 4, 'category': 'Order Bot' },
    { 'id': 2, 'name': 'Umair khan', 'lastMessage': "How are you?", 'time': '12:22AM', 'count': 2, 'category': 'FAQ Bot' },
    { 'id': 3, 'name': 'Ali Haider', 'lastMessage': "How are you?", 'time': '12:22AM', 'count': 1, 'category': 'FAQ Bot' },
    { 'id': 4, 'name': 'Awais Mahmood', 'lastMessage': "How are you?", 'time': '12:22AM', 'count': 5, 'category': 'Order Bot' }
  ];
  chatItems: any[] = this.defaultChatItems.slice();
  showChats = false;
  private activeIdSubscription: Subscription;
  constructor(private chatVisibilityService: ChatVisibilityService) {
    this.activeIdSubscription = this.chatVisibilityService.activeId$.subscribe((activeId) => {
      debugger
      if (activeId) {
        const clickedItem = this.chatItems.find(item => item.id === activeId);
        clickedItem.active = false;
      }
    })
  }

  ngOnInit(): void {

  }

  toggleChatVisibility(clickedItem: any) {

    console.log("chatItems", this.chatItems)
    const activeItems = this.chatItems.filter(item => item.active);
    clickedItem.active = !clickedItem.active;
    this.chatVisibilityService.notifyNewChatId(clickedItem.id);

  }

  filterResults() {
    if (!this.searchText) {
      this.chatItems = this.defaultChatItems.slice();
      return;
    }
    this.chatItems = this.defaultChatItems.filter(
      item => item?.name.toLowerCase().includes(this.searchText.toLowerCase()) || item?.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
