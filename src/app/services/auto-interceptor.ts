import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppServicesService } from "./app-services.service";
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private appServices: AppServicesService,
    private cookieService: CookieService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.appServices.getToken();
    const request = req.clone({
      headers: req.headers.set('authToken',this.cookieService.get('authToken'))
    });
    return next.handle(request);
  }
}
