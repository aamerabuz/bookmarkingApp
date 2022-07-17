import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppServicesService } from './app-services.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private appService: AppServicesService,
    private router: Router,
    private cookieService: CookieService

  ) { }

  async loginService(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/login',
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }).subscribe((data: any) => {
          if (data.token) {
            this.appService.setMarks(data.marks)
            this.appService.setCategories(data.categories)
            this.appService.setTabs(data.tabs)
            this.appService.settUseId(data.userId)
            this.cookieService.set('authToken', data.token)
            this.cookieService.set('userId', data.userId)
            this.appService.setIsLoginStatus(true)
            this.router.navigate(['/'])
            resolve(true)
          } else {
            this.appService.setIsLoginStatus(false)
            resolve(false)
          }
        })
    })
  }

  async signUpService(email: string, password: string) : Promise<any> {
    // this.http.post('http://localhost:5000/api/login');
    return new Promise((resolve,reject) => {
      this.http.post('http://localhost:5000/api/signup',
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }).subscribe((data : any) => {
          if (data.token) {
            this.appService.setMarks(data.marks)
            this.appService.setCategories(data.categories)
            this.appService.setTabs(data.tabs)
            this.appService.settUseId(data.userId)
            this.cookieService.set('authToken', data.token)
            this.cookieService.set('userId', data.userId)
            this.appService.setIsLoginStatus(true)
            this.router.navigate(['/'])
            resolve(true)
          } else {
            this.appService.setIsLoginStatus(false)
            resolve(false)
          }
        })
    })
  }



}
