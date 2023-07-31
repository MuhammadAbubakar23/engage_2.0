import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToggleService } from 'src/app/services/ToggleService/Toggle.service';
import { UserDetailDto } from 'src/app/shared/Models/UserDetailDto';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

@Component({
  selector: 'app-responder-profile',
  templateUrl: './responder-profile.component.html',
  styleUrls: ['./responder-profile.component.scss'],
})
export class ResponderProfileComponent implements OnInit {
  id: any;
  profileDetails: any;
  fbUniqueId: any;
  instaUniqueId: any;
  twitterUniqueId: any;
  youtubeUniqueId: any;
  emailUniqueId: any;
  smsUniqueId: any;
  whatsappUniqueId: any;
  linkedinUniqueId: any;
  webchatUniqueId: any;

  spinner1running=false
  spinner2running=false

  userDetailDto = new UserDetailDto();

  userDetailForm!: FormGroup;
  mergeSocialProfilesForm !: FormGroup

  constructor(
    private commonService: CommonDataService,
    public fb: FormBuilder,
    private spinnerService : NgxSpinnerService,
    private toggleService : ToggleService
  ) {
    this.userDetailForm = new FormGroup({
      fromFullName: new FormControl(''),
      customerId: new FormControl(''),
      fromName: new FormControl(''),
      fromProfilePic: new FormControl(''),

      email: new FormControl(''),
      organization: new FormControl(''),
      role: new FormControl(''),
      phoneNumber: new FormControl(''),
      landlinenumber: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      fatherName: new FormControl(''),
      education: new FormControl(''),
      bloodGroup: new FormControl(''),

      fbUniqueId: new FormControl(''),
      instaUniqueId: new FormControl(''),
      twitterUniqueId: new FormControl(''),
      youtubeUniqueId: new FormControl(''),
      emailUniqueId: new FormControl(''),
      smsUniqueId: new FormControl(''),
      whatsappUniqueId: new FormControl(''),
      linkedinUniqueId: new FormControl(''),
      webchatUniqueId: new FormControl(''),
    });

    this.mergeSocialProfilesForm = new FormGroup({
      whatsappProfileId: new FormControl(''),
      emailProfileId: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('storeOpenedId');
    this.getProfileDetails();
  }

  getProfileDetails() {
    
    
    this.commonService.GetProfileDetails(this.id).subscribe((res: any) => {
      debugger
      this.profileDetails = res;
      
      
      this.spinnerService.show();
      this.spinner2running = true;
      this.userDetailForm.patchValue({
        customerId: res.fromId,
        fromName: res.fromName,
        fromProfilePic: res.fromProfilePic,
        isActive: res.isActive,
        
      });
      this.spinnerService.hide();
      this.spinner2running = false;

      if(res.customerDetail){
        this.userDetailForm.patchValue({
          email: res.customerDetail.email,
          phoneNumber: res.customerDetail.phoneNumber,
          landlinenumber: res.customerDetail.landlinenumber,
          address: res.customerDetail.address,
          organization: res.customerDetail.organization,
          role: res.customerDetail.role,
          city: res.customerDetail.city,
          country: res.customerDetail.country,
          fatherName: res.customerDetail.fatherName,
          education: res.customerDetail.education,
          bloodGroup: res.customerDetail.bloodGroup,
        });
      }

      this.profileDetails?.customerSecondaryProfiles?.forEach(
        (secondaryProfile: any) => {
          
          if (secondaryProfile.platform == 'Facebook') {
            this.fbUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              fbUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'Instagram') {
            this.instaUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              instaUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'Twitter') {
            this.twitterUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              twitterUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'Youtube') {
            this.youtubeUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              youtubeUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'LinkedIn') {
            this.linkedinUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              linkedinUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'Email') {
            this.emailUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              emailUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'WhatsApp') {
            this.whatsappUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              whatsappUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'SMS') {
            this.smsUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              smsUniqueId: secondaryProfile.customerUniqueId,
            });
          }
          if (secondaryProfile.platform == 'WebChat') {
            this.webchatUniqueId = secondaryProfile.customerUniqueId;
            this.userDetailForm.patchValue({
              webchatUniqueId: secondaryProfile.customerUniqueId,
            });
          }
        }
      );
    });
    
  }
  updateUserInformation() {
    
    var secondaryProfiles = [];
    if (this.userDetailForm.value.fbUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.fbUniqueId,
        platform: 'Facebook',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.instaUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.instaUniqueId,
        platform: 'Instagram',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.twitterUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.twitterUniqueId,
        platform: 'Twitter',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.linkedinUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.linkedinUniqueId,
        platform: 'LinkedIn',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.youtubeUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.youtubeUniqueId,
        platform: 'Youtube',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.whatsappUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.whatsappUniqueId,
        platform: 'WhatsApp',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.smsUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.smsUniqueId,
        platform: 'SMS',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.emailUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.emailUniqueId,
        platform: 'Email',
      };
      secondaryProfiles.push(obj);
    }
    if (this.userDetailForm.value.webchatUniqueId != '') {
      var obj = {
        customerUniqueId: this.userDetailForm.value.webchatUniqueId,
        platform: 'WebChat',
      };
      secondaryProfiles.push(obj);
    }

