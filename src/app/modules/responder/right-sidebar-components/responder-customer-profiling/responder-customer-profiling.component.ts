import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormControlName, AbstractControl} from '@angular/forms';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
@Component({
  selector: 'app-responder-customer-profiling',
  templateUrl: './responder-customer-profiling.component.html',
  styleUrls: ['./responder-customer-profiling.component.scss'],
})
export class ResponderCustomerProfilingComponent implements OnInit {
[x: string]: any;
  id: string = '';
  profileId: string = '';
  platform: string = '';
  openedChannel: string = '';
  toastermessage: any;
  AlterMsg: any;
  spinner2running: any;
  newEntry: number = 0;
  index:any
  deattachInformation:any;
  constructor(
    private commonService: CommonDataService,
    private toggleService: ToggleService
  ) {}
customerInformationForm= new FormGroup({
  customerSocialProfileName: new FormControl('',[Validators.required]),
  contractAccount: new FormControl('',[Validators.required]),
  phoneNumber: new FormControl('', [ Validators.minLength(11), Validators.maxLength(14)]),
  customerEmail: new FormControl('',[Validators.email])
})
  customerProfileInformation: any[] = [];
  get f(): { [key: string]: AbstractControl } {
    return this.customerInformationForm.controls;
  }
  ngOnInit(): void {
    this.id = sessionStorage.getItem('storeOpenedId') || '';
    this.openedChannel = sessionStorage.getItem('parent') || '';
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
        });
    } else if (this.searchProfileDetails == '') {
      this.profileId = sessionStorage.getItem('storeOpenedId') || '';
      this.platform = sessionStorage.getItem('parent') || '';
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
          this.customerProfileInformation.forEach((x:any)=>{
            if(this.index==x){
              this.deattachInformation=x
            }
          })
        });
    }
  }
  // searchCustomerProfileDetails() {
  //   this.customerProfileInformation = [];
  //   if(this.searchProfileDetails != ""){
  //     this.profileId = '';
  //     this.platform = '';
  //   } else if(this.searchProfileDetails == ""){
  //     this.profileId = sessionStorage.getItem('storeOpenedId') || '';
  //     this.platform = sessionStorage.getItem('parent') || '';
  //   }
  //     var obj = {
  //       profileId: this.profileId,
  //       search: this.searchProfileDetails,
  //       platform: this.platform,
  //       companyId: 0,
  //     };
  //   this.commonService.SearchCustomerProfileDetails(obj).subscribe((res: any) => {
  //     this.customerProfileInformation = res;
  //   });
  // }
  type: string = '';
  deattachProfileInformation(name:string,contractAccount:number,mobileNumber:number,){
    // var obj = {
    //   externalId: this.id,
    //   platform: this.openedChannel,
    //   companyId: 0,
    //   contractAccount: this.deattachInformation.,
    //   customerSocialProfileName: this.customerSocialProfileName,
    //   customerEmail: this.customerEmail,
    //   phoneNumber: this.phoneNumber,
    // };
    let obj ={
      externalId: this.id,
      platform:this.openedChannel ,
      companyId: 0,
      contractAccount:contractAccount,
      customerSocialProfileName: name,
      customerEmail:'',
      phoneNumber: mobileNumber
    }
    this.commonService.DeattachProfileInformation(obj).subscribe((res:any)=>{
      this.reloadComponent('deattachprofile')
      setTimeout(() => {
        this.closeProfileComponent('customer-profile');
      }, 1000);
      this.getCustomerProfileDetails()
    })
  }
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
    if (sessionStorage.getItem('child') == child) {
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
    if(type=='deattachprofile'){
      this.AlterMsg='Profile Deattach Successfully !';
      this.toastermessage=true
      setTimeout(()=>{
        this.toastermessage=false
      },4000)
    }
  }
}
