import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { ChannelRule, RuleWithCount } from 'src/app/shared/Models/ChannelRule';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
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
  totalCount: any;
  channelRules: ChannelRule[] = [];
  applySearchFilter() {
    if (this.searchText.trim() !== '') {
      this.refreshtableData()
    }
    else {
      this.searchText = '';
      this.refreshtableData()
    }
  }

  refreshtableData() {
    const data = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage
    }
    this.spinnerServerice.show()
    this.channelRules = [];
    this.commonService.GetAllFbRules(data).subscribe((response: RuleWithCount) => {

      this.spinnerServerice.hide();
      this.channelRules.push({
        platform: "Facebook",
        rulesWihtCount: response
      })
      //  this.tableData = response.Rules.map((item: any) => ({ ...item, platform: 'Facebook' }));
      this.totalCount = response.TotalCount
    })
    this.commonService.GetAllRules(data).subscribe(
      (response: any) => {
        this.spinnerServerice.hide();
        this.channelRules.push({
          platform: "Common",
          rulesWihtCount: response
        })
        // this.tableData = response.Rules.map((item: any) => ({ ...item, platform: 'Common' }));
        this.totalCount = response.TotalCount

      },
      (error: any) => {
        this.spinnerServerice.hide()

        console.error(error);
      }
    );
  }
  selectedSortOption: any;

  setSortOption(option: string) {

    this.selectedSortOption = option;
    this.refreshtableData();
  }
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router, private spinnerServerice: NgxSpinnerService) { }
  ngOnInit(): void {
    this.refreshtableData()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  editTemplate(message: any) {

    this.router.navigate(['/console/add-rules', message.id])
  }
  canEditOrDelete(row: any): boolean {
    // Add your condition here, for example:
    return row.companyId !== 0;
  }

  deleteTemplate(rule: ChannelRule, platform: string) {
    const confirmation = confirm('Are you sure you want to delete this template?');
    if (confirmation) {
      const ruleId = platform === 'Facebook' ? rule.rulesWihtCount.Rules[0].id : rule.rulesWihtCount.Rules[0].groupId;
      const filteredRules = platform === 'Facebook' ? rule.rulesWihtCount.Rules.filter((r: any) => r.id !== ruleId) : rule.rulesWihtCount.Rules.filter((r: any) => r.groupId !== ruleId);

      if (platform === 'Facebook') {
        this.commonService.DeleteFbRules(ruleId).subscribe(
          () => {
            console.log('Facebook rule deleted:', rule);
            rule.rulesWihtCount.Rules = filteredRules;
          },
          (error: any) => {
            console.error('Error deleting Facebook rule:', error);
          }
        );
      } else if (platform === 'Common') {
        this.commonService.DeleteRules(ruleId).subscribe(
          () => {
            console.log('Common rule deleted:', rule);
            rule.rulesWihtCount.Rules = filteredRules;
          },
          (error: any) => {
            console.error('Error deleting Common rule:', error);
          }
        );
      }
    }
  }
  // deleteTemplate(rule: ChannelRule, platform: string) {
  //   const confirmation = confirm('Are you sure you want to delete this template?');
  //   if (confirmation) {
  //     const ruleId = platform === 'Facebook' ? rule.rulesWihtCount.Rules[0].id : rule.rulesWihtCount.Rules[0].groupId;
  //     const filteredRules = platform === 'Facebook' ? rule.rulesWihtCount.Rules.filter((r: any) => r.id !== ruleId) : rule.rulesWihtCount.Rules.filter((r: any) => r.groupId !== ruleId);

  //     const deleteService = platform === 'Facebook' ? this.commonService.DeleteFbRules(ruleId) : this.commonService.DeleteRules(ruleId);

  //     deleteService.subscribe(
  //       () => {
  //         console.log(`${platform} rule deleted:`, rule);
  //         rule.rulesWihtCount.Rules = filteredRules;
  //       },
  //       (error: any) => {
  //         console.error(`Error deleting ${platform} rule:`, error);
  //       }
  //     );
  //   }
  // }
  disableTemplate(message: any) {
    console.log('Disabling template:', message);
  }
  cloneTemplate(message: any) {
  }
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