    this.userDetailDto = {
      customerId: this.userDetailForm.value.customerId,
      fromName: this.userDetailForm.value.fromName,
      fromProfilePic: this.userDetailForm.value.fromProfilePic,
      fromFullName: this.userDetailForm.value.fromFullName,
      customerDetail: [
        {
          email: this.userDetailForm.value.email,
          phoneNumber: this.userDetailForm.value.phoneNumber,
          landlinenumber: this.userDetailForm.value.landlinenumber,
          address: this.userDetailForm.value.address,
          fatherName: this.userDetailForm.value.fatherName,
          education: this.userDetailForm.value.education,
          bloodGroup: this.userDetailForm.value.bloodGroup,
          city: this.userDetailForm.value.city,
          country: this.userDetailForm.value.country,
          organization: this.userDetailForm.value.organization,
          role: this.userDetailForm.value.role,
        },
      ],
      secondaryProfiles: secondaryProfiles,
    };

    this.commonService.UpdateProfileDetails(this.userDetailDto).subscribe(
      (res: any) => {
        
        this.reloadComponent('profileUpdated')
        setTimeout(() => {
          this.closeProfileComponent('profile')
        }, 1000);
      },
      (error: any) => {
        alert(error.error.message);
      }
    );
  }

  AlterMsg:any;
  toastermessage:any;
  reloadComponent(type: any) {
    if (type == 'profileUpdated') {
      this.AlterMsg = 'Profile updated Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'ticketCreated') {
      this.AlterMsg = 'Ticket created Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'comment') {
      this.AlterMsg = 'Comment Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'fbmessage') {
      this.AlterMsg = 'Message Send Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'ApplyTag') {
      this.AlterMsg = 'Tag Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'RemoveTag') {
      this.AlterMsg = 'Tag Removed Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Sentiment') {
      this.AlterMsg = 'Sentiment Apply Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'Like') {
      this.AlterMsg = 'Liked Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
    }
    if (type == 'disLike') {
      this.AlterMsg = 'Dislike Successfully!';
      this.toastermessage = true;
      setTimeout(() => {
        this.toastermessage = false;
      }, 4000);
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

  Cities = [
    { id: 1, name: 'Abbottabad' },
    { id: 2, name: 'Chakwal' },
    { id: 3, name: 'DG Khan' },
    { id: 4, name: 'Faisalabad' },
    { id: 5, name: 'Gujranwala' },
    { id: 6, name: 'Gujrat' },
    { id: 7, name: 'Hyderabad' },
    { id: 8, name: 'Islamabad' },
    { id: 9, name: 'Karachi' },
    { id: 10, name: 'Lahore' },
    { id: 11, name: 'Mardan' },
    { id: 12, name: 'Mirpur AJK' },
    { id: 13, name: 'Multan' },
    { id: 14, name: 'Peshawer' },
    { id: 15, name: 'Quetta' },
    { id: 16, name: 'Rahim Yar Khan' },
    { id: 17, name: 'Rawalpindi' },
    { id: 18, name: 'Sahiwal' },
    { id: 19, name: 'Sargodha' },
    { id: 20, name: 'Sialkot' },

  ];
  Countries = [
    { id: 1, name: 'Pakistan' },

  ];

  SecondWhatsApp = false;
  SecondEmail = false;
  SocialDropdown = false;
  secondWhatsApp(){
    
    this.SecondWhatsApp = !this.SecondWhatsApp;
  }

  socialDropdown(){
    this.SocialDropdown = !this.SocialDropdown;
  }
  secondEmail(){
    this.SecondEmail = !this.SecondEmail;
  }

  

  mergeSocialProfiles(){
    if(this.mergeSocialProfilesForm.value.whatsappProfileId != ''){
      this.userDetailForm.value.whatsappUniqueId = this.mergeSocialProfilesForm.value.whatsappProfileId;
      this.whatsappUniqueId = this.mergeSocialProfilesForm.value.whatsappProfileId;
    }
    if(this.mergeSocialProfilesForm.value.emailProfileId != ''){
      this.userDetailForm.value.emailUniqueId = this.mergeSocialProfilesForm.value.emailProfileId;
      this.emailUniqueId = this.mergeSocialProfilesForm.value.emailProfileId;
    }
    this.SocialDropdown = false
  }

}
