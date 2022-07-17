import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/category.interface';
import {Router} from '@angular/router'
import { AppServicesService } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category! : Category;

  constructor(
    private router : Router,
    private appServices : AppServicesService
  ) { }

  public  onClickCategory(): void{
     this.appServices.setSelectedCategory(this.category)
    this.router.navigate(['/bookMarks'])
  }
  ngOnInit(): void {
  }

}
