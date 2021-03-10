import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl

export class Usuario{
    constructor(
        public estado: boolean, 
        public _id: string,
        public Nombre: string, 
        public Apellido: string, 
        public Correo: string,
        public Departamento:string,
        public Role?: string,
        public AnyDesk?: string,
        public img?:string,
        public Sede?:string
    ) {}

    mostrarImagen(){
        if( this.img) {
            return `${baseUrl}/imagen/usuarios/${this.img}`;
        }else{
            return `${baseUrl}/imagen/usuarios/no-image.png`;
        }
    }
}