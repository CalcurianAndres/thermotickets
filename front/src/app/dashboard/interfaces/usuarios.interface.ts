import { Ticket } from "src/app/models/ticket.model";
import { Usuario } from "src/app/models/usuario.model";


export interface usuariosObtenidos {
    total:number; 
    usuarios:Usuario[];
}

export interface newUserForm{
    Nombre:string;
    Apellido:string;
    Correo:string;
    Password:string;
    password2:string;
    AnyDesk:string;
}

export interface perfilObtenido{
    ok:boolean,
    Total:Ticket[];
    Abiertos:number;
    Ejecutandose:number;
    Cerrados:number;
}