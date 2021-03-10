import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { comentarioForm } from '../dashboard/interfaces/tickets.interface';


const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return {
      'Authorization':this.token
    }
  }
  constructor(private http:HttpClient) { }

  enviarComentario(id:any, formData:comentarioForm){

    const url = `${base_url}/ticket/${id}`;

    return this.http.post(url, formData, {headers:this.headers})
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      )
  }
}
