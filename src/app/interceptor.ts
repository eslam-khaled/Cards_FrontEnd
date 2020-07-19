import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpUserEvent,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject, pipe } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  catchError,
  map,
  merge,
  mergeMap,
  switchMap,
  finalize,
  filter,
  take
} from "rxjs/operators";
//import { AppAuthenticationService } from "./app-authentication.service";
//import { Http, Headers } from "@angular/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  refresh_token: string;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(
    private router: Router,
   
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let authToken: string = "";
    this.refresh_token = localStorage.getItem("refresh_token");
    if (localStorage.getItem("userToken") != null)
      authToken = localStorage.getItem("userToken");

    return next.handle(this.addTokenToRequest(req, authToken)).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return <any>this.handle401Error(req, next);
            case 400:
              return throwError(err);
          }
        } else {
          return throwError(err);
        }
      })
    );
  }
  private addTokenToRequest(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // Reset here so that the following requests wait until the token
    // comes back from the refreshToken call.
    if (!this.isRefreshingToken) {
    //   this.isRefreshingToken = true;
    //   this.tokenSubject.next(null);

    //   return this.appauth
    //     .appAuthentication("", "","", "refresh_token", this.refresh_token,"")
    //     .pipe(
    //       switchMap((data: any) => {
    //         if (data) {
    //           this.tokenSubject.next(data.access_token);
    //           localStorage.setItem("userToken", data.access_token);
    //           localStorage.setItem("refresh_token", data.refresh_token);
    //           return next.handle(
    //             this.addTokenToRequest(request, data.access_token)
    //           );
    //         }
    //         return <any>this.appauth.logout();
    //       }),
    //       catchError(err => {
    //         return <any>this.appauth.logout();
    //       }),
    //       finalize(() => {
    //         this.isRefreshingToken = false;
    //       })
    //     );
   }
  }
}
