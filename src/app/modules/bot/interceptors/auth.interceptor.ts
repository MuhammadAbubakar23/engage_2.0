// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Observable, from } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';
// import { BotService } from '../services/bot.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private botService: BotService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const username = 'usman';
//     const password = 'usman';

//     return from(this.botService.login(username, password)).pipe(
//       mergeMap((token: any) => {
//         const jwtToken = token.access;
//         localStorage.setItem('jwtToken', jwtToken);

//         const modifiedRequest = request.clone({
//           setHeaders: {
//             Authorization: `Bearer ${jwtToken}`
//           }
//         });

//         return next.handle(modifiedRequest);
//       })
//     );
//   }
// }
