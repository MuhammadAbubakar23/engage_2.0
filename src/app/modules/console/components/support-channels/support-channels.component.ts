import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/app/shared/services/request/request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocialLoginService } from '../../services/sociallogin.service';
@Component({
  selector: 'app-support-channels',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './support-channels.component.html',
  styleUrls: ['./support-channels.component.scss']
})
export class SupportChannelsComponent implements OnInit {

  isProfileEnabled: boolean = false;
  private twitterApiUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';
  constructor(
    private _request: RequestService
    , private _Activatedroute: ActivatedRoute
    , private route: Router
    , private http: HttpClient
    , private socialService: SocialLoginService
  ){

  }

  ngOnInit(): void {
    const authorizationCode = this._Activatedroute.snapshot.queryParams['code'];
    const socialtype = localStorage.getItem('socialtype')
    console.log("authorizationCodebefore", authorizationCode, socialtype)

     if (authorizationCode && socialtype == 'facebook') {
       this.socialService.getFaceBookData(authorizationCode).subscribe((response: any) => {
         console.log("Profile===>", response);
       }, (error: any) => {
         console.log("Error==>", error)
       })
     }

     
    // if (authorizationCode && socialtype == 'instagram') {
    //   this.socialService.getInstagramData(authorizationCode).subscribe((response: any) => {
    //     console.log("Profile===>", response);
    //   }, (error: any) => {
    //     console.log("Error==>", error)
    //   })
    // }
    //  if (authorizationCode && socialtype == 'google') {
    //   this.socialService.getGoogleData(authorizationCode).subscribe((response: any) => {
    //     console.log("Profile===>", response);
    //   }, (error: any) => {
    //     console.log("Error==>", error)
    //   })
    // }
    //  if (authorizationCode && socialtype == 'linkdin') {
    //    this.socialService.getLinkdinData(authorizationCode).subscribe((response: any) => {
    //      console.log("Profile===>", response);
    //    }, (error: any) => {
    //      console.log("Error==>", error)
    //    })
    //  }
     //  if (authorizationCode && socialtype == 'utube') {
    //    this.socialService.getUtubeData(authorizationCode).subscribe((response: any) => {
    //      console.log("Profile===>", response);
    //    }, (error: any) => {
    //      console.log("Error==>", error)
    //    })
    //  }
  }

  connectFacebook(): void {
    localStorage.setItem('socialtype', 'facebook');
    const clientId = environment.facebookclientId;
    const scope="email,read_insights,ads_management,instagram_basic,pages_manage_engagement,pages_manage_posts,pages_messaging,pages_read_user_content,pages_manage_metadata,pages_manage_ads,instagram_manage_comments,instagram_manage_insights,pages_read_engagement"
    //const scope="email"
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
    const loginUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
    window.open(loginUrl, '_blank');
  }

  connectLinkdIn() {
    localStorage.setItem('socialtype', 'linkdin');
    const clientId = environment.linkdinclientId;
    const redirectUri = 'https://localhost:4200/console/channels';
    const scope = 'r_liteprofile r_emailaddress'; // Add any additional scopes as needed
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

