import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServicesService } from 'src/app/services/app-services.service';
import { Colors } from '../../models/colors';

@Component({
  selector: 'app-add-mark',
  templateUrl: './add-mark.component.html',
  styleUrls: ['./add-mark.component.scss']
})
export class AddMarkComponent implements OnInit {

  @ViewChild('f') form : any;
  constructor(
    private appService : AppServicesService
  ) { }
  public colors = Colors

  ngOnInit(): void {
  }


  public async addMarkSubmit(): Promise<void> {
    if (this.form.valid) {
      const title = this.form.value.title
      const description = this.form.value.description
      const color = this.form.value.color
      const url = this.form.value.url
      let categoryId = ''
      this.appService.getSelectedCategory().subscribe(async data => {
        categoryId = data?._id
      })
      await this.appService.createNewMark(title, description,url,color, categoryId).then(data => {
        if (data?._id) {
          this.appService.updateMarks(data, 'add')
        }
      })
    } else {
    }
  }
}
