import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MainComponent } from './dashboard/pages/main/main.component';
import { Page404Component } from './page404/page404.component';
import { SharedModule } from './shared/shared.module';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { MonitoreoModule } from './monitoreo/monitoreo.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MonitoreoComponent,
    MainComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DashboardModule,
    MonitoreoModule,
    AuthModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
