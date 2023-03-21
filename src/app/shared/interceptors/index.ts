import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppTokenInterceptor } from "./app-token.interceptor";
// import { authInterceptor } from "./auth.interceptor";
import { JsonWebTokenInterceptor } from "./json-web-token.interceptor";
import { ResponseErrorInterceptor } from "./response-error.interceptor";
import { SuperTeamInterceptor } from "./super-team.interceptor";

export const customInterceptorProvider = 
[ 
    { provide: HTTP_INTERCEPTORS, useClass: JsonWebTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SuperTeamInterceptor, multi: true },
]