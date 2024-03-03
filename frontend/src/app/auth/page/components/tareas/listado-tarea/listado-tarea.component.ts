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
    //this.recogerArrays();
  }

  async recogerArrays(eventData?: { id_categoria: Number, id_importancia: Number }){
   


    //Si no se ha tocado nada
    if(!eventData){
      console.log("entra");
      this.recorrerArrayNormal();
      //si idcategoria existe y no es 0 y importancia es 0
    }else{
      console.log(eventData);

      if(eventData && eventData.id_categoria == 1 && eventData.id_importancia == 0){
        console.log("entra a categoria");
        this.recorrerArrayPorCategoria(eventData.id_categoria);
        
        //filtrar por importancia
      }else if(eventData && eventData.id_importancia != 0 && eventData.id_categoria == 0){
        this.recorrerArrayPorImportancia(eventData.id_importancia);
      }
    }

  }

  recorrerArrayNormal(){
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

  recorrerArrayPorCategoria(categoriaId: Number){
    this._filtradoService.filtrarPorCategoria(categoriaId,{id: 1}).subscribe(resp => {
      this.tareasToDo = resp;
    }, (error) => {
      console.log(error);
    });

    this._filtradoService.filtrarPorCategoria(categoriaId,{id: 2}).subscribe(resp => {
      this.tareasDoing = resp;
    }, (error) => {
      console.log(error);
    });

    this._filtradoService.filtrarPorCategoria(categoriaId,{id: 3}).subscribe(resp => {
      this.tareasDone = resp;
    }, (error) => {
      console.log(error);
    });
  }

  recorrerArrayPorImportancia(importanciaId: Number){
    this._filtradoService.filtrarPorImportancia(importanciaId,{id: 1}).subscribe(resp => {
      this.tareasToDo = resp;
    }, (error) => {
      console.log(error);
    });

    this._filtradoService.filtrarPorImportancia(importanciaId,{id: 2}).subscribe(resp => {
      this.tareasDoing = resp;
    }, (error) => {
      console.log(error);
    });

    this._filtradoService.filtrarPorImportancia(importanciaId,{id: 3}).subscribe(resp => {
      this.tareasDone = resp;
    }, (error) => {
      console.log(error);
    });
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
