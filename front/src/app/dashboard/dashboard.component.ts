import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private sidebarService:SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.cargarMenu();
  }

}
