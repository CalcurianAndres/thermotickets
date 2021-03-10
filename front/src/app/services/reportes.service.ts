import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { reporte } from '../dashboard/interfaces/tickets.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  baseUrl = environment.baseUrl 

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

   generarReporte(desde:any, hasta:any, departamento:string){

    const url = `${this.baseUrl}/reporte?desde=${desde}&hasta=${hasta}&dep=${departamento}`;

    return this.http.get<reporte>(url)

   }
}
