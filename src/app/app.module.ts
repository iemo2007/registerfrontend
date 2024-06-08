import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MobileNumberDirective } from './shared/directives/mobile-number.directive';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RegisterSuccessComponent } from './shared/components/register-success/register-success.component';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MobileNumberDirective,
    NotFoundComponent,
    RegisterSuccessComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
