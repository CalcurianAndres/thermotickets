import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  Ips: FormGroup = this.fb.group({
    nombre:['', Validators.required],
    direccion:['', Validators.required],
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  NuevaDireccion(){
    console.log(this.Ips.value)
  }

  campoNoValido(campo:string){
    return this.Ips.controls[campo].errors 
        && this.Ips.controls[campo].touched
  }

}
