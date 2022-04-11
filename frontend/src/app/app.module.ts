import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
// Pages
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogginComponent } from './pages/loggin/loggin.component';
import { DetailComponent } from './pages/detail/detail.component';
// Generic Page
import { ErrorComponent } from './pages/error/error.component';
// Http Interceptor
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LogginComponent,
    DetailComponent,
    ErrorComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
