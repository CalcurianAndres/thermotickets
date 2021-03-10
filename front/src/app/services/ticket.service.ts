import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NewTicketForm, ticketObtenidos, ticketsObtenidos, notificacionForm } from '../dashboard/interfaces/tickets.interface';
import { Ticket } from '../models/ticket.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public ticket!:Ticket

  base_url = environment.baseUrl;
  
  constructor(private http:HttpClient,
              private router:Router) { }


  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return {
      'Authorization':this.token
    }
  }

  crearTicket(formData:NewTicketForm){
    const url = `${this.base_url}/ticket`;
    return this.http.post(url, formData, {headers:this.headers});
  }

  obtenerTickets(desde:number = 0, usuario:Usuario){
    const departamento = usuario.Departamento;
    const url = `${this.base_url}/tickets?desde=${desde}&limite=5&departamento=${departamento}`;

    return this.http.get<ticketsObtenidos>(url, {headers:this.headers})
      .pipe(
        map(resp =>{
          const ticket = resp.ticket.map(
              ticket => new Ticket(ticket._id,ticket.descripcion,ticket.estado,ticket.titulo,ticket.departamento,ticket.usuario, ticket.comentarios, ticket.notificaciones, ticket.fecha)
          );
          return {
            total:resp.total,
            abierto:resp.abierto,
            ejecutandose:resp.ejecutandose,
            cerrado:resp.cerrado,
            ticket
          };
        }
        )
      )
  }

  obtenerUnTicket(id:any){
    const url = `${this.base_url}/ticket/${id}`;

    return this.http.get<ticketObtenidos>(url, {headers:this.headers})
      .pipe(
        map(resp => {
          const ticket = resp.ticket

          this.ticket = new Ticket(ticket._id,ticket.descripcion,ticket.estado,ticket.titulo,ticket.departamento, ticket.usuario, ticket.comentarios, ticket.notificaciones, ticket.fecha)

          return this.ticket;
        })
      )
  }

  ModificarTicket(id:any, data:notificacionForm){
    const url = `${this.base_url}/ticket/${id}`;

    return this.http.put(url, data, {headers:this.headers});
  }

}
