import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { FiltradoService } from 'src/app/auth/services/filtrado.service';
import { TareaService } from 'src/app/auth/services/tarea.service';

@Component({
  selector: 'app-card-tarea',
  templateUrl: './card-tarea.component.html',
  styleUrls: ['./card-tarea.component.css']
})
export class CardTareaComponent {
  @Input() card!: Tarea;

  @Output() eventoRecargaTareas = new EventEmitter<any>();

  @Output() alertasTareas = new EventEmitter<any>();


  constructor(private _tareaService: TareaService, private _filtradoService: FiltradoService){

  }

  eliminarTarea(id: Number){
    this._tareaService.eliminarTarea(id).subscribe(resp => {
      this.alertasTareas.emit("eliminar");
      this.eventoRecargaTareas.emit(this._filtradoService.eventDataCurrent);
    }, (error) => {
      console.log(error);
    });
  }


  terminarTarea(tarea: Tarea){
    this._tareaService.terminarTarea(tarea).subscribe(resp => {
      this.alertasTareas.emit("terminar");
      console.log(this._filtradoService.eventDataCurrent);
      this.eventoRecargaTareas.emit(this._filtradoService.eventDataCurrent);
    }, (error) => {
      console.log(error);
    });
  }
}
