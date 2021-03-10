import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './main.component.css'
  ]
})
export class MainComponent implements OnInit {

  constructor(public sidebarService:SidebarService) { }

  ngOnInit(): void {
  }

}
