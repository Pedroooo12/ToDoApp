import { Component } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { TareaService } from 'src/app/auth/services/tarea.service';

@Component({
  selector: 'app-listado-tarea',
  templateUrl: './listado-tarea.component.html',
  styleUrls: ['./listado-tarea.component.css']
})
export class ListadoTareaComponent {
  tareasToDo!: Tarea[];
  tareasDoing!: Tarea[];
  tareasDone!: Tarea[];

  constructor(private _tareaService: TareaService){
    this._tareaService.buscarTareasPorEstado({id: 1}).subscribe(resp => {
      this.tareasToDo = resp;
    }, (error) => {
      console.log(error);
    });

    this._tareaService.buscarTareasPorEstado({id: 2}).subscribe(resp => {
      this.tareasDoing = resp;
    }, (error) => {
      console.log(error);
    });

    this._tareaService.buscarTareasPorEstado({id: 3}).subscribe(resp => {
      this.tareasDone = resp;
    }, (error) => {
      console.log(error);
    });
  }
}
