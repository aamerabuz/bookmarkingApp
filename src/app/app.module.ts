import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoComponent } from './components/logo/logo.component';
import { TabComponent } from './components/tab/tab.component';
import { CategorysComponent } from './components/categorys/categorys.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { CategoryComponent } from './components/category/category.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTabComponent } from './components/add-tab/add-tab.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddMarkComponent } from './components/add-mark/add-mark.component';
import { EditMarkComponent } from './components/edit-mark/edit-mark.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auto-interceptor';
import { CookieService } from 'ngx-cookie-service'

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DashboardComponent,
    LogoComponent,
    TabComponent,
    CategorysComponent,
    BookmarksComponent,
    BookmarkComponent,
    CategoryComponent,
    AddTabComponent,
    AddCategoryComponent,
    AddMarkComponent,
    EditMarkComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
