import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocialLoginService } from '../../services/sociallogin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CommonDataService } from 'src/app/shared/services/common/common-data.service';

declare const FB: any;

@Component({
  selector: 'app-support-channels',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './support-channels.component.html',
  styleUrls: ['./support-channels.component.scss']
})
export class SupportChannelsComponent implements OnInit {
  messageForm!: FormGroup;
  profilePicFile!: File;
  showAdditionalFields = false;
  users!: any[];
  pagePicFile: any;
  instaProfile: any;

  attachFacebookPageForm !: FormGroup;
  openModal(): void {
    const exampleModal = document.getElementById('exampleModal');
    if (exampleModal) {
      exampleModal.addEventListener('show.bs.modal', (event: Event) => {
        // Code to update the modal content
      });
      // Initialize the modal using Bootstrap's JavaScript
      const myModal = new bootstrap.Modal(exampleModal);
      myModal.show();
    }
  };
  openBox(): void {
    const exampleModal = document.getElementById('exampleModals');
    if (exampleModal) {
      // Initialize the modal using Bootstrap's JavaScript
      const myModal = new bootstrap.Modal(exampleModal);
      myModal.show();
    }
  }
  popUp(): void {
    const exampleModal = document.getElementById('exampleModalls');
    if (exampleModal) {
      // Initialize the modal using Bootstrap's JavaScript
      const myModal = new bootstrap.Modal(exampleModal);
      myModal.show();
    }
  }
  
  onFileSelected(event: any, type: any) {
    if (type == "profile")
      this.profilePicFile = event.target.files[0];
    if (type == "page")
      this.pagePicFile = event.target.files[0];
    if (type == "insta")
      this.instaProfile = event.target.files[0];
  }

  buildForm() {
    this.messageForm = this.formBuilder.group({
      name: [''],
      userName: [''],
      userProfilePic: [''],
      appId:[''],
      appSecret:[''],
      clientId: [''],
      clientSecret: [''],
      apiKey: [''],
      apiSecret: [''],
      accessToken: [''],
      accessTokenSecret: [''],
      profileId: [0],
      pageId: [''],
      pageName: [''],
      pageUrl: [''],
      bearerToken:[''],
      externalId: [''],
      pageProfilePic: [''],
      instaPageName: [''],
      instagramBussinessAccountId: [''],
      instagramProfilePic: [''],      
      isPage: [false],
      authCode:['']
    });
  }
  toggleAdditionalFields(event: Event): void {
    const checked = (event.target as HTMLInputElement)?.checked;
    this.showAdditionalFields = checked;
    if (!checked) {
      // Reset additional fields values when unchecked
      this.messageForm.get('profilePage.profileId')?.setValue('');
      this.messageForm.get('profilePage.pageId')?.setValue('');
      this.messageForm.get('profilePage.accessToken')?.setValue('');
      this.messageForm.get('profilePage.pageName')?.setValue('');
      this.messageForm.get('profilePage.pageUrl')?.setValue('');
      this.messageForm.get('profilePage.profilePic')?.setValue('');
      this.messageForm.get('profilePage.instagramBussinessAccountId')?.setValue('');
      this.messageForm.get('profilePage.instaPageName')?.setValue('');
      this.messageForm.get('profilePage.instagramProfilePic')?.setValue('');
    }
  }
  sendMessage(): void {
    debugger
    if (this.messageForm.valid) {
      const formData = new FormData();
  
      if (this.profilePicFile) {
        formData.append("profileFile", this.profilePicFile, "profile");
      }
  
      if (this.pagePicFile) {
        formData.append("pageFile", this.pagePicFile, "page");
      }
  
      if (this.instaProfile) {
        formData.append("instaFile", this.instaProfile, "insta");
      }

  
      
      
    //   const clientId = this.messageForm.value.clientId;
    //   const scope = "email,read_insights,ads_management,instagram_basic,pages_manage_engagement,pages_manage_posts,pages_messaging,pages_read_user_content,pages_manage_metadata,pages_manage_ads,instagram_manage_comments,instagram_manage_insights,pages_read_engagement"
    //   const redirectUri = 'https://localhost:4200/console/channels';
    //   const loginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    //   window.open(loginUrl);
  
    // const authorizationCode = this._Activatedroute.snapshot.queryParams['code'];
    // const socialtype = localStorage.getItem('socialtype')
    // console.log("authorizationCodebefore", authorizationCode, socialtype)
    // window.close();
    
this.messageForm.patchValue({
      authCode : this.authCode 
    })
    formData.append("data", JSON.stringify(this.messageForm.value));
      // this.commonService.AddProfile(formData).subscribe(
      //   (response: any) => {
      //     debugger
      //     console.log('AddProfile API response:', response);
      //     // Handle the response as needed
      //   },
      //   (error: any) => {
      //     console.error('AddProfile API error:', error);
      //     // Handle the error as needed
      //   }
      // );
  
      // this.messageForm.reset();
  
      // Close the modal if desired
      // Code to close the modal
    } else {
      console.log('Form is invalid');
      // Form is invalid, display error messages or take appropriate action
    }
  }
  isProfileEnabled: boolean = false;
  private twitterApiUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';
  constructor(
    private _request: RequestService
    , private _Activatedroute: ActivatedRoute
    , private route: Router
    , private http: HttpClient
    , private socialService: SocialLoginService
    , private formBuilder: FormBuilder
    , private commonService: CommonDataService
  ) {
    
  }

