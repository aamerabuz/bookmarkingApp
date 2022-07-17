import { Component, OnInit, ViewChild } from '@angular/core';
import { BookMark } from '../../models/bookmarking.interface';
import { AppServicesService } from '../../services/app-services.service';
import { Colors } from '../../models/colors';

@Component({
  selector: 'app-edit-mark',
  templateUrl: './edit-mark.component.html',
  styleUrls: ['./edit-mark.component.scss']
})
export class EditMarkComponent implements OnInit {

  @ViewChild('f') form : any;
  public mark : BookMark = {
    _id: "",
    title:"",
    description:"",
    color:"",
    url:"",
    categoryId:""
  }
  constructor(
    private appService : AppServicesService
  ) { }
  public colors = Colors

  ngOnInit(): void {
    this.appService.getSelectedMarkForEdit().subscribe(data => {
      this.mark = data;
    })
  }

  public async updateMarkSubmited(): Promise<void> {
    if(this.form.valid){
      const title = this.form.value.title
      const description = this.form.value.description
      const color = this.form.value.color
      const url = this.form.value.url
      const _id = this.form.value.id
      await this.appService.updateMark(_id ,title, description,url,color).then(data => {
        if (data?._id) {
          this.appService.updateMarks(data, 'update')
        }
      })

    }else{
      //TODO: display a error message for every form , when form is not valid...

    }
  }

}
