import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './auth.interceptor';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
