import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filtrado } from 'src/app/auth/interfaces/filtrado';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { AlertaTareasService } from 'src/app/auth/services/alertaTareas.service';
import { FiltradoService } from 'src/app/auth/services/filtrado.service';
import { TareaService } from 'src/app/auth/services/tarea.service';

@Component({
  selector: 'app-modal-tarea',
  templateUrl: './modal-tarea.component.html',
  styleUrls: ['./modal-tarea.component.css']
})
export class ModalTareaComponent {
  @Input() recogerTarea!: Tarea;
  @Output() hayModal = new EventEmitter<any>();
  @Output() recorrerArrays = new EventEmitter<any>();

  //@Output() alertasTareas = new EventEmitter<any>();
  constructor(private _tareaService: TareaService, private _filtradoService: FiltradoService, private _alertaTareas: AlertaTareasService){

  }
  
  eliminarTarea(id: Number){


    this._tareaService.eliminarTarea(id).subscribe(resp => {
      let eventData: Filtrado =this._filtradoService.eventDataCurrent;
      this.hayModal.emit("false");
      this.recorrerArrays.emit(eventData);
      this._alertaTareas.setAlertasData("eliminar");
      //this.alertasTareas.emit("eliminar");
      
    }, (error) => {
      console.log(error);
    });
  }

  detenerPropagacion(event: Event) {
    // Detiene la propagación del evento para evitar que llegue al fondo oscuro
    event.stopPropagation();
  }


  terminarTarea(tarea: Tarea){
    this._tareaService.terminarTarea(tarea).subscribe(resp => {
      let eventData: Filtrado =this._filtradoService.eventDataCurrent;
      this.hayModal.emit("false");
      this.recorrerArrays.emit(eventData);
      this._alertaTareas.setAlertasData("terminar");
      
    }, (error) => {
      console.log(error);
    });
  }

  obtenerColorImportancia(importancia: String) {
    return this._tareaService.obtenerColorImportancia(importancia);
  }

  cerrarModal(){
    this.hayModal.emit("false");
    console.log("salir");
  }
}
