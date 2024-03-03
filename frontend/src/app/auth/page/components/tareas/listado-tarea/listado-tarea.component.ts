import { Component } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { TareaService } from 'src/app/auth/services/tarea.service';
import {CdkDragDrop, moveItemInArray, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import { FiltradoService } from 'src/app/auth/services/filtrado.service';

@Component({
  selector: 'app-listado-tarea',
  templateUrl: './listado-tarea.component.html',
  styleUrls: ['./listado-tarea.component.css']
})
export class ListadoTareaComponent {
  tareasToDo: Tarea[] = [];
  tareasDoing: Tarea[] = [];
  tareasDone: Tarea[] = [];

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(private _tareaService: TareaService, private _filtradoService: FiltradoService){
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

  async recogerArrays(id?: Number){
    if(id == null){
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
    }else{
      this._filtradoService.filtrarPorCategoria(id,{id: 1}).subscribe(resp => {
        this.tareasToDo = resp;
      }, (error) => {
        console.log(error);
      });
  
      this._filtradoService.filtrarPorCategoria(id,{id: 2}).subscribe(resp => {
        this.tareasDoing = resp;
      }, (error) => {
        console.log(error);
      });
  
      this._filtradoService.filtrarPorCategoria(id,{id: 3}).subscribe(resp => {
        this.tareasDone = resp;
      }, (error) => {
        console.log(error);
      });
    }
  }

  drop(event: CdkDragDrop<Tarea[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.recogerArrays();
      let id_estado;
      if(event.container.element.nativeElement.id == "todo"){
        id_estado = 1;
        this._tareaService.cambiarEstadoTarea(event.item.data.id, id_estado).subscribe(resp => {

        }, (error) => {
          console.log(error);
        });
      }
      if(event.container.element.nativeElement.id == "doing"){
        id_estado = 2;
        this._tareaService.cambiarEstadoTarea(event.item.data.id, id_estado).subscribe(resp => {
          console.log("Hecho");
        }, (error) => {
          console.log(error);
        });
      }

      if(event.container.element.nativeElement.id == "done"){
        id_estado = 3;
        this._tareaService.cambiarEstadoTarea(event.item.data.id, id_estado).subscribe(resp => {
        }, (error) => {
          console.log(error);
        });
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  terminarTodasTareas(){
    this._tareaService.terminarTareas(this.tareasDone).subscribe(resp => {
      this.recogerArrays();
    }, (error) => { 
      console.log(error);
    });
  }
}
