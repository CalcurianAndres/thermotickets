import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  usuario:Usuario;
  public cargando = false;
  public formSubmitted = false;

  nuevoTicket: FormGroup = this.fb.group({
    Departamento:['soporte',Validators.required],
    Titulo:['', Validators.required],
    Descripcion:['', Validators.required],
  })

  constructor(private auth:AuthService,
              private fb:FormBuilder,
              private ticketService:TicketService) { 
    this.usuario = auth.usuario;
  }

  ngOnInit(): void {
  }

  NuevoTicket(){
    this.formSubmitted = true;
    this.cargando = true;

    if(this.nuevoTicket.invalid) {
      this.cargando = false;
      return;
    }

    this.ticketService.crearTicket(this.nuevoTicket.value)
    .subscribe( resp => {
      this.cargando = false;
        Swal.fire('Nuevo Ticket!', 'Nuevo ticket creado satisfactoriamente', 'success');
        this.formSubmitted = false;
        this.nuevoTicket.reset();
        this.nuevoTicket.get('Departamento')?.setValue('soporte')
      }, (err)=> {
        //si sucede un error
        console.log(err)
        this.cargando = false;
        Swal.fire('Error', err.error.err.errors.Correo.message, 'error');
      } );
  }

  campoNoValido(campo:string){
    return this.nuevoTicket.controls[campo].errors 
        && this.nuevoTicket.controls[campo].touched
  }


}
