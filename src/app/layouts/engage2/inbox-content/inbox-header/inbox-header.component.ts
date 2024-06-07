import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersDto } from 'src/app/shared/Models/FiltersDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ClosePanelService } from 'src/app/services/ClosePanelServices/close-panel.service';
import { ChangeDetectorRef } from '@angular/core';
import { GetWingsService } from 'src/app/services/GetWings/get-wings.service';
import { RulesGroupIdsService } from 'src/app/services/RulesGroupIds/rules-group-ids.service';
import { SkillslugService } from 'src/app/services/skillSlug/skillslug.service';
@Component({
  selector: 'inbox-header',
  templateUrl: './inbox-header.component.html',
  styleUrls: ['./inbox-header.component.scss'],
})
export class InboxHeaderComponent implements OnInit {
  flag: string = '';
  followUpCount: number = 0;
  inboxHeader: any[] = [];
  filterDto = new FiltersDto();
  pageNumber: number = 1;
  pageSize: number = 500;
  UnResponded: number = 0;
  AlterMsg: any;
  toastermessage: any;
  skillSlugUrl:string='';
  skillSlug:any[]=[]
  constructor(
    private stor: StorageService,
    private commonService: CommonDataService,
    private reviceTotalCountServices: ClosePanelService,
    private cd: ChangeDetectorRef,
    private _route: Router,
    private getWing: GetWingsService,
    private route: Router,
    private skillSlugService: SkillslugService
  ) {}
  ngOnInit(): void {
    this.flag = this._route.url.split('/')[2];
    this.skillSlugUrl = this.route.url.split('/')[3];
    if (this.skillSlugUrl === 'all') {
      this.skillSlug = [];
    } else {
      this.skillSlug = this.skillSlugService.skillSlug;
    }
    // this.getAllConversationCount();
    this.reviceTotalCountServices.reciveTaotalCounts().subscribe((res: any) => {
      this.followUpCount = res;
    });
    const headerMenu = this.stor.retrive('Tags', 'O').local;
    headerMenu.forEach((item: any) => {
      if (item.name == 'Engage Header') {
        item.subTags.forEach((singleInboxHeaderMenu: any) => {
          if (!this.inboxHeader.includes(singleInboxHeaderMenu)) {
            this.inboxHeader.push(singleInboxHeaderMenu);
          }
        });
      }
    });
    this.getFollowUpCount();
  }
  getFollowUpCount() {
    this.filterDto = {
      fromDate: null,
      toDate: null,
      user: '',
      pageId: '',
      plateForm: '',
      pageNumber: 0,
      pageSize: 0,
      isAttachment: false,
      hasBlueTick: false,
      queryType: '',
      text: '',
      include: '',
      userName: '',
      notInclude: '',
      flag: '',
      wings: this.getWing.wings,
      skills: this.skillSlug,
    };
    this.commonService
      .GetFollowUpCount(this.filterDto)
      .subscribe((res: any) => {
        this.followUpCount = res;
      });
  }
  getAllConversationCount() {
    this.filterDto = {
      // fromDate : new Date(),
      // toDate : new Date(),
      user: '',
      pageId: '',
      plateForm: '',
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      hasBlueTick: false,
      isAttachment: false,
      queryType: '',
      text: '',
      userName: '',
      notInclude: '',
      include: '',
      flag: '',
      wings: '',
      skills: [],
    };
    this.commonService
      .GetConversationList(this.filterDto)
      .subscribe((res: any) => {
        this.UnResponded = res.TotalCount;
      });
  }
  update(menuLink: any) {
    this.flag = this._route.url.split('/')[2];
    if (
      localStorage.getItem('assignedProfile') == null ||
      localStorage.getItem('assignedProfile') == '' ||
      localStorage.getItem('assignedProfile') == undefined
    ) {
      this._route.navigateByUrl('/' + menuLink);
    } else {
      this.reloadComponent('querryAssigned');
    }
    this.cd.detectChanges();
  }
  reloadComponent(type: any) {
    if (type == 'querryAssigned') {
      this.AlterMsg = 'Please Complete Querry First!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
}
