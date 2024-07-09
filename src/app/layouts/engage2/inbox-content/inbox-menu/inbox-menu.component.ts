import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/services/FilterService/filter.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { UnRespondedCountService } from 'src/app/services/UnRepondedCountService/un-responded-count.service';
import { UpdateListService } from 'src/app/services/UpdateListService/update-list.service';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/services/Skills/skills.service';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { SkillslugService } from 'src/app/services/skillSlug/skillslug.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
@Component({
  selector: 'inbox-menu',
  templateUrl: './inbox-menu.component.html',
  styleUrls: ['./inbox-menu.component.scss'],
})
export class InboxMenuComponent implements OnInit {
  allChannels: any = [];
  public Subscription!: Subscription;
  UnResponded: number = 0;
  SlaUnResponded: number = 0;
  WaUnResponded: number = 0;
  SmsUnResponded: number = 0;
  FbUnResponded: number = 0;
  EmailUnResponded: number = 0;
  OfficeEmailUnResponded: number = 0;
  WebchatUnResponded: number = 0;
  TwitterUnResponded: number = 0;
  InstaUnResponded: number = 0;
  LinkedInUnResponded: number = 0;
  PlaystoreUnResponded: number = 0;
  YoutubeUnResponded: number = 0;
  flag: string = '';
  activeChannel: string = '';
  baseUrl: string = '';
  client: string = '';
  allSkills: any[] = [];
  constructor(
    private filterService: FilterService,
    private commonService: CommonDataService,
    private unrespondedCountService: UnRespondedCountService,
    private updateListService: UpdateListService,
    private router: Router,
    private getSkills: SkillsService,
    private getWing: GetWingsService,
    private skillSlugService: SkillslugService,
    private storage:StorageService
  ) {}
  ngOnInit(): void {
  if(this.getSkills.skills){
    this.allSkills = this.getSkills.skills;
    console.log('serviceSkill', this.allSkills)
  } else {
    let skills = this.storage.retrive('skills', 'O').local;
    this.allSkills = skills
    console.log('localStorageSkills', this.allSkills)
  }

    
    this.baseUrl = window.location.origin;
    if (this.baseUrl == 'https://engage.jazz.com.pk') {
      this.client = 'jazz';
    } else if (this.baseUrl == 'https://keportal.enteract.live') {
      this.client = 'ke';
    } else if (this.baseUrl == 'https://waengage.enteract.live') {
      this.client = 'morinaga';
    } else if (this.baseUrl == 'https://tpplui.enteract.live') {
      this.client = 'tppl';
    } else if (this.baseUrl == 'http://localhost:4200') {
      this.client = 'localhost';
    } else if (this.baseUrl == 'https://uiengage.enteract.app') {
      this.client = 'stagging';
    } else if (this.baseUrl == 'https://bzengage.enteract.live') {
      this.client = 'Bazaar';
    } else if (this.baseUrl == 'https://uiengagerox.enteract.app') {
      this.client = 'stagging';
    }
    this.activeChannel = this.router.url.split('/')[3];
    this.flag = this.router.url.split('/')[2];
    if (this.flag == 'focused') {
      this.Subscription = this.unrespondedCountService
        .getUnRespondedCount()
        .subscribe((res) => {
          this.UnResponded = res.totalCount;
          res.platformCount.forEach((platform: any) => {
            switch (platform.platform) {
              case 'Facebook':
                this.FbUnResponded = platform.count;
                break;
              case 'Instagram':
                this.InstaUnResponded = platform.count;
                break;
              case 'Twitter':
                this.TwitterUnResponded = platform.count;
                break;
              case 'LinkedIn':
                this.LinkedInUnResponded = platform.count;
                break;
              case 'Youtube':
                this.YoutubeUnResponded = platform.count;
                break;
              case 'SMS':
                this.SmsUnResponded = platform.count;
                break;
              case 'WhatsApp':
                this.WaUnResponded = platform.count;
                break;
              case 'WebChat':
                this.WebchatUnResponded = platform.count;
                break;
              case 'Email':
                this.EmailUnResponded = platform.count;
                break;
              case 'OfficeEmail':
                this.OfficeEmailUnResponded = platform.count;
                break;
              case 'PlayStore':
                this.PlaystoreUnResponded = platform.count;
                break;
            }
          });
        });
      this.Subscription.add(
        this.updateListService.receiveList().subscribe((res) => {
          res.forEach((platform: any) => {
            this.UnResponded += 1;
            switch (platform.platform) {
              case 'Facebook':
                this.FbUnResponded += 1;
                break;
              case 'Instagram':
                this.InstaUnResponded += 1;
                break;
              case 'Twitter':
                this.TwitterUnResponded += 1;
                break;
              case 'LinkedIn':
                this.LinkedInUnResponded += 1;
                break;
              case 'Youtube':
                this.YoutubeUnResponded += 1;
                break;
              case 'SMS':
                this.SmsUnResponded += 1;
                break;
              case 'WhatsApp':
                this.WaUnResponded += 1;
                break;
              case 'WebChat':
                this.WebchatUnResponded += 1;
                break;
              case 'Email':
                this.EmailUnResponded += 1;
                break;
              case 'OfficeEmail':
                this.OfficeEmailUnResponded += 1;
                break;
              case 'PlayStore':
                this.PlaystoreUnResponded += 1;
                break;
            }
          });
        })
      );
      this.getAllChannelsUnrespondedCounts();
    }
  }
  channels: any[] = [];
  platformWiseCount: any[] = [];
  getAllChannelsUnrespondedCounts() {
    var obj = {
      "wings": this.getWing.wings,
      "skills": this.skillSlugService.skillSlug
    }
    this.commonService
      .GetAllChannelsUnrespondedCount(obj)
      .subscribe((res: any) => {
        // this.GetChannels();
        this.UnResponded = res.totalCount;
        this.platformWiseCount = res.platformCount;
        res.platformCount.forEach((platform: any) => {
          if (platform.platform == 'Facebook') {
            this.FbUnResponded = platform.count;
          }
          if (platform.platform == 'Instagram') {
            this.InstaUnResponded = platform.count;
          }
          if (platform.platform == 'Twitter') {
            this.TwitterUnResponded = platform.count;
          }
          if (platform.platform == 'LinkedIn') {
            this.LinkedInUnResponded = platform.count;
          }
          if (platform.platform == 'Youtube') {
            this.YoutubeUnResponded = platform.count;
          }
          if (platform.platform == 'SMS') {
            this.SmsUnResponded = platform.count;
          }
          if (platform.platform == 'WhatsApp') {
            this.WaUnResponded = platform.count;
          }
          if (platform.platform == 'WebChat') {
            this.WebchatUnResponded = platform.count;
          }
          if (platform.platform == 'Email') {
            this.EmailUnResponded = platform.count;
          }
          if (platform.platform == 'OfficeEmail') {
            this.OfficeEmailUnResponded = platform.count;
          }
          if (platform.platform == 'PlayStore') {
            this.PlaystoreUnResponded = platform.count;
          }
        });
      });
  }
  updatevalue(string: any) {
    this.filterService.addTogglePanel(string);
  }
  updateWing(skillSlug:string) {
    if(skillSlug === ''){
      this.skillSlugService.sendSkillSlug([]);
    } else {
      this.skillSlugService.sendSkillSlug([skillSlug]);
    }
  }
}
