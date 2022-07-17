import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServicesService } from 'src/app/services/app-services.service';
import { Colors } from '../../models/colors';
@Component({
  selector: 'app-add-tab',
  templateUrl: './add-tab.component.html',
  styleUrls: ['./add-tab.component.scss']
})
export class AddTabComponent implements OnInit {

  @ViewChild('f') form : any

  constructor(
    private appService : AppServicesService
  ) { }
  public colors = Colors
  public sfsdf = []
  ngOnInit(): void {
  }

  public async addNewTab() :Promise<void>{
    if(this.form.valid){
      const title = this.form.value.title
      const description = this.form.value.description
      const color = this.form.value.color
      await this.appService.createNewTab(title, description,color).then(data => {
        if(data?._id){
          this.appService.updateTabs(data,'add')
        }
      })
    }else{
    }
  }
}
