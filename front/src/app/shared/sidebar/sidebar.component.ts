import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.css'
  ]
})
export class SidebarComponent {

  public usuario:Usuario;

  constructor(public sidebarService:SidebarService,
              private auth:AuthService) { 
    this.usuario = auth.usuario;
  }
}