  loginWithFacebook() {
    debugger
    FB.getLoginStatus((response:any) => {
      if (response.status === 'connected') {
        // User is already logged in and authorized
        const accessToken = response.authResponse.accessToken;
        console.log('Access Token:', accessToken);
      } else {
        // User is not logged in or not authorized
        FB.login((loginResponse:any) => {
          if (loginResponse.authResponse) {
            const authCode = loginResponse.authResponse.code;
            console.log('Authorization Code:', authCode);
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'email', return_scopes: true });
      }
    });
  }

  getProfile() {
    this.commonService.GetAllProfile().subscribe(
      (response) => {
        console.log('GetAllProfile API response:', response);
        this.users = response as any[]; // Assign the response to the users variable
      },
      (error) => {
        console.error('GetAllProfile API error:', error);
        // Handle the error as needed
        if (error.status === 500) {
          // Server error handling
          // Display an error message to the user or perform any other actions
        } else {
          // Other error handling
        }
      }
    );
  }
  authCode:any;
  ngOnInit(): void {

    FB.init({
      appId: '439165040679685',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v12.0' // Replace with the desired API version
    });

    const authorizationCode = this._Activatedroute.snapshot.queryParams['code'];
    this.authCode = authorizationCode;
    console.log("auth code==>", this.authCode)
    const socialtype = localStorage.getItem('socialtype')
    console.log("authorizationCodebefore", authorizationCode, socialtype)

    if (authorizationCode && socialtype == 'facebook') {
      this.socialService.getFaceBookData(authorizationCode).subscribe((response: any) => {
        console.log("Profile===>", response);
      }, (error: any) => {
        console.log("Error==>", error)
      })
    }
    if (authorizationCode && socialtype == 'instagram') {
      this.socialService.getInstagramData(authorizationCode).subscribe((response: any) => {
        console.log("Profile===>", response);
      }, (error: any) => {
        console.log("Error==>", error)
      })
    }
    if (authorizationCode && socialtype == 'google') {
      this.socialService.getGoogleData(authorizationCode).subscribe((response: any) => {
        console.log("Profile===>", response);
      }, (error: any) => {
        console.log("Error==>", error)
      })
    }
    if (authorizationCode && socialtype == 'linkdin') {
      this.socialService.getLinkdinData(authorizationCode).subscribe((response: any) => {
        console.log("Profile===>", response);
      }, (error: any) => {
        console.log("Error==>", error)
      })
    }
    if (authorizationCode && socialtype == 'utube') {
      this.socialService.getUtubeData(authorizationCode).subscribe((response: any) => {
        console.log("Profile===>", response);
      }, (error: any) => {
        console.log("Error==>", error)
      })
    }
    this.buildForm();
    this.getProfile();
  }

  onVariableChange() {
    debugger
    // Handle the change event if needed
    console.log('Variable changed:', this.authCode);
  }

  connectFacebook(): void {
    localStorage.setItem('socialtype', 'facebook');
    const clientId = environment.facebookclientId;
    const scope = "email,read_insights,ads_management,instagram_basic,pages_manage_engagement,pages_manage_posts,pages_messaging,pages_read_user_content,pages_manage_metadata,pages_manage_ads,instagram_manage_comments,instagram_manage_insights,pages_read_engagement"
    const redirectUri = 'https://localhost:4200/console/channels';
    const loginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    window.open(loginUrl, '_blank');
  }

  connectGoogle(): void {
    localStorage.setItem('socialtype', 'google');
    const clientId = environment.googleclientId;
    const redirectUri = 'https://localhost:4200/console/channels';
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code`;
    window.open(loginUrl, '_blank');
  }
  connectUtube() {
    localStorage.setItem('socialtype', 'utube');
    const clientId = environment.googleclientId;
    const redirectUri = 'https://localhost:4200/console/channels';
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&&scope=https://www.googleapis.com/auth/youtube&response_type=code`;
    window.open(loginUrl, '_blank');
  }

  connectInstagram() {
    localStorage.setItem('socialtype', 'instagram');
    const clientId = environment.instagramclientId;
    const redirectUri = 'https://localhost:4200/console/channels';
    const loginUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media,basic+public_content&response_type=code`;
    window.open(loginUrl, '_blank');
  }

  connectLinkdIn() {
    localStorage.setItem('socialtype', 'linkdin');
    const clientId = environment.linkdinclientId;
    const redirectUri = 'https://localhost:4200/console/channels';
    const scope = 'r_ads_reporting,r_liteprofile,r_organization_social,rw_organization_admin,w_member_social,r_ads,r_emailaddress,w_organization_social,rw_ads,r_basicprofile,r_organization_admin,r_1st_connections_size'; // Add any additional scopes as needed
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    window.location.href = authUrl;
  }
  connectTwitter() {
    localStorage.setItem('socialtype', 'twitter');
    const clientId = environment.twitterclientId;
    const redirectUri = 'http://localhost:4200/console/channels';
    const scope = 'read';
    const authUrl = `https://api.twitter.com/oauth2/authenticate?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  }

}

