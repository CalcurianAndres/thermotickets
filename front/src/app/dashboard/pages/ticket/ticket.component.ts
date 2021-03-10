import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  public ticket!:Ticket;
  public usuario!:Usuario;
  public cargando:boolean = true;
  public enviando:boolean = false;
  public notificacion:boolean = false;
  public modal:boolean = false;
  public id!:any;
  public lleno:boolean = false;

  
  public newComment = this.fb.group({
    dueno:[''],
    mensaje:['', Validators.required]
  });

  constructor(private route:ActivatedRoute,
    private fb:FormBuilder,
    private auth:AuthService,
    private ticketService:TicketService,
    private comentarioService:ComentariosService,) { 
      this.usuario = this.auth.usuario;
      this.id = this.route.snapshot.paramMap.get('id');
    }
    

  ngOnInit(): void {
    this.getTicket();
  }
  
  getTicket(){
    this.cargando = true;

    this.ticketService.obtenerUnTicket(this.id)
        .subscribe(ticket => {
          this.ticket = ticket;
          this.cargando = false;
        })
  }

  comentar(){
    this.enviando = true;
    this.newComment.get('dueno')?.setValue(this.usuario._id)

    if(this.newComment.invalid) {
      this.enviando = false;
      return;
    }

    
    this.comentarioService.enviarComentario(this.id, this.newComment.value)
        .subscribe(resp =>{
          this.enviando = false;
          this.newComment.reset();
          this.getTicket();
        })
        

  }

  Modal(){
    if(!this.modal){
      this.modal = true;
    }else{
      this.modal = false;
    }
  }

  cambiarTicket(ticket:Ticket, mensaje:any){
    const data = {
      estado:ticket.estado,
      departamento:ticket.departamento,
      usuario:this.usuario._id,
      mensaje:mensaje.value
    }
    this.cargando = true;
    this.ticketService.ModificarTicket(this.id, data)
      .subscribe(resp=>{
        this.modal = false;
        this.getTicket();
      })
  }

  verificarText(mensaje:any){
    if(mensaje.value === ''){
      this.lleno = false
    }else{
      this.lleno = true;
    }
  }

  MostrarNotificacion(){
    if(!this.notificacion){
      this.notificacion = true;
    }else{
      this.notificacion = false;
    }
  }

}
