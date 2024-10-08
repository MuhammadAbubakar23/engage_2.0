import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';
import {
  FacebookService,
  InitParams,
  LoginOptions,
  LoginResponse,
} from 'ngx-facebook';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class HomeComponent implements OnInit {
  profilePicFile!: File;
  showAdditionalFields = false;
  users!: any[];
  pagePicFile: any;
  instaProfile: any;
  isProfileEnabled: boolean = false;
  attachFacebookPageForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonDataService,
    private fb: FacebookService
  ) {
    this.attachFacebookPageForm = this.formBuilder.group({
      appId: [''],
      appSecret: [''],
      pageUrl: [''],
      pageProfilePic: [''],
    });
  }
  ngOnInit(): void {
    this.GetChannels();
  }
  attachFacebookPage(): void {
    if (this.attachFacebookPageForm.valid) {
      const formData = new FormData();
      if (this.profilePicFile) {
        formData.append('profileFile', this.profilePicFile, 'profile');
      }
      if (this.pagePicFile) {
        formData.append('pageFile', this.pagePicFile, 'page');
      }
      if (this.instaProfile) {
        formData.append('instaFile', this.instaProfile, 'insta');
      }
      const initParams: InitParams = {
        appId: this.attachFacebookPageForm.value.appId,
        xfbml: true,
        version: 'v17.0',
      };
      this.fb.init(initParams);
      const options: LoginOptions = {
        scope:
          'public_profile,email,read_insights,ads_management,pages_manage_engagement,pages_manage_posts,pages_messaging,pages_read_user_content,pages_manage_metadata,pages_manage_ads,pages_read_engagement',
        return_scopes: true,
        enable_profile_selector: true,
      };
      formData.append(
        'data',
        JSON.stringify(this.attachFacebookPageForm.value)
      );
      this.fb
        .login(options)
        .then((response: LoginResponse) => {
          if (response.authResponse.expiresIn > 0) {
            var obj = {
              clientId: this.attachFacebookPageForm.value.appId,
              clientSecret: this.attachFacebookPageForm.value.appSecret,
              // pageUrl: this.attachFacebookPageForm.value.pageUrl,
              // pageProfilePic : this.attachFacebookPageForm.value.pageProfilePic,
              authResponse: response.authResponse,
            };
            this.commonService.AttachFacebookPage(obj).subscribe((res: any) => {
              this.attachFacebookPageForm.reset();
            });
          }
        })
        .catch((error: any) => console.error(error));
    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }

  attachInstagramPage(): void {
    if (this.attachFacebookPageForm.valid) {
      const formData = new FormData();
      if (this.profilePicFile) {
        formData.append('profileFile', this.profilePicFile, 'profile');
      }
      if (this.pagePicFile) {
        formData.append('pageFile', this.pagePicFile, 'page');
      }
      if (this.instaProfile) {
        formData.append('instaFile', this.instaProfile, 'insta');
      }
      const initParams: InitParams = {
        appId: this.attachFacebookPageForm.value.appId,
        xfbml: true,
        version: 'v17.0',
      };
      this.fb.init(initParams);
      const options: LoginOptions = {
        scope:
          'instagram_basic,instagram_manage_comments,instagram_manage_insights',
        return_scopes: true,
        enable_profile_selector: true,
      };
      formData.append(
        'data',
        JSON.stringify(this.attachFacebookPageForm.value)
      );
      this.fb
        .login(options)
        .then((response: LoginResponse) => {
          if (response.authResponse.expiresIn > 0) {
            var obj = {
              clientId: this.attachFacebookPageForm.value.appId,
              clientSecret: this.attachFacebookPageForm.value.appSecret,
              // pageUrl: this.attachFacebookPageForm.value.pageUrl,
              // pageProfilePic : this.attachFacebookPageForm.value.pageProfilePic,
              authResponse: response.authResponse,
            };
            this.commonService.AttachInstagramPage(obj).subscribe((res: any) => {
              this.attachFacebookPageForm.reset();
            });
          }
        })
        .catch((error: any) => console.error(error));
    } else {
      // Form is invalid, display error messages or take appropriate action
    }
  }

  onFileSelected(event: any, type: any) {
    if (type == 'profile') this.profilePicFile = event.target.files[0];
    if (type == 'page') this.pagePicFile = event.target.files[0];
    if (type == 'insta') this.instaProfile = event.target.files[0];
  }
  connectGoogle(): void {
    localStorage.setItem('socialtype', 'google');
    const clientId = environment.googleclientId;
    const redirectUri = 'https://localhost:4200/console/channels';
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code`;
    window.open(loginUrl, '_blank');
  }
  channels: any[] = [];
  GetChannels() {
    this.commonService.GetConsoleChannels().subscribe((res: any) => {
      console.log(res);
      this.channels = res;
    });
  }
}
