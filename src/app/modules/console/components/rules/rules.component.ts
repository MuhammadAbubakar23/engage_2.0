import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { ChannelRule, RuleWithCount } from 'src/app/shared/Models/ChannelRule';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxSpinnerModule],
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  tableData: { name: string, description: string, rulesJson: string, platform: string }[] = [];
  searchText: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  selectedSortOption: string = ''; // Default sort option
  selectedRuleType: string = '';
  totalCount: any;
  channelRules: ChannelRule[] = [];
  channels: any[] = [];
  ruleTypes: any[] = [];
  selectedChannel = '';
  selectedChannelSlug = '';
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router,
     private spinnerServerice: NgxSpinnerService,private _perS:PermissionService) { }

  ngOnInit(): void {
    this.refreshtableData();
    this.getAutoResponderTag();
    this.loadServices()
  }

hasPermission(permissionName: string) {

    const isAccessible = this._perS.hasPermission(permissionName)
    return isAccessible
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshtableData()
    }
    else {
      this.searchText = '';
      this.refreshtableData()
    }
  }

  onChannelChange(event: any) {
    this.selectedChannelSlug = event.target.value;
    this.selectedRuleType = '';
    this.searchText = '';
    this.refreshtableData();
  }
  getAutoResponderTag() {
    this.commonService.GetRuleTag(13).subscribe(
      (response: any) => {
        this.ruleTypes = response
      },
      (error: any) => {
        console.error('Error fetching rule tags:', error);
      }
    );
  }
  onRuleTypeChange(event: any) {
    this.selectedRuleType = event.target.value;
    this.selectedChannelSlug = '';
    this.selectedChannel = '';
    this.searchText = '';
    this.refreshtableData();
  }


  refreshtableData() {
    const data = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage,
      ruleType: this.selectedRuleType,
      platform: this.selectedChannelSlug
    };
    this.spinnerServerice.show();
    this.channelRules = [];

    this.commonService.GetAllFbRules(data).subscribe(
      (response: RuleWithCount) => {
        this.spinnerServerice.hide();
        this.channelRules.push({
          platform: "Rule Name",
          rulesWihtCount: response
        });
        this.totalCount = response.TotalCount;
      },
      (error: any) => {
        this.spinnerServerice.hide();
        console.error(error);
      }
    );

  }
  toggleStatus(rule: any) {
    this.commonService.GetRuleStatus(rule.id).subscribe(
      (response: any) => {
        rule.status = !rule.status;
      },
      (error: any) => {
        console.error('Error toggling status:', error);
      }
    );
  }
  loadServices(): void {
    this.commonService.GetPlatorm().subscribe(
      (response: any) => {

        this.channels = response
      },
      (error: any) => {
        console.error('Error fetching services:', error);
      }
    );
  }
  setSortOption(option: string) {
    this.selectedSortOption = option;
    this.refreshtableData();
  }

  editTemplate(message: any) {
    this.router.navigate(['/console/add-rules', message.id])
  }
  canEditOrDelete(row: any): boolean {
    return row.companyId !== 0;
  }
  deleteTemplate(rule: any) {
    const confirmation = confirm('Are you sure you want to delete this rule?');
    if (confirmation) {
      this.commonService.DeleteFbRules(rule.id).subscribe(
        () => {

          const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
          if (index !== -1) {
            this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
          }
        },
        (error: any) => {
          console.error('Error deleting rule:', error);
        }
      );
    }
  }

  // deleteTemplate(rule: ChannelRule, platform: string) {

  //   const confirmation = confirm('Are you sure you want to delete this template?');
  //   if (confirmation) {
  //     const ruleId = platform === 'Exchange-email' ? (rule.rulesWihtCount.Rules[0] ? rule.rulesWihtCount.Rules[0].id : null) : (rule.rulesWihtCount.Rules[0] ? rule.rulesWihtCount.Rules[0].groupId : null);
  //     if (!ruleId) {
  //       console.error('Rule ID is undefined.');
  //       return;
  //     }
  //     const filteredRules = platform === 'Exchange-email' ? rule.rulesWihtCount.Rules.filter((r: any) => r.id !== ruleId) : rule.rulesWihtCount.Rules.filter((r: any) => r.groupId !== ruleId);

  //     if (platform === 'Exchange-email') {
  //       this.commonService.DeleteFbRules(ruleId).subscribe(
  //         () => {
  //           console.log('GetAllFbRules rule deleted:', rule);
  //           rule.rulesWihtCount.Rules = filteredRules;
  //         },
  //         (error: any) => {
  //           console.error('Error deleting Facebook rule:', error);
  //         }
  //       );
  //     } else if (platform === 'Common') {
  //       this.commonService.DeleteRules(ruleId).subscribe(
  //         () => {
  //           console.log('Common rule deleted:', rule);
  //           rule.rulesWihtCount.Rules = filteredRules;
  //         },
  //         (error: any) => {
  //           console.error('Error deleting Common rule:', error);
  //         }
  //       );
  //     }
  //   }
  // }

  setPerPage(perPage: number): void {
    this.perPage = perPage;
    this.currentPage = 1;
    this.refreshtableData()
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.refreshtableData()
  }
  nextPage(): void {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
    this.refreshtableData()
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalCount / this.perPage)) {
      this.currentPage = pageNumber;
    }
    this.refreshtableData()
  }
  getVisiblePageNumbers(): number[] {
    const maxPages = Math.ceil(this.totalCount / this.perPage);
    const visiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(startPage + visiblePages - 1, maxPages);
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
