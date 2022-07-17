import { formatCurrency } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') from : any;
  constructor(
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  public async signup() {
    if(this.from.valid){
      const email = this.from.value.email
      const password = this.from.value.password

      await this.authService.signUpService(email,password).then(data => {

      })
    }else{
    }
  }

  public navigateToLogIn() {
    this.router.navigate(['/login'])
  }

}
