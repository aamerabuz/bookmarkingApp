import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '../../models/tabs.interface';
import { Router } from '@angular/router';
import { AppServicesService } from '../../services/app-services.service';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {


  constructor(
    private router : Router,
    private appServices : AppServicesService
  ) { }

  @Input() tab!: Tab;


  ngOnInit(): void {
  }

  public onClickTab(){
    this.appServices.setSelectedTab(this.tab)
    this.router.navigate(['/categorys'])
  }

}
