import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { AppServicesService } from 'src/app/services/app-services.service';
import { BookMark } from '../../models/bookmarking.interface';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  constructor(
    private router : Router,
    private appService : AppServicesService
  ) { }

  @Input() bookmark!: BookMark;

  public faTrash = faTrash
  public faPen = faPen

  public deleteBookMark(): void {
    this.appService.deleteMark(this.bookmark._id).then(data => {
      if(data?.id){
        this.appService.updateMarks(data,'remove');
      }
    })
  }

  public editBookMark(): void {
    this.appService.setSelectedMarkForEdit(this.bookmark)

    this.router.navigate(['/editMark'])
  }

  ngOnInit(): void {
  }

}
