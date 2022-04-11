import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Pages
import { HomeComponent } from './pages/home/home.component';
import { LogginComponent } from './pages/loggin/loggin.component';
import { RegisterComponent } from './pages/register/register.component';
// Generic Page
import { ErrorComponent } from './pages/error/error.component';
// Guards
import { CheckGuard } from "src/app/guards/check.guard";
import { DetailComponent } from './pages/detail/detail.component';


const routes: Routes = [
  {
    path: "", 
    component: HomeComponent,
    canActivate: [ CheckGuard ]
  },
  {
    path: "signup", 
    component: RegisterComponent
  },
  {
    path: "loggin", 
    component: LogginComponent
  },
  {
    path: "product/:id",
    component: DetailComponent,
    canActivate: [ CheckGuard ]
  },
  {
    path: "**", 
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }