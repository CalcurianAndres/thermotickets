import { Ticket } from "src/app/models/ticket.model";

export interface NewTicketForm {
    Titulo:string;
    Descripcion:string;
}

export interface ticketsObtenidos {
    total:number; 
    ticket:Ticket[]; 
    abierto:number;
    ejecutandose:number;
    cerrado:number;
}

export interface ticketObtenidos {
    ok:string; 
    ticket:Ticket; 
}

export interface notificacionForm{
    estado:string;
    usuario:string;
    mensaje:string;
}

export interface comentarioForm{
    dueno:string;
    mensaje:string;
}

export interface reporte{
    tickets:Ticket[],
}