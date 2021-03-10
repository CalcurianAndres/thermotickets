import { Usuario } from './usuario.model';
import { environment } from 'src/environments/environment';
import { Comentario } from './comentario.model';
import { Notificacion } from './notificacion.model';

const base_url = environment.baseUrl;

export class Ticket {
    constructor(
        public _id:string,
        public descripcion:string,
        public estado:string,
        public titulo:string,
        public departamento:string,
        public usuario:Usuario[],
        public comentarios:Comentario[],
        public notificaciones:Notificacion[],
        public fecha:Date,
    ){}

    perfilDueno(){
        const image = this.usuario[0].img;
        if( image) {
            return `${base_url}/imagen/usuarios/${image}`;
        }else{
            return `${base_url}/imagen/usuarios/no-image`;
        }
    }
}