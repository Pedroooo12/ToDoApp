import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { TareaService } from 'src/app/auth/services/tarea.service';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent {
  @Output() hayModal = new EventEmitter<any>();

  @Output() terminarTareas =  new EventEmitter<any>();

  @Output() alertasTareas = new EventEmitter<any>();

  @Output() recorrerArrays = new EventEmitter<any>();

  @Input() tareas!: Tarea[];

  constructor(private _tareaService: TareaService){

  }

  detenerPropagacion(event: Event) {
    // Detiene la propagación del evento para evitar que llegue al fondo oscuro
    event.stopPropagation();
  }

  cerrarModal(event: Event){
    this.hayModal.emit("false");
    console.log("salir");
  }

  terminarTodasTareas(){

    this._tareaService.terminarTareas(this.tareas).subscribe(resp => {
      this.recorrerArrays.emit({id_categoria: 0, id_importancia: 0});
      this.alertasTareas.emit("terminarTodas");
    }, (error) => { 
      console.log(error);
    });
  }
}
