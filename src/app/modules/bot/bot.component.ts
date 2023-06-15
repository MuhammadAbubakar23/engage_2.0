import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/SharedService/shared.service';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { BotbuilderComponent } from './components/botbuilder/botbuilder.component';

import { ChatComponent } from './components/chat/chat.component';
import { IntentsComponent } from './intents/intents.component';
import { UpdateIntentsComponent } from './components/update-intents/update-intents.component';
import { BotSettingsComponent } from './components/bot-settings/bot-settings.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { ChatWithSentimentComponent } from './components/chatwithsentiment/chatwithsentiment';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit, AfterViewInit {
  @ViewChild('container',
    { read: ViewContainerRef, })
  target!: ViewContainerRef;
  @ViewChild('rightcontainer', { read: ViewContainerRef, }) rightcontainer!: ViewContainerRef;
  panelToggled: any;
  showPanel = false;

  componentName: any;

  public subscription !: Subscription;
  constructor(private route: ActivatedRoute,
    private sharedService: SharedService,
    private toggleService: ToggleService,
    private resolver : ComponentFactoryResolver) { }

  ngOnInit(): void {

    this.route.params.subscribe((routeParams) => {

      if (routeParams['channel'] != undefined && routeParams['channel'] != "undefined") {
        this.componentName = routeParams['channel'];

        localStorage.setItem('parent', this.componentName);

        this.target?.clear();

        this.loadComponent(this.componentName, '');
      }

    });

    this.subscription = this.toggleService.getTogglePanel().subscribe(msg3 => {

      if (msg3) {
        this.rightcontainer?.clear();
        localStorage.setItem('child', msg3)
        this.showPanel = true
        this.loadComponent('', msg3)
      }
      else {
        this.showPanel = false;
        this.rightcontainer?.clear();
        localStorage.setItem('child', '')
      }
    });
  }

  ngAfterViewInit(): void {

    this.route.params.subscribe((routeParams) => {

      if (routeParams['channel'] != undefined && routeParams['channel'] != "undefined") {
        this.componentName = routeParams['channel'];

        localStorage.setItem('parent', this.componentName);

        this.target?.clear();

        this.loadComponent(this.componentName, '');
      }

    });

    this.subscription = this.toggleService.getTogglePanel().subscribe(msg3 => {

      if (msg3) {
        this.rightcontainer?.clear();
        localStorage.setItem('child', msg3)
        this.showPanel = true
        this.loadComponent('', msg3)
      }
      else {
        this.showPanel = false;
        this.rightcontainer?.clear();
        localStorage.setItem('child', '')
      }
    });
  }

  loadComponent(leftSideName: string, rightSideName: string) {

    let componentFactory:any = null;

    switch (leftSideName || rightSideName) {
      case 'bot-builder':
        componentFactory = this.resolver.resolveComponentFactory(BotbuilderComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'chat':

        this.route.params.subscribe((routeParams) => {
          console.log('routeParams', routeParams['channel']);

          switch (routeParams['channel']) {

            case 'sentiment-anlysis':
              console.log('sentimentAnalysis');
              componentFactory = this.resolver.resolveComponentFactory(ChatWithSentimentComponent);
              break;
            default:
              console.log('Chat');
              componentFactory = this.resolver.resolveComponentFactory(ChatComponent);
              break;
          }
          this.rightcontainer?.clear();
          this.rightcontainer?.createComponent(componentFactory);
        });
        break;
      case 'intents':
        componentFactory = this.resolver.resolveComponentFactory(IntentsComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'update':
        componentFactory = this.resolver.resolveComponentFactory(UpdateIntentsComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'bot-settings':
        componentFactory = this.resolver.resolveComponentFactory(BotSettingsComponent);
        this.target?.createComponent(componentFactory);
        break;
      case 'sentiment-anlysis':
        componentFactory = this.resolver.resolveComponentFactory(SentimentComponent);
        this.target?.createComponent(componentFactory);
        break;
      default:

        componentFactory = this.resolver.resolveComponentFactory(BotbuilderComponent);
        this.target?.createComponent(componentFactory);
        break;
    }
  }

}
