import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})

export class CategorysComponent implements OnInit {
  public categories!: Category[];
  public faPlus = faPlus

  constructor(
    private router: Router,
    private appServices: AppServicesService
  ) {
  }


  ngOnInit(): void {
    this.appServices.getCategories().subscribe(data => {
      this.appServices.getSelectedTab().subscribe(dataa => {
        this.categories = data.filter(c => c.tabId === dataa?._id)
      })
    })
  }

  public onClickAddNewCategoryButton(): void {
    this.router.navigate(['/addNewCategory'])
  }
}
