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
  hasCreatePermission: boolean=false;
  hasupdatePermission: boolean=false;
  hasDeletePermission: boolean=false;
  constructor(private headerService: HeaderService, private commonService: CommonDataService, private router: Router,
     private spinnerServerice: NgxSpinnerService,private _perS:PermissionService) { }

  ngOnInit(): void {
   
    this.hasCreatePermission = this.hasPermission('_nwrul_');
    this.hasupdatePermission = this.hasPermission('_uprul_');
    this.hasDeletePermission = this.hasPermission('_rmvrul_');

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
    if(this.searchText.length> 2){
      this.refreshtableData()
    }
    if(this.searchText.length == 0){
      this.refreshtableData()
    }
  }

  // onChannelChange(event: any) {
  //   this.selectedChannelSlug = event.target.value;
  //   this.selectedRuleType = '';
  //   this.searchText = '';
  //   this.refreshtableData();
  // }
  onChannelChange(event: any) {
    this.selectedChannel = event.target.value;
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
      ruleType: this.selectedRuleType
    };

    this.spinnerServerice.show();
    this.channelRules = [];

    if (this.selectedChannel === '3') {
      this.commonService.GetInstaAllRules(data).subscribe(
        (response: any) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "Instagram",
            rulesWihtCount: response
          });
          this.totalCount = response.TotalCount;
        },
        (error: any) => {
          this.spinnerServerice.hide();
          console.error(error);
        }
      );
    } else if ((this.selectedChannel === '4')) {
      this.commonService.GetLinkdinAllRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "LinkedIn",
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
    else if ((this.selectedChannel === '6')) {
      this.commonService.GetPsAllRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "Playstore",
            rulesWihtCount: response
          });
          this.totalCount = response.TotalCount;
        },
        (error: any) => {
          this.spinnerServerice.hide();
          console.error(error);
        }
      );
    } else if ((this.selectedChannel === '5')) {
      this.commonService.GetYTAllRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "Youtube",
            rulesWihtCount: response
          });
          this.totalCount = response.TotalCount;
        },
        (error: any) => {
          this.spinnerServerice.hide();
          console.error(error);
        }
      );
    } else if ((this.selectedChannel === '7')) {
      this.commonService.GetGsuitRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "G-Suit",
            rulesWihtCount: response
          });
          this.totalCount = response.TotalCount;
        },
        (error: any) => {
          this.spinnerServerice.hide();
          console.error(error);
        }
      );
    } else if ((this.selectedChannel === '8')) {
      this.commonService.GetExchangeEmailRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "Exchange-Email",
            rulesWihtCount: response
          });
          this.totalCount = response.TotalCount;
        },
        (error: any) => {
          this.spinnerServerice.hide();
          console.error(error);
        }
      );
    }else if ((this.selectedChannel === '9')) {
      this.commonService.GetMetaWaRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "G-Suit",
            rulesWihtCount: response
          });
          this.totalCount = response.TotalCount;
        },
        (error: any) => {
          this.spinnerServerice.hide();
          console.error(error);
        }
      );
    }else if ((this.selectedChannel === '10')) {
      this.commonService.GetWslRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "Whatsapp",
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
    else {
      this.commonService.GetAllFbRules(data).subscribe(
        (response: RuleWithCount) => {
          this.spinnerServerice.hide();
          this.channelRules.push({
            platform: "Facebook",
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
  }


  // refreshtableData() {
  //   const data = {
  //     search: this.searchText,
  //     sorting: this.selectedSortOption,
  //     pageNumber: this.currentPage,
  //     pageSize: this.perPage,
  //     ruleType: this.selectedRuleType,
  //     // platform: this.selectedChannelSlug
  //   };
  //   this.spinnerServerice.show();
  //   this.channelRules = [];

  //   switch (this.selectedRuleType) {
  //     case 'Facebook': // Facebook
  //       this.commonService.GetAllFbRules(data).subscribe(
  //         (response: RuleWithCount) => {
  //           this.spinnerServerice.hide();
  //           this.channelRules.push({
  //             platform: "Facebook",
  //             rulesWihtCount: response
  //           });
  //           this.totalCount = response.TotalCount;
  //         },
  //         (error: any) => {
  //           this.spinnerServerice.hide();
  //           console.error(error);
  //         }
  //       );
  //       break;
  //     }
  //     // this.commonService.GetInstaAllRules(data).subscribe(
  //     //   (response: RuleWithCount) => {
  //     //     this.spinnerServerice.hide();
  //     //     this.channelRules.push({
  //     //       platform: "Instagram",
  //     //       rulesWihtCount: response
  //     //     });
  //     //     this.totalCount = response.TotalCount;
  //     //   },
  //     //   (error: any) => {
  //     //     this.spinnerServerice.hide();
  //     //     console.error(error);
  //     //   }
  //     // );

  //   }
  toggleStatus(rule: any) {
    rule.status = !rule.status;

    if (this.selectedChannel === '3') {
      this.commonService.GetInstaRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    }
    else if (this.selectedChannel === '5') {
      this.commonService.GetYTRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    } else if (this.selectedChannel === '6') {
      this.commonService.GetPsRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    } else if (this.selectedChannel === '7') {
      this.commonService.GetGSuitRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    } else if (this.selectedChannel === '10') {
      this.commonService.GetWaRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    }
    else if (this.selectedChannel === '4') {
      this.commonService.GetLinkdinRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    }
    else if (this.selectedChannel === '8') {
      this.commonService.GetExchangeEmailRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    }
    else if (this.selectedChannel === '9') {
      this.commonService.GetMetaWARuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Instagram status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling Instagram status:', error);
        }
      );
    }
    else {
      this.commonService.GetRuleStatus(rule.id, rule.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
        },
        (error: any) => {
          rule.status = !rule.status;
          console.error('Error toggling status:', error);
        }
      );
    }
  }

  loadServices(): void {
    debugger
    this.commonService.GetPlatorm().subscribe(
      (response: any) => {
        this.channels = Object.keys(response).map(key => ({
          id: parseInt(key),
          name: response[key],
          slug: response[key].toLowerCase()
           // Ensure slug is in lowercase
        }));
        const defaultChannel = this.channels.find(channel => channel.name === 'Facebook');
        if (defaultChannel) {
          this.selectedChannelSlug = defaultChannel.id;
        }
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
  // deleteTemplate(rule: any) {
  //   const confirmation = confirm('Are you sure you want to delete this rule?');
  //   if (confirmation) {
  //     this.commonService.DeleteFbRules(rule.id).subscribe(
  //       () => {

  //         const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
  //         if (index !== -1) {
  //           this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
  //         }
  //       },
  //       (error: any) => {
  //         console.error('Error deleting rule:', error);
  //       }
  //     );
  //   }

  // }


  deleteTemplate(rule: any) {
    const confirmation = confirm('Are you sure you want to delete this rule?');
    if (confirmation) {
      if (this.selectedChannel === '3') {
        this.commonService.DeleteInstaRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      } else if (this.selectedChannel === '4') {
        this.commonService.DeleteLinkdinRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      } else if (this.selectedChannel === '5') {
        this.commonService.DeleteYTRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      } else if (this.selectedChannel === '6') {
        this.commonService.DeletePsRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      }else  if (this.selectedChannel === '7') {
        this.commonService.DeleteGSuitRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      } else if (this.selectedChannel === '10') {
        this.commonService.DeleteWaRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      }
      else if (this.selectedChannel === '8') {
        this.commonService.DeleteExchangeEmailRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      }
      else if (this.selectedChannel === '9') {
        this.commonService.DeleteMetaWaRules(rule.id).subscribe(
          () => {
            const index = this.channelRules.findIndex(item => item.rulesWihtCount.Rules.includes(rule));
            if (index !== -1) {
              this.channelRules[index].rulesWihtCount.Rules = this.channelRules[index].rulesWihtCount.Rules.filter((r: any) => r.id !== rule.id);
            }
          },
          (error: any) => {
            console.error('Error deleting Instagram rule:', error);
          }
        );
      }
      else {
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
