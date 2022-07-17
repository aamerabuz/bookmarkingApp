import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service'
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form: any;

  public loginError: string = "LogIn Error, Please Try Again It's Easy.."
  public showLoginError: boolean = false;
  constructor(
    private router: Router,
    private appService: AppServicesService,
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.cookieService.delete('authToken')
  }

  public async login() {
    if (this.form.valid) {
      const email = this.form.value.email
      const password = this.form.value.password
      await this.authService.loginService(email, password).then(data => {
        if (!data) {
          this.showLoginError = true
        }
      })
      // this.appService.setIsLoginStatus(true)
      // this.router.navigate(['/'])

    } else {
    }
  }

  public setShowLoginError(status: boolean): void {
    this.showLoginError = status
  }
  public navigateToSignUp() {
    this.router.navigate(['/signup'])
  }
}
