import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleListComponent } from './components/article-list/article-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from "primeng/calendar";
import {CardModule} from "primeng/card";
import { InputTextModule } from 'primeng/inputtext';
import {AutoCompleteModule} from "primeng/autocomplete";
import {CheckboxModule} from "primeng/checkbox";
import {CachingInterceptorInterceptor} from "./utilis/caching-interceptor.interceptor";
import {SidebarModule} from "primeng/sidebar";


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomeComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule, CalendarModule,
    CardModule,
    InputTextModule,
    AutoCompleteModule,
    CheckboxModule,
    SidebarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
