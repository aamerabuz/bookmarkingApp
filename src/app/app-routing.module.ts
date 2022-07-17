import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddMarkComponent } from './components/add-mark/add-mark.component';
import { AddTabComponent } from './components/add-tab/add-tab.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { CategorysComponent } from './components/categorys/categorys.component';
import { EditMarkComponent } from './components/edit-mark/edit-mark.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:'' , component : CategorysComponent},
  {path:'addNewCategory' , component : AddCategoryComponent},
  {path:'addNewTab' , component : AddTabComponent},
  {path:'addNewMark' , component : AddMarkComponent},
  {path:'editMark' , component : EditMarkComponent},
  {path:'bookMarks' , component : BookmarksComponent},
  {path:'categorys' , component : CategorysComponent},
  {path:'login' , component : LoginComponent},
  {path:'signup' , component : SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
