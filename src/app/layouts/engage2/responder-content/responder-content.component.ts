import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaximizeChatService } from 'src/app/services/maximize-chat.service';
import { MinimizedChatWidgetComponent } from 'src/app/shared/minimized-chat-widget/minimized-chat-widget.component';

@Component({
  selector: 'responder-content',
  templateUrl: './responder-content.component.html',
  styleUrls: ['./responder-content.component.scss']
})
export class ResponderContentComponent implements OnInit {

  @ViewChild('maximizeChat', {
    read: ViewContainerRef,
  })
  maximizeChatTarget!: ViewContainerRef;

  maximizeChatComponent!: string;
  
  toggleLeftBar:boolean = true;  
  showPanel:boolean = false;
  public subscription!: Subscription;
  
  constructor(private maximizeChatService : MaximizeChatService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

    this.subscription = this.maximizeChatService.getMessage().subscribe((msg) => {
      this.maximizeChatComponent = msg;

      this.maximizeChatTarget.clear();
      this.maximizeChat(this.maximizeChatComponent);
    });
  }
  toggleSubLeftBar(){
    this.toggleLeftBar = !this.toggleLeftBar;
  }
  toggleRightPanel() {
   this.showPanel = !this.showPanel;
  }
  maximizeChat(maximizeChatComponent: string) {
    
    let componentFactory = null;

    switch (maximizeChatComponent) {
      case 'maximizeChat':
        componentFactory =
          this.resolver.resolveComponentFactory(MinimizedChatWidgetComponent);
        this.maximizeChatTarget.createComponent(componentFactory);
        break;
      default:
        componentFactory =
          this.resolver.resolveComponentFactory(MinimizedChatWidgetComponent);
        this.maximizeChatTarget.createComponent(componentFactory);
        break;
    }
  }
}
