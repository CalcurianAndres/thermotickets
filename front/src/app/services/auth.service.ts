import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { loginForm } from '../auth/interfaces/login.interface';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario!:Usuario;

  loginUrl = environment.loginUrl;

  constructor(private http:HttpClient) { }

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

  validarToken():Observable<boolean>{

    return this.http.get(`${this.loginUrl}/renew`,this.headers).pipe(
      tap( (resp:any) =>{

        const {estado,_id ,Nombre ,Apellido, Correo ,Departamento, Role,AnyDesk, img, Sede} = resp.usuario;

        this.usuario = new Usuario(estado, _id, Nombre, Apellido, Correo, Departamento,Role, AnyDesk, img, Sede);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify( resp.menu) );
      }),
      map(resp => true),
      catchError(error => of(false))
    )

  }

  login(formData:loginForm){
    return this.http.post(this.loginUrl,formData)
      .pipe(
        tap( (resp:any) =>{
          const {Role, estado, Departamento, _id, Nombre, Apellido, Correo, AnyDesk, img, Sede} = resp.usuario;
          this.usuario = new Usuario(estado,_id,Nombre,Apellido,Correo,Departamento,Role,AnyDesk,img,Sede);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('menu', JSON.stringify( resp.menu) );
        })
      )
  }

}
