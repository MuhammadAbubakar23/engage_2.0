import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-responder-customer-profiling',
  templateUrl: './responder-customer-profiling.component.html',
  styleUrls: ['./responder-customer-profiling.component.scss'],
})
export class ResponderCustomerProfilingComponent implements OnInit {
  id: string = '';
  profileId: string = '';
  platform: string = '';
  openedChannel: string = '';
  toastermessage: any;
  AlterMsg: any;
  spinner2running: any;
  newEntry: number = 0;
  constructor(
    private commonService: CommonDataService,
    private toggleService: ToggleService
  ) {}

  customerProfileInformation: any[] = [];

  ngOnInit(): void {
    this.id = localStorage.getItem('storeOpenedId') || '';
    this.openedChannel = localStorage.getItem('parent') || '';
    this.getCustomerProfileDetails();
  }
  getCustomerProfileDetails() {
    this.customerProfileInformation = [];
    if (this.searchProfileDetails != '') {
      this.profileId = '';
      this.platform = '';

      var obj = {
        profileId: this.profileId,
        search: this.searchProfileDetails,
        platform: this.platform,
        companyId: 0,
      };
      this.commonService
        .SearchCustomerProfileDetails(obj)
        .subscribe((res: any) => {
          this.customerProfileInformation = res;
          console.log(res);
        });
    } else if (this.searchProfileDetails == '') {
      this.profileId = localStorage.getItem('storeOpenedId') || '';
      this.platform = localStorage.getItem('parent') || '';

      var obj = {
        profileId: this.profileId,
        search: this.searchProfileDetails,
        platform: this.platform,
        companyId: 0,
      };
      this.commonService
        .GetCustomerProfileDetails(obj)
        .subscribe((res: any) => {
          this.customerProfileInformation = res;
          console.log(res);
        });
    }
  }
  // searchCustomerProfileDetails() {
  //   debugger
  //   this.customerProfileInformation = [];
  //   if(this.searchProfileDetails != ""){
  //     this.profileId = '';
  //     this.platform = '';
  //   } else if(this.searchProfileDetails == ""){
  //     this.profileId = localStorage.getItem('storeOpenedId') || '';
  //     this.platform = localStorage.getItem('parent') || '';
  //   }
  //     var obj = {
  //       profileId: this.profileId,
  //       search: this.searchProfileDetails,
  //       platform: this.platform,
  //       companyId: 0,
  //     };
  //   this.commonService.SearchCustomerProfileDetails(obj).subscribe((res: any) => {
  //     this.customerProfileInformation = res;
  //     console.log(res);
  //   });
  // }
  type: string = '';

  addProfileInformation() {
    var obj = {
      externalId: this.id,
      platform: this.openedChannel,
      companyId: 0,
      contractAccount: this.contractAccount,

      customerSocialProfileName: this.customerSocialProfileName,
      customerEmail: this.customerEmail,
      phoneNumber: this.phoneNumber,
    };
    this.commonService.AddProfileInformation(obj).subscribe(
      (res: any) => {
        this.reloadComponent('profileUpdated');
        setTimeout(() => {
          this.closeProfileComponent('customer-profile');
        }, 1000);
      },
      (error: any) => {
        alert(error.error.message);
      }
    );
  }
  show: any = false;
  searchProfileDetails: string = '';
  customerSocialProfileName: string = '';
  contractAccount: string = '';
  customerEmail: string = '';
  phoneNumber: string = '';
  click(val: any) {
    if (val == true) {
      this.show = false;
    }
    if (val == false) {
      this.show = true;
    }
  }
  closeToaster() {
    this.toastermessage = false;
  }
  closeProfileComponent(child: string) {
    if (localStorage.getItem('child') == child) {
      this.toggleService.addTogglePanel('');
    } else {
      this.toggleService.addTogglePanel(child);
    }
  }
  reloadComponent(type: any) {
    if (type == 'profileUpdated') {
      this.AlterMsg = 'Profile updated Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
  }
}
