import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CambioContrasenaComponent } from './pages/cambio-contrasena/cambio-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BandejaComponent } from './pages/bandeja/bandeja.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { RouterModule } from '@angular/router';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { TablaReporteComponent } from './pages/reporte/tabla-reporte/tabla-reporte.component';


@NgModule({
  declarations: [
    PerfilComponent,
    CambioContrasenaComponent,
    BandejaComponent,
    NuevoComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    TicketComponent,
    ReporteComponent,
    TablaReporteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
