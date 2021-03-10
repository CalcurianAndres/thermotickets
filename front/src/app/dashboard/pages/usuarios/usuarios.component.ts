import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  cargando:boolean = true;
  cargando_:boolean = true;
  is_active:boolean = false;

  public usuarios:Usuario[] = [];
  public total:number = 0;
  public desde:number = 0;

  constructor(private usuarioService:UsuariosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios(this.desde);
  }
  
  next(){
    
    if(this.desde + 5 > this.total){
      return
    }else{
      this.desde = this.desde + 5;
    }
    
    this.obtenerUsuarios(this.desde);
  }

  previous(){
    if(this.desde - 5 < 0){
      return
    }else{
      this.desde = this.desde - 5;
    }
    this.obtenerUsuarios(this.desde);
  }

  borrarUsuario(id:string){

    if(this.usuarioService.usuario._id === id){
      Swal.fire('Oops!', 'no puedes eliminar este usuario.', 'warning');
      return
    }
    Swal.fire({
      title: '¿Estas seguro?',
      text: "El usuario será eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.EliminarUsuario(id)
          .subscribe(resp => {
            this.obtenerUsuarios(this.desde);
            Swal.fire('Eliminado', 'Este usuario fue eliminado satisfactoriamente', 'success');
          })
      }
    })

  }

  obtenerUsuarios(desde:number){
    this.cargando = true;
    this.usuarioService.ObtenerUsuarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.usuarios = usuarios;
      this.total = total;
      this.cargando = false;
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.EditarUsuario(usuario)
        .subscribe(resp => console.log(resp))
  }

  editarUsuario(usuario:string){

  }

}
