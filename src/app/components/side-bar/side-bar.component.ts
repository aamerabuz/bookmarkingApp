import { Component, OnInit } from '@angular/core';
import { Tab } from '../../models/tabs.interface'
import { Colors } from '../../models/colors'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AppServicesService } from '../../services/app-services.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public tabs?: Tab[]

  // public tabs: Tab[] = [
  //   {
  //     _id: '0',
  //     title: "default",
  //     description: "sochal media",
  //     color: Colors.DeepPink
  //   },
  //   {
  //     _id: '1',
  //     title: "qweqweqwe",
  //     description: "soasasdchal media",
  //     color: Colors.Fuchsia
  //   },
  //   {
  //     _id: '2',
  //     title: "asdasdsadefault",
  //     description: "sochal msdfsdfsdfedia",
  //     color: Colors.Gold
  //   },
  //   {
  //     _id: '3',
  //     title: "zxczxczcx",
  //     description: "asdasdasd",
  //     color: Colors.Orange
  //   }
  // ];

  public faPlus = faPlus;
  public isLoginStatus :boolean = true;

  constructor(
    private router: Router,
    private appServices: AppServicesService
  ) { }

  ngOnInit(): void {

    this.appServices.getTabs().subscribe(data => {
      this.tabs = data;
      this.appServices.setSelectedTab(data[0])
    })

    this.appServices.getIsLoginStatus().subscribe(data => {
      this.isLoginStatus = data;
    })
  }

  public onClickAddNewTab(): void {
    this.router.navigate(['/addNewTab'])
  }

}
