import { Component } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { TareaService } from 'src/app/auth/services/tarea.service';

@Component({
  selector: 'app-listado-tarea',
  templateUrl: './listado-tarea.component.html',
  styleUrls: ['./listado-tarea.component.css']
})
export class ListadoTareaComponent {
  tareas!: Tarea[];

  constructor(private _tareaService: TareaService){
    this._tareaService.buscarTodasTareas().subscribe(resp => {
      this.tareas = resp;
    }, (error) => {
      console.log(error);
    })
  }
}
