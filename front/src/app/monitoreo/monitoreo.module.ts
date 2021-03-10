import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { MainComponent } from './pages/main/main.component';



@NgModule({
  declarations: [
  MainComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MonitoreoRoutingModule
  ]
})
export class MonitoreoModule { }
