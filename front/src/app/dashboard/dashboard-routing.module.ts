import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

import { MainComponent } from './pages/main/main.component';
import { CambioContrasenaComponent } from './pages/cambio-contrasena/cambio-contrasena.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BandejaComponent } from './pages/bandeja/bandeja.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { TablaReporteComponent } from './pages/reporte/tabla-reporte/tabla-reporte.component';

const routes: Routes = [
  {
    path:'dashboard',
    canActivate:[AuthGuard],
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:MainComponent
      },
      {
        path:'perfil',
        component:PerfilComponent,
        data:{titulo:'Perfil'}
      },
      {
        path:'configuracion',
        component:CambioContrasenaComponent,
        data:{titulo:'Configuración'}
      },
      {
        path:'bandeja',
        component:BandejaComponent,
        data:{titulo:'Bandeja'}
      },
      {
        path:'nuevo',
        component:NuevoComponent,
        data:{titulo:'Nuevo'}
      },
      {
        path:'usuarios',
        component:UsuariosComponent,
        data:{titulo: 'Usuarios'}
      },
      {
        path:'nuevo-usuario',
        component:NuevoUsuarioComponent,
        data:{titulo:'Agregar usuario'}
      },
      {
        path:'ticket/:id',
        component:TicketComponent,
        data:{titulo:'Ticket'}
      },
      {
        path:'estadisticas',
        component:TablaReporteComponent,
        data:{titulo:'reporte'}
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutingModule { }
