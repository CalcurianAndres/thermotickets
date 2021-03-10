import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivosService } from 'src/app/services/subir-archivos.service';
import { perfilObtenido } from '../../interfaces/usuarios.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: [
    './perfil.component.css'
  ]
})
export class PerfilComponent implements OnInit{

  
  public cargando = false;
  cargando_ = true;
  public desde:number = 0;

  public usuario:Usuario;
  public ImgSubir:File;
  public datosUsuario = {
    ok:false,
    Total:[],
    Abiertos:0,
    Ejecutandose:0,
    Cerrados:0,
  };
  
  constructor(private auth:AuthService,
    private subirArchivo:SubirArchivosService,
    private usuarioService:UsuariosService) { 
      this.usuario = auth.usuario;
    }

    ngOnInit(): void {
      this.cargarPerfil(0,this.usuario._id);
    }

  CambiarImagen( event:any ){
    this.ImgSubir = (event.target).files[0];
    document.getElementsByClassName('file-name')[0].innerHTML = this.ImgSubir.name;
  }

  subirImagen(){
    this.cargando = true;
    this.subirArchivo.actualizarFoto(this.ImgSubir, 'usuarios', this.usuario._id )
    .then(img => {
      if(img){
        this.usuario.img = img;
        document.getElementsByClassName('file-name')[0].innerHTML = 'Sin archivo...';
        this.ImgSubir = null;
      }
      this.cargando = false;
    });
  }

  cargarPerfil(desde:number, usuario:any){

    this.usuarioService.cargarPerfil(desde, usuario)
      .subscribe(resp =>{
        this.datosUsuario = resp;
        this.cargando_ = false;
      })
  }

  next(){
    let ticketsTotal = (this.datosUsuario.Abiertos + this.datosUsuario.Ejecutandose) + this.datosUsuario.Cerrados;
    if(this.desde + 5 >= ticketsTotal){
      console.log(ticketsTotal)
      return
    }else{
      this.desde = this.desde + 5;
    }
    
    this.cargarPerfil(this.desde, this.usuario._id);
  }

  previous(){
    if(this.desde - 5 < 0){
      return
    }else{
      this.desde = this.desde - 5;
    }
    this.cargarPerfil(this.desde, this.usuario._id);
  }

}
