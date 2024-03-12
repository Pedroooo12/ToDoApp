import { Component, EventEmitter, Output } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { TareaService } from 'src/app/auth/services/tarea.service';
import {CdkDragDrop, moveItemInArray, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import { FiltradoService } from 'src/app/auth/services/filtrado.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Filtrado } from 'src/app/auth/interfaces/filtrado';

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

  tareasToDoDuplicado: Tarea[] = [];
  tareasDoingDuplicado: Tarea[] = [];
  tareasDoneDuplicado: Tarea[] = [];

  noHayTareas: boolean = false;
  noHayTareasPorFiltro: boolean = false;

  tareasLlenas: boolean = false;

  recogerTarea?: Tarea;

  hayModal: boolean = false;

  confirmarTareaRealizada: boolean = false;

  confirmarAlertaTareas: boolean = false;

  public id_user!:Number;

  //acciones
  eliminar = false;
  terminar = false;
  terminarTodas = false;

  @Output() emitirAlertar  = new EventEmitter<boolean>();

  constructor(private _tareaService: TareaService, private _filtradoService: FiltradoService, private _authService: AuthService){
    if(this._authService.currentUser){
      this.id_user = this._authService.currentUser.id!;
      this.recogerArrays({id_categoria: 0, id_importancia: 0});
    }
  }

  /* RECOGER TAREAS */

  async recogerArrays(eventData: Filtrado){
    this._filtradoService.eventDataSetter = eventData;

    this.tareasDoing = [];
    this.tareasToDo = [];
    this.tareasDone = [];
    this._tareaService.buscarTareasFiltro(eventData.id_categoria,eventData.id_importancia, this.id_user).subscribe(resp => {
      this.confirmarAlertaTareas = !this.confirmarAlertaTareas;
      console.log(resp);
      if(resp.length == 0 ){
        if(eventData.id_categoria != 0 || eventData.id_importancia != 0 || (eventData.id_categoria == 0 && eventData.id_importancia != 0) || (eventData.id_categoria != 0 && eventData.id_importancia == 0)){
          this.noHayTareasPorFiltro = true;
        }else{
          this.noHayTareas = true;
        }
        
      }else{
        this.noHayTareas = false;
        this.noHayTareasPorFiltro = false;
        if(!this.tareasLlenas || this.confirmarAlertaTareas){
          for (let i = 0; i < resp.length; i++) {
            if(resp[i].estado.estado == "todo"){
              this.tareasToDo.push(resp[i]);  
              this.tareasToDoDuplicado.push(resp[i]);
            }
            if(resp[i].estado.estado == "doing"){
              this.tareasDoing.push(resp[i]);
              this.tareasDoingDuplicado.push(resp[i]);
            }
            if(resp[i].estado.estado == "done"){
              this.tareasDone.push(resp[i]);
              this.tareasDoneDuplicado.push(resp[i]);
            }
            
          }
        }else{
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
  
        
        }
      }

     
    },(error) => {
      console.warn(error);
    });
    

  }

  /* DRAG AND DROP */

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
      const previousIndex = event.previousContainer.data.indexOf(event.item.data);
      event.container.data.splice(previousIndex, 0, event.container.data.splice(event.currentIndex, 1)[0]);
    }
  }

  
  

  /* EVENTOS PROPIOS DE LAS CARDS */


  /*MODALES */
  abrirModalTerminadas(){
    this.confirmarTareaRealizada = true;
  }

  ponerModal(id: Number){
    this.hayModal = true;
    this._tareaService.obtenerTareaPorID(id).subscribe(resp => {
      this.recogerTarea = resp;
    }, (error) => {
      console.log(error)
    });
  }

  cerrarModal(event: any){
    this.confirmarTareaRealizada = false;
    this.hayModal = event.value;
  }

  obtenerColorImportancia(importancia: String) {
    return this._tareaService.obtenerColorImportancia(importancia);
  }

}
