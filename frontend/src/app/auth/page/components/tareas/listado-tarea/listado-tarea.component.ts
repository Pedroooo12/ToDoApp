import { Component } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { TareaService } from 'src/app/auth/services/tarea.service';
import {CdkDragDrop, moveItemInArray, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import { FiltradoService } from 'src/app/auth/services/filtrado.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-listado-tarea',
  templateUrl: './listado-tarea.component.html',
  styleUrls: ['./listado-tarea.component.css']
})
export class ListadoTareaComponent {
  //arrays tareas
  tareasToDo: Tarea[] = [];
  tareasDoing: Tarea[] = [];
  tareasDone: Tarea[] = [];

  public id_user!:Number;

  //acciones
  eliminar = false;
  terminar = false;

  constructor(private _tareaService: TareaService, private _filtradoService: FiltradoService, private _authService: AuthService){
    if(this._authService.currentUser){
      this.id_user = this._authService.currentUser.id!;
      this.recogerArrays({id_categoria: 0, id_importancia: 0});
      console.log(this.tareasDoing);
    }
  }

  async recogerArrays(eventData: { id_categoria: Number, id_importancia: Number }){
    this._filtradoService.eventDataSetter = eventData;
    console.log(eventData);
    this.tareasDoing = [];
    this.tareasToDo = [];
    this.tareasDone = [];
    this._tareaService.buscarTareasFiltro(eventData.id_categoria,eventData.id_importancia, this.id_user).subscribe(resp => {
      for (let i = 0; i < resp.length; i++) {
        if(resp[i].estado.estado == "todo"){
          this.tareasToDo.push(resp[i]);  
        }
        if(resp[i].estado.estado == "doing"){
          this.tareasDoing.push(resp[i]);
        }
        if(resp[i].estado.estado == "done"){
          this.tareasDone.push(resp[i]);
        }
        
      }
    },(error) => {
      console.warn(error);
    });
    

  }



  drop(event: CdkDragDrop<Tarea[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.recogerArrays({id_categoria: 0, id_importancia: 0});
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
      this.recogerArrays({id_categoria: 0, id_importancia: 0});
    }, (error) => { 
      console.log(error);
    });
  }

  async alertasTareas(accion: String){

    if (accion == "terminar") {
  
      // Supongamos que el evento asíncrono es una promesa
      await new Promise<void>(resolve => {
        // Lógica asíncrona que eventualmente resolverá la promesa
        // Esto podría ser un evento, una solicitud HTTP, etc.
        resolve();
      });
  
      // Después de que se resuelva la promesa (2 segundos), se cambiará a true y luego a false
      this.terminar = true;
      setTimeout(() => {
        this.terminar = false;
      }, 2000);
    }
    if (accion == "eliminar") {
      // Supongamos que el evento asíncrono es una promesa
      await new Promise<void>(resolve => {
        // Lógica asíncrona que eventualmente resolverá la promesa
        // Esto podría ser un evento, una solicitud HTTP, etc.
        resolve();
      });
  
      // Después de que se resuelva la promesa (2 segundos), se cambiará a true y luego a false
      this.eliminar = true;
      setTimeout(() => {
        this.eliminar = false;
      }, 2000);
    }
  }
}
