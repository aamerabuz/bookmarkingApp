import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AppServicesService } from '../../services/app-services.service';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public plCategoryTitle? : string;
  public plTabTitle? : string;
  public isLoginStatus :boolean = false;

  constructor(
    private appServices : AppServicesService,
    private router : Router,
    private cookieService: CookieService
    ) { }
  public faHouse = faHouse
  public faSignOut = faSignOut
  async ngOnInit(): Promise<void> {
      if(this.cookieService.get('authToken')){
        this.appServices.getSelectedCategory().subscribe(data => {
          if(data){
            this.plCategoryTitle = data.title;
          }
        })
        this.appServices.getSelectedTab().subscribe(data => {
          if(data){
            this.plTabTitle = data.title;
            this.plCategoryTitle = '';

          }
        })
        this.appServices.getIsLoginStatus().subscribe(data => {
          this.isLoginStatus = data;
        })

        await this.appServices.getRoot()
      }else{
        this.router.navigate(['/login'])
      }
  }

  public logoutUser() {
    this.router.navigate(['/login'])
    this.appServices.setIsLoginStatus(false)
    this.appServices.setSelectedCategory(null)
    this.appServices.setSelectedTab(null)
  }

}
