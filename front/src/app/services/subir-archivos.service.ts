import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class SubirArchivosService {


  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo:'usuarios'|'errors',
    id:string
  ) {
    try{
      
      const url = `${baseUrl}/upload/${tipo}/${id}`;
      const formData = new FormData(); 
      formData.append('archivo', archivo);

      const resp = await fetch( url ,{
        method:'PUT',
        headers: {
          'Authorization': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.ok){
        Swal.fire('Excelente!', 'Tu perfil ha sido actualizado correctamente', 'success');
        return data.img
      }else{
        Swal.fire('Error', data.err.message, 'error');
        
        return false;
      }
      return 'path image'


    } catch(error){
      console.log(error)
      return false;
    }

  }
}
