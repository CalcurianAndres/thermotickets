import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { equalValueValidator } from 'src/app/shared/comparar-campos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styles: [
  ]
})
export class CambioContrasenaComponent implements OnInit {
  
  private Usuario:Usuario;
  noCoinciden:boolean = false;

  cambiarPassForm: FormGroup = this.fb.group({
    oldPass:  ['', Validators.required],
    newPass:  ['', Validators.required],
    dosPass:  ['']
  },
    {validator: equalValueValidator('newPass', 'dosPass')}
  )

  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private usuario:UsuariosService) {
                this.Usuario = auth.usuario;
               }

  ngOnInit(): void {
  }

  campoNoValido(campo:string){
    return this.cambiarPassForm.controls[campo].errors 
        && this.cambiarPassForm.controls[campo].touched
  }

  cambiarPass(){

    if(this.cambiarPassForm.invalid){
      this.cambiarPassForm.markAllAsTouched();
      return;
    }

    if(this.cambiarPassForm.get('newPass').value != this.cambiarPassForm.get('dosPass').value){
      this.cambiarPassForm.get('dosPass').setErrors({'incorrect': true});
      this.cambiarPassForm.markAllAsTouched();
      return;
    }

    console.log(this.cambiarPassForm.value); 

    this.usuario.CambiarPass(this.Usuario._id, this.cambiarPassForm.value)
      .subscribe(resp=>{
        Swal.fire('Contraseña cambiada', 'Se cambió la contraseña', 'success');
        this.cambiarPassForm.reset();
      }, (error)=>{
        console.log(error);
        Swal.fire('Error','la contraseña actual es incorrecta','error');
      })

  }

}
