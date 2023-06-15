import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FetchIdService } from 'src/app/services/FetchId/fetch-id.service';
import { FetchPostTypeService } from 'src/app/services/FetchPostType/fetch-post-type.service';
import { FilterService } from 'src/app/services/FilterService/filter.service';
import { GetQueryTypeService } from 'src/app/services/GetQueryTypeService/get-query-type.service';
import { SortCriteria } from 'src/app/shared/CustomPipes/sorting.pipe';
import { GetRepliesDto } from 'src/app/shared/Models/GetRepliesDto';
import { ListingDto } from 'src/app/shared/Models/ListingDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { ModulesService } from 'src/app/shared/services/module-service/modules.service';

@Component({
  selector: 'app-sent-items',
  templateUrl: './sent-items.component.html',
  styleUrls: ['./sent-items.component.scss'],
})
export class SentItemsComponent implements OnInit {
  currentDate: any = new Date();

  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  Ids: any[] = [];

  ConversationList: any[] = [];
  TotalUnresponded: number = 0;
  TodayDate: any;
  pageNumber: number = 1;
  pageSize: number = 10;
  platform: string = 'All';

  listingDto = new ListingDto();
  getRepliesDto = new GetRepliesDto();

  public criteria!: SortCriteria;
  public subscription!: Subscription;
  to: number = 0;
  from: number = 0;
  remaining: number = 0;

  constructor(
    private fetchId: FetchIdService,
    private SpinnerService: NgxSpinnerService,
    private fetchposttype: FetchPostTypeService,
    private commondata: CommonDataService,
    private filterService: FilterService,
    private router: Router,
    private lodeModuleService: ModulesService,
    private getQueryTypeService : GetQueryTypeService
  ) {
    this.criteria = {
      property: 'createdDate',
      descending: true,
    };
  }

  ngOnInit(): void {
    this.TodayDate = new Date();
    this.getRepliesList();
    this.getPlatform();
  }

  totalPageNumbers: any;

  getPlatform() {
    this.subscription = this.filterService.getTogglePanel().subscribe((res) => {
      this.platform = res;
      this.pageNumber = 1;
      this.getRepliesList();
    });
  }


  getRepliesList() {
    this.getRepliesDto = {
      platform: this.platform,
    };
    this.SpinnerService.show();
    this.commondata.GetRepliesList(this.getRepliesDto).subscribe((res: any) => {
      debugger;
      this.SpinnerService.hide();
      this.ConversationList = res;
      this.TotalUnresponded = res.TotalCount;
      if (this.TotalUnresponded < this.pageSize) {
        this.from = this.TotalUnresponded;
      } else if (
        this.TotalUnresponded > this.pageSize &&
        this.from < this.pageSize
      ) {
        this.from = this.pageSize;
      }
      if (this.ConversationList.length == 0) {
        this.to = 0;
      } else if (
        this.ConversationList.length != 0 &&
        this.from != 0 &&
        this.pageNumber == 1
      ) {
        this.to = 1;
      }
    });
  }

  Reload() {
    this.TotalUnresponded = 0;
    this.Ids = [];
    this.getRepliesList();

    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
  }

  updatevalue(id: any, postType: any, platform: any, profileId: any) {
    debugger;
    this.fetchId.setPlatform(platform);
    this.fetchId.setOption(id);
    this.fetchposttype.sendPostType(postType);
    this.router.navigateByUrl('/all-inboxes/responder/' + platform);
    this.lodeModuleService.updateModule('responder');
    this.getQueryTypeService.sendQueryType('Replies')
  }

  checkUncheckAll(evt: any) {
    this.ConversationList.forEach(
      (c: any) => (c.isChecked = evt.target.checked)
    );
    this.masterSelected = this.ConversationList.every(
      (l: any) => l.isChecked == true
    );
    if (this.masterSelected == true) {
      this.ConversationList.forEach((d: any) => {
        // var abc = this.Ids.find(
        //   (x) => x.Id == d.id && x.Platform == d.Platform
        // );
        if (!this.Ids.includes(d.id)) {
          this.Ids.push(d.id);
        }
      });
      //  // console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    } else {
      this.ConversationList.forEach((d: any) => {
        for (var i = 0; i <= this.Ids.length; i++) {
          var abc = this.Ids.find((x) => x.Id == d.id);
          this.Ids.splice(abc, 1);
        }
      });
      //  // console.log(this.Ids);
      this.isChecked = false;
      this.isCheckedAll = false;
    }
  }

  isAllSelected(evt: any, index: any, platform: any) {
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push(id);
      //  // console.log(this.Ids);
    }
    if (evt.target.checked == false) {
      var abc = this.Ids.find((x) => x.Id == id);
      this.Ids.splice(abc, 1);
    }
    this.ConversationList[index].isChecked = evt.target.checked;
    this.masterSelected = this.ConversationList.every(
      (l: any) => l.isChecked == true
    );

    let checkselectedlogs = this.ConversationList.find(
      (x: any) => x.isChecked == true
    );
    if (this.masterSelected == true) {
      this.isChecked = true;
      this.isCheckedAll = true;
    } else if (checkselectedlogs != undefined) {
      this.isChecked = true;
      this.isCheckedAll = false;
    } else {
      this.isChecked = false;
      this.isCheckedAll = false;
    }
  }

  NextPage(pageNumber: any) {
    if (this.TotalUnresponded < this.from) {
      this.from = this.TotalUnresponded;
    }
    this.totalPageNumbers = this.TotalUnresponded / this.pageSize;
    if (this.totalPageNumbers > pageNumber) {
      this.totalPageNumbers = Math.round(this.totalPageNumbers + 1);
    }
    let page = pageNumber + 1;
    if (page <= this.totalPageNumbers) {
      this.pageNumber = page;
      this.getRepliesList();
      this.remaining = this.TotalUnresponded - this.from;
      if (this.remaining > this.pageSize) {
        this.to = 1 + this.from;
        this.from = this.from + this.pageSize;
      } else {
        this.to = 1 + this.from;
        this.from = this.TotalUnresponded;
      }
    }
    this.pageNumber;
  }
  PreviousPage(pageNumber: any) {
    if (pageNumber >= 1) {
      let page = pageNumber - 1;
      if (page > 0) {
        this.pageNumber = page;
        this.getRepliesList();
        if (this.remaining > this.pageSize) {
          this.from = this.from - this.pageSize;
        } else {
          this.from = this.from - this.remaining;
        }
        if (this.to > this.pageSize) {
          this.remaining = this.pageSize;
        }
        if (this.to > this.pageSize) {
          this.to = this.from - (this.pageSize - 1);
        } else {
          this.to = 1;
          this.from = this.pageSize;
        }
      }
    }
  }
}
