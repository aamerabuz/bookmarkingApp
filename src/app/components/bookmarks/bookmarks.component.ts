import { Component, OnInit } from '@angular/core';
import { BookMark } from '../../models/bookmarking.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {
  public bookMarks!: BookMark[];
  public faPlus = faPlus

  constructor(
    private router: Router,
    private appServices: AppServicesService
  ) { }



  ngOnInit(): void {
    this.appServices.getMarks().subscribe(data => {
      this.appServices.getSelectedCategory().subscribe(dataa => {
        this.bookMarks = data.filter(m => m.categoryId === dataa?._id)
      })
    })
  }

  public onClickAddNewMarkButton(): void {
    this.router.navigate(['/addNewMark'])
  }

}
