import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  }

  ngOnInit(): void {
    this.id = localStorage.getItem('storeOpenedId');
    this.getProfileDetails();
  }

  getProfileDetails() {
    
    
    this.commonService.GetProfileDetails(this.id).subscribe((res: any) => {
      
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

      if(res.customerDetails.length > 0){
        this.userDetailForm.patchValue({
          email: res.customerDetails[0].email,
          phoneNumber: res.customerDetails[0].phoneNumber,
          landlinenumber: res.customerDetails[0].landlinenumber,
          address: res.customerDetails[0].address,
          organization: res.customerDetails[0].organization,
          role: res.customerDetails[0].role,
          city: res.customerDetails[0].city,
          country: res.customerDetails[0].country,
          fatherName: res.customerDetails[0].fatherName,
          education: res.customerDetails[0].education,
          bloodGroup: res.customerDetails[0].bloodGroup,
        });
        
        
      }
      this.profileDetails.customerSecondaryProfiles.forEach(
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
      customerDetails: [
        {
          email: this.userDetailForm.value.email,
          phoneNumber: this.userDetailForm.value.phoneNumber,
          landlinenumber: this.userDetailForm.value.landlinenumber,
          address: this.userDetailForm.value.address,
          fatherName: this.userDetailForm.value.fatherName,
          education: this.userDetailForm.value.education,
          bloodGroup: this.userDetailForm.value.bloodGroup,
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
}
