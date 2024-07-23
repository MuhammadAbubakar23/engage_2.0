import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/services/HeaderService/header.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-auto-responder',
  templateUrl: './auto-responder.component.html',
  styleUrls: ['./auto-responder.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSpinnerModule, FormsModule]
})
export class AutoResponderComponent implements OnInit {
  templates: any[] = [];
  channels: any[] = [];
  searchText: string = '';
  perPage: number = 15;
  currentPage: number = 1;
  totalCount: any;
  selectedChannel = '';
  channelRules: any
  AlterMsg: string = ''
  errormessage: any;
  selectedChannelSlug:any
  toastermessage: boolean = false
  channelServiceMapping: { [key: string]: (data: any) => any } = {
    '3': (data: any) => this.commonData.getAllAutoRespondInsta(data),
    '4': (data: any) => this.commonData.getAllAutoRespondLinkedin(data),
    '5': (data: any) => this.commonData.getAllAutoRespondYt(data),
    '6': (data: any) => this.commonData.getAllAutoRespondPs(data),
    '7': (data: any) => this.commonData.getAllAutoRespondGsuit(data),
    '10': (data: any) => this.commonData.getAllAutoRespondWa(data),
    '8': (data: any) => this.commonData.getAllAutoRespondExChange(data),
    '9': (data: any) => this.commonData.getAllAutoRespondMetaWA(data),
    'default': (data: any) => this.commonData.getAutoRespondFB(data)
  };
  constructor(private headerService: HeaderService, private commonData: CommonDataService, private spinnerServerice: NgxSpinnerService) {

  }
  ngOnInit(): void {
    this.refreshtableData()
    this.loadServices()
  }
  updatevalue(string: any) {
    this.headerService.updateMessage(string);
  }
  applySearchFilter() {
    if(this.searchText.length> 2){
      this.refreshtableData();
    }
    if(this.searchText.length == 0){
      this.refreshtableData();
    }
  }
  onChannelChange(event: any) {
    this.selectedChannel = event.target.value;
    this.refreshtableData();
  }
  loadAPI() {
    this.refreshtableData()
  }
  loadServices(): void {
    this.commonData.GetPlatorm().subscribe(
      (response: any) => {
        this.channels = Object.keys(response).map(key => ({
          id: parseInt(key),
          name: response[key]
        }));
        const defaultChannel = this.channels.find(channel => channel.name === 'Facebook');
        if (defaultChannel) {
          this.selectedChannelSlug = defaultChannel.id;
        }
      },
      (error: any) => {
        console.error('Error fetching services:', error);
        this.reload(error.error.message)


      }
    );
  }
  toggleStatus(template: any) {
    template.status = !template.status;
    if (this.selectedChannel === '3') {
      this.commonData.GetInstaTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)

        }
      );
    }
    else if (this.selectedChannel === '5') {
      this.commonData.GetYtTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)

        }
      );
    } else if (this.selectedChannel === '8') {
      this.commonData.GetExchangeEmailTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)

        }
      );
    } else if (this.selectedChannel === '9') {
      this.commonData.GetMetaWaTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)

        }
      );
    } else if (this.selectedChannel === '6') {
      this.commonData.GetPsTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)

        }
      );
    } else if (this.selectedChannel === '7') {
      this.commonData.GetGSuitTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)

        }
      );
    } else if (this.selectedChannel === '10') {
      this.commonData.GetWaTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)

        }
      );
    }
    else if (this.selectedChannel === '4') {
      this.commonData.GetLinkedinTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
          this.reload(error.error.message)


        }
      );
    }
    else {
      this.commonData.GetTemplateStatus(template.uniqueId, template.status).subscribe(
        (response: any) => {
          console.log('Status updated successfully:', response);
          this.reload(response.message)

        },
        (error: any) => {
          template.status = !template.status;
          console.error('Error toggling status:', error);
        }
      );
    }
  }
  // toggleStatus(template: any) {
  //   template.status = !template.status;
  //   this.commonData.GetTemplateStatus(template.uniqueId, template.status).subscribe(
  //     (response: any) => {
  //       console.log('Status updated successfully:', response);
  //     },
  //     (error: any) => {
  //       template.status = !template.status;
  //       console.error('Error toggling status:', error);
  //     }
  //   );
  // }
  // toggleStatus(template: any) {
  //   this.commonData.GetTemplateStatus(template.uniqueId).subscribe(
  //     (response: any) => {
  //       template.status = !template.status;
  //     },
  //     (error: any) => {
  //       console.error('Error toggling status:', error);
  //     }
  //   );
  // }

  refreshtableData() {
    const data = {
      search: this.searchText,
      sorting: this.selectedSortOption,
      pageNumber: this.currentPage,
      pageSize: this.perPage
    };

    this.spinnerServerice.show();
    this.channelRules = [];

    // Retrieve the service method from the mapping
    const serviceMethod = this.channelServiceMapping[this.selectedChannel] || this.channelServiceMapping['default'];

    serviceMethod(data).subscribe(
      (response: any) => {
        this.spinnerServerice.hide();
        this.reload(response.message)

        this.templates = response.Rules;
        this.totalCount = response.TotalCount;
      },
      (error: any) => {
        this.spinnerServerice.hide();
        console.error(error);
        this.reload(error.error.message)

      }
    );
  }

  // refreshtableData() {
  //   const data = {
  //     search: this.searchText,
  //     sorting: this.selectedSortOption,
  //     pageNumber: this.currentPage,
  //     pageSize: this.perPage
  //   };
  //   this.spinnerServerice.show();
  //   // if (this.selectedChannel === 'Facebook') {
  //     this.commonData.getAutoRespondFB(data).subscribe(
  //       (response: any) => {
  //         this.spinnerServerice.hide();
  //         this.templates = response.Rules
  //         this.totalCount = response.TotalCount;
  //       },
  //       (error: any) => {
  //         this.spinnerServerice.hide();
  //         console.error(error);
  //       }
  //     );
  //   // }
  //   // else {
  //   //   this.commonData.GetAllRules(data).subscribe(
  //   //     (response: any) => {
  //   //       this.spinnerServerice.hide();
  //   //      this.templates=response
  //   //       this.totalCount = response.TotalCount;
  //   //     },
  //   //     (error: any) => {
  //   //       this.spinnerServerice.hide();
  //   //       console.error(error);
  //   //     }
  //   //   );
  //   // }
  //   // this.commonData.getAutoRespondFB(nativeIdentifier).subscribe((res: any) => {
  //   //   console.log("data fb ", res)
  //   //   this.templates = res
  //   // })
  // }
  selectedSortOption: any;
  deleteTemplate(template: any) {
    const confirmation = confirm('Are you sure you want to delete this rule?');
    if (confirmation) {
      if (this.selectedChannel === '3') {
        this.commonData.DeleteInstaTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)
          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      } else if (this.selectedChannel === '4') {
        this.commonData.DeleteLinkedinTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      } else if (this.selectedChannel === '8') {
        this.commonData.DeleteExchangeTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      } else if (this.selectedChannel === '9') {
        this.commonData.DeleteMetaWaTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      }
      else if (this.selectedChannel === '5') {
        this.commonData.DeleteYTTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      } else if (this.selectedChannel === '6') {
        this.commonData.DeletePsTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      } else if (this.selectedChannel === '7') {
        this.commonData.DeleteGsuitTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      } else if (this.selectedChannel === '10') {
        this.commonData.DeleteWaTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      }
      else {
        this.commonData.DeleteTemplate(template.uniqueId).subscribe(
          (res) => {
            this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
            this.reload(res.message)

          },
          (error: any) => {
            console.error('Error deleting template:', error);
            this.reload(error.error.message)

          }
        );
      }
    }
  }
  // deleteTemplate(template: any) {
  //   const confirmation = confirm('Are you sure you want to delete this template?');
  //   if (confirmation) {
  //     this.commonData.DeleteTemplate(template.uniqueId).subscribe(
  //       () => {
  //         this.templates = this.templates.filter((msg) => msg.uniqueId !== template.uniqueId);
  //       },
  //       (error: any) => {
  //         console.error('Error deleting template:', error);
  //       }
  //     );
  //   }
  // }
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
  reload(value: any) {

    if (value) {
      this.AlterMsg = value
      this.toastermessage = true
      setTimeout(() => {
        this.toastermessage = false
      }, 2000);
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
}
