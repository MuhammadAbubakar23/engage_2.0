import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  constructor(private http: HttpClient) { }
  getFaceBookData(authorizationCode: any) {
    const clientId = environment.facebookclientId;
    const clientSecret = environment.facebookclientSecret;
    const redirectUri = 'https://localhost:4200/console/channels';
    //const tokenUrl = `https://graph.facebook.com/v12.0/oauth/access_token`;
    const apiUrl = 'please put your api url here';
    return this.http.post(apiUrl, { code: authorizationCode });
    // return this.http.post(tokenUrl, {
    //   code: authorizationCode,
    //   client_id: clientId,
    //   client_secret: clientSecret,
    //   grant_type: 'authorization_code',
    //   redirect_uri: redirectUri,
    // });
  }
  getInstagramData(authorizationCode: any) {
    const clientId = environment.instagramclientId;
    const clientSecret = environment.instagramclientSecret;
    const redirectUri = 'https://localhost:4200/console/channels';
    //const tokenUrl = `https://api.instagram.com/oauth/access_token`;
    const apiUrl = 'please put your api url here';
    return this.http.post(apiUrl, { code: authorizationCode });
  }
  getGoogleData(authorizationCode: any) {
    const clientId = environment.googleclientId;
    const clientSecret = environment.googleclientSecret;
    const redirectUri = 'https://localhost:4200/console/channels';
    //const tokenUrl = `https://oauth2.googleapis.com/token`;
    const apiUrl = 'please put your api url here';
    return this.http.post(apiUrl, { code: authorizationCode });
  }
  getLinkdinData(authorizationCode: any) {
    const clientId = environment.linkdinclientId;
    const clientSecret = environment.linkdinclientSecret;
    const redirectUri = 'https://localhost:4200/console/channels';
    //const tokenUrl = `https://www.linkedin.com/oauth/v2/accessToken?`;
    const apiUrl = 'please put your api url here';
    return this.http.post(apiUrl, { code: authorizationCode });
  }
  getUtubeData(authorizationCode: any) {
    const clientId = environment.googleclientId;
    const clientSecret = environment.googleclientSecret;
    const redirectUri = 'https://localhost:4200/console/channels';
    //const tokenUrl = `https://oauth2.googleapis.com/token`;
    const apiUrl = 'please put your api url here';
    return this.http.post(apiUrl, { code: authorizationCode });
  }
}
