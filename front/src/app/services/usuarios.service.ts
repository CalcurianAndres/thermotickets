import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { newPass } from '../dashboard/interfaces/newPass.interface';
import { newUserForm, perfilObtenido, usuariosObtenidos } from '../dashboard/interfaces/usuarios.interface';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl = environment.baseUrl
  usuario:Usuario;

  constructor(private http:HttpClient,
              private auth:AuthService) { 
                this.usuario = auth.usuario;
              }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return{
      headers:{
      'Authorization':this.token
      }
    } 
   }

  CambiarPass(id:string, formData:newPass){
    const url = `${this.baseUrl}/password/${id}`;

    return this.http.put(url, formData, this.headers)
  }

  
  ObtenerUsuarios( desde:number = 0){
    const url = `${this.baseUrl}/usuarios?limite=5&desde=${desde}`;

    return this.http.get<usuariosObtenidos>(url,this.headers)
          .pipe(
            map( resp =>{
              
              const usuarios = resp.usuarios.map(
                user => new Usuario(user.estado, user._id, user.Nombre, user.Apellido, user.Correo, user.Departamento, user.Role, user.AnyDesk, user.img, user.Sede)
                
                );
              return {
                total:resp.total,
                usuarios
              };

            })
          )
  }

  EliminarUsuario(id:string){
    const url = `${this.baseUrl}/usuario/${id}`;

    return this.http.delete(url,this.headers);
  }

  
  EditarUsuario(data:Usuario){
    const url = `${this.baseUrl}/usuario/${data._id}`;
    const dato = {
      Role:data.Role,
      Departamento:data.Departamento,
      Sede:data.Sede
    }
    
    return this.http.put(url, dato, this.headers);
  }

  crearUsuario( formData:newUserForm ) {
    return this.http.post(`${ this.baseUrl }/usuario`, formData, this.headers);
  }

  cargarPerfil(desde:number, id:string){
    const url = `${this.baseUrl}/perfil/${id}?limite=5&desde=${desde}`;

    return this.http.get<perfilObtenido>(url, this.headers)

  }

}

