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


  @Output() addModal = new EventEmitter<any>();


  constructor(private _tareaService: TareaService, private _filtradoService: FiltradoService){

  }

  obtenerColorImportancia(importancia: String) {
    return this._tareaService.obtenerColorImportancia(importancia);
  }

  irModal(id:Number){
    this.addModal.emit(id);
  }
}
