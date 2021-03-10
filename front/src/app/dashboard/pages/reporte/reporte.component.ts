import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fechasReporte } from '../../interfaces/reportes.interface';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  reporteNuevo:boolean = false;
  fechaDesde:any;
  fechaHasta:any;

  fechasForm: FormGroup = this.fb.group({
    desde:['',Validators.required],
    hasta:['',Validators.required]
  })


  @Output() onNewReporte: EventEmitter<fechasReporte> = new EventEmitter();

  constructor(private fb:FormBuilder) { 
    
  }

  ngOnInit(): void {
  }

  generarReporte(){

    if(this.fechasForm.invalid) {
      return;
    }

    this.onNewReporte.emit(this.fechasForm.value);
    this.reporteNuevo = true;
  }

}
