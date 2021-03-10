import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent {

  cargando = false;

  public formSubmitted = false;

  public newUserForm = this.fb.group({
    Nombre:['', Validators.required],
    Apellido:['', Validators.required],
    Correo:['', [Validators.required, Validators.email]],
    AnyDesk:['', Validators.required],
    Password:['', Validators.required],
    password2:['', Validators.required]
  },{validators: this.passwordsIguales('Password','password2')});

  constructor(private fb: FormBuilder,
              private usuarioService :UsuariosService) { }

  crearUsuario(){
    this.formSubmitted = true;
    this.cargando = true;

    if(this.newUserForm.invalid) {
      this.cargando = false;
      return;
    }

    this.usuarioService.crearUsuario(this.newUserForm.value)
        .subscribe( resp => {
        this.cargando = false;
          Swal.fire('Usuario creado', 'Usuario creado exitosamente', 'success');
          this.formSubmitted = false;
          this.newUserForm.reset();
          console.log(resp)
        }, (err)=> {
          //si sucede un error
          console.log(err)
          this.cargando = false;
          Swal.fire('Error', err.error.err.errors.Correo.message, 'error');
        } );

  }

  campoNoValido( campo:string ):boolean{
    if ( this.newUserForm.get(campo)?.invalid && this.formSubmitted ){
      return true;
    }else{
      return false;    
    }
  }

  contrasenaNoValidas(){
    const pass = this.newUserForm.get('Password')?.value;
    const pass2 = this.newUserForm.get('password2')?.value;
    
    if ( (pass !== pass2) && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name:string, pass2Name:string){
    return (formGroup:FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);


      if ( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual: true})
      }

    }
  }
}
