import { Usuario } from './usuario.model';

export class Comentario{
    constructor(
        public _id:string,
        public comentarios:[{
            _id:string,
            fecha:Date,
            usuario:Usuario,
            mensaje:string
        }]
    ){}   
}

