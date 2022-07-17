import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServicesService } from 'src/app/services/app-services.service';
import { Colors } from '../../models/colors';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public colors = Colors

  @ViewChild('f') form: any;

  constructor(
    private appService: AppServicesService
  ) { }

  ngOnInit(): void {
  }

  public async addCategorySubmit(): Promise<void> {
    if (this.form.valid) {
      const title = this.form.value.title
      const description = this.form.value.description
      const color = this.form.value.color
      let tabId = ''
      this.appService.getSelectedTab().subscribe(async data => {
        tabId = data?._id
      })
      await this.appService.createNewCategory(title, description,color, tabId).then(data => {
        if (data?._id) {
          this.appService.updateCategories(data, 'add')
        }
      })
    } else {
    }
  }

}
