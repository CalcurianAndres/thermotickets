import { Usuario } from './usuario.model';

export class Notificacion{
    constructor(
        public _id:string,
        public notificacion:[{
            _id:string,
            fecha:Date,
            usuario:Usuario,
            tipo:string,
            mensaje:string
        }]
    ){}   
}
