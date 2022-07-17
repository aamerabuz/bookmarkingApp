import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BookMark } from '../models/bookmarking.interface';
import { Category } from '../models/category.interface';
import { Tab } from '../models/tabs.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
  private token: string = ''
  private userId: string = ''
  private tabs$: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);
  private categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private marks$: BehaviorSubject<BookMark[]> = new BehaviorSubject<BookMark[]>([]);
  private isLogin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private selectedTabSubject$: BehaviorSubject<any> = new BehaviorSubject(null)
  private selectedCategorySubject$: BehaviorSubject<any> = new BehaviorSubject(null)
  private selectedMarkForEdit$: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }




  public getTabs(): Observable<Tab[]> {
    return this.tabs$.asObservable();
  }
  public getCategories(): Observable<Category[]> {
    return this.categories$.asObservable();
  }
  public getMarks(): Observable<BookMark[]> {
    return this.marks$.asObservable();
  }

  public setToken(token: string): void {
    this.token = token;
  }
  public settUseId(userId: string): void {
    this.userId = userId;
  }

  public getToken(): string {
    return this.token;
  }
  public getUseId(): string {
    const userId = this.cookieService.get('userId')
    return userId;
  }

  public setTabs(tabs: any): void {
    this.tabs$.next(tabs);
  }
  public setCategories(categories: any): void {
    this.categories$.next(categories);
  }
  public setMarks(marks: any): void {
    this.marks$.next(marks)
  }
  public updateTabs(tab: any, actoin: string): void {
    switch (actoin) {
      case 'add': {
        let newTabs;
        this.getTabs().subscribe(data => {
          newTabs = [...data];
          newTabs.push(tab)
        })
        this.setTabs(newTabs)
        this.router.navigate(['/categorys'])
        this.setSelectedTab(tab)
      }
    }
  }
  public updateCategories(category: any, actoin: string): void {
    switch (actoin) {
      case 'add': {
        let newCategoris
        this.getCategories().subscribe(data => {
          newCategoris = [...data];
          newCategoris.push(category)
        })
        this.setCategories(newCategoris)
        this.router.navigate(['/bookMarks'])
        this.setSelectedCategory(category)
      }
    }
  }
  public updateMarks(mark: any, actoin: string): void {
    switch (actoin) {
      case 'add': {
        let newMarks;
        this.getMarks().subscribe(data => {

          newMarks = [...data];
          newMarks.push(mark)
        })
        this.setMarks(newMarks)
        this.router.navigate(['/bookMarks'])

      } break;
      case 'remove': {
        let newMarks;
        this.getMarks().subscribe(data => {
          newMarks = [...data];
          newMarks = newMarks.filter(m => m._id !== mark.id)
        })
        this.setMarks(newMarks)
        this.router.navigate(['/bookMarks'])
      } break;
      case 'update': {
        let newMarks;
        this.getMarks().subscribe(data => {
          newMarks = [...data];
          newMarks = newMarks.map(m => {
            if (m._id === mark._id) {
              m.title = mark.title
              m.description = mark.description
              m.url = mark.url
              m.color = mark.color
              return m;
            }
            return m;
          })
        })
        this.setMarks(newMarks)
        this.router.navigate(['/bookMarks'])
      }

    }
  }

  public getIsLoginStatus(): Observable<boolean> {
    return this.isLogin$.asObservable()
  }

  public setIsLoginStatus(status: boolean): void {
    this.isLogin$.next(status)
  }

  public setSelectedMarkForEdit(mark: BookMark): void {
    this.selectedMarkForEdit$.next(mark)
  }


  public getSelectedMarkForEdit(): Observable<any> {
    return this.selectedMarkForEdit$.asObservable()
  }

  public getSelectedTab(): Observable<Tab> {
    return this.selectedTabSubject$.asObservable();
  }
  public getSelectedCategory(): Observable<Category> {
    return this.selectedCategorySubject$.asObservable();
  }

  public setSelectedTab(tab: any): void {
    this.selectedTabSubject$.next(tab)
    // this.setSelectedCategory(null)
  }
  public setSelectedCategory(category: any): void {
    this.selectedCategorySubject$.next(category)
  }


  async getRoot(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:5000/api/').subscribe((data: any) => {
        if (!data.message) {
          this.setMarks(data.marks)
          this.setCategories(data.categories)
          this.setTabs(data.tabs)
          this.settUseId(data.userId)
          this.cookieService.set('userId', data.userId)
          this.setIsLoginStatus(true)
          this.router.navigate(['/'])
          resolve(true)
        } else {
          this.setIsLoginStatus(false)
          this.router.navigate(['/login'])
          resolve(false)
        }
      })
    })
  }


  async createNewTab(title: string, description: string, color: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/createNewTab',
        {
          title: title,
          description: description,
          color: color,
          userId: this.getUseId()
        }, {
        withCredentials: true
      }).subscribe(data => {
        resolve(data);
      })
    })
  }

  async createNewCategory(title: string, description: string, color: string, tabId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/createNewCategory',
        {
          title: title,
          description: description,
          color: color,
          tabId: tabId
        }, {
        withCredentials: true
      }).subscribe(data => {
        resolve(data);
      })
    })
  }

  async createNewMark(title: string, description: string, url: string, color: string, categoryId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/createNewMark',
        {
          title: title,
          description: description,
          url: url,
          color: color,
          categoryId: categoryId
        }, {
        withCredentials: true
      }).subscribe(data => {
        resolve(data);
      })
    })
  }

  async updateMark(_id: string, title: string, description: string, url: string, color: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/updateMark',
        {
          _id: _id,
          title: title,
          description: description,
          url: url,
          color: color,
        }, {
        withCredentials: true
      }).subscribe(data => {
        resolve(data);
      })
    })
  }

  async deleteMark(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/deleteMark',
        {
          _id: _id
        },
        { withCredentials: true }
      ).subscribe(data => {
        resolve(data);
      })
    })
  }
}
