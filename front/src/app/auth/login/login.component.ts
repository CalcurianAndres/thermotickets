import { Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit{

  public cargando:boolean = false;
  public correo  : '';
  public email!:string;

  loginForm: FormGroup = this.fb.group({
    Correo    : ['',Validators.required],
    Password  : ['',Validators.required],
    remember  :[false]
  })

  constructor(private fb:FormBuilder,
              private auth:AuthService,
              private router:Router) { }


  ngOnInit(){
    this.email = localStorage.getItem('correo') || '';
        if(this.email.length > 2 ){
          this.loginForm.reset({
            Correo:this.email,
            remember:true
          })
        }
  }

  campoNoValido(campo:string){
    return this.loginForm.controls[campo].errors 
        && this.loginForm.controls[campo].touched
  }

  ingresar(){
    
    
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.cargando = true;

    if(this.loginForm.get('remember')?.value === true){
      this.correo = this.loginForm.get('Correo')?.value;
      localStorage.setItem('correo', this.correo);
    }else{
      localStorage.removeItem('correo');
    }
    
    this.auth.login(this.loginForm.value)
    .subscribe(resp => {
      this.cargando = false
      this.loginForm.reset();
      this.router.navigateByUrl('/')
    },(err) =>{
      this.cargando = false;
          Swal.fire('Error', err.error.err.message, 'error')
    })

  
  }

}
