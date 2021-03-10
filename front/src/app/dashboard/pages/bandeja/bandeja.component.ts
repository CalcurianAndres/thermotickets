import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.scss']
})
export class BandejaComponent implements OnInit {

  cargando:boolean = true;

  public Bandeja:String = 'Bandeja';
  public usuario!:Usuario;
  public tickets!:Ticket[];
  public total:number = 0;
  public abierto:number = 0;
  public ejecutandose:number = 0;
  public cerrado:number = 0;
  public desde:number = 0;
    
  constructor(private ticketService:TicketService,
              private auth:AuthService) { 
                this.usuario = auth.usuario;
              }

  ngOnInit(): void {
    this.llenarBandeja(0, this.usuario);
  }

  llenarBandeja(desde:number, usuario:Usuario){
    this.cargando = true;
    this.ticketService.obtenerTickets(desde, usuario)
        .subscribe(({total, ticket, abierto, ejecutandose, cerrado}) => {
          this.tickets = ticket;
          this.total = total;
          this.abierto = abierto;
          this.ejecutandose = ejecutandose;
          this.cerrado = cerrado;
          this.cargando = false;
        });
  }

  next(){
    
    if(this.desde + 5 >= this.abierto){
      return
    }else{
      this.desde = this.desde + 5;
    }
    
    this.llenarBandeja(this.desde, this.usuario);
  }

  previous(){
    if(this.desde - 5 < 0){
      return
    }else{
      this.desde = this.desde - 5;
    }
    this.llenarBandeja(this.desde, this.usuario);
  }

}
