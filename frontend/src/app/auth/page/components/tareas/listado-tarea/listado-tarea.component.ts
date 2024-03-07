import { Component } from '@angular/core';
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

  tareasLlenas: boolean = false;

  recogerTarea?: Tarea;

  hayModal: boolean = false;

  confirmarTareaRealizada: boolean = false;

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

  /* RECOGER TAREAS */

  async recogerArrays(eventData: Filtrado){
    this._filtradoService.eventDataSetter = eventData;
    console.log(eventData);
    this.tareasDoing = [];
    this.tareasToDo = [];
    this.tareasDone = [];
    this._tareaService.buscarTareasFiltro(eventData.id_categoria,eventData.id_importancia, this.id_user).subscribe(resp => {
      if(!this.tareasLlenas){
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

  
  /* ALERTAS PARA LOS EVENTOS DE LAS CARDS */

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

  /* EVENTOS PROPIOS DE LAS CARDS */
  eliminarTarea(id: Number){
    this._tareaService.eliminarTarea(id).subscribe(resp => {
      let eventData: any =this._filtradoService.eventDataCurrent;
      this.recogerArrays(eventData);
    }, (error) => {
      console.log(error);
    });
  }


  terminarTarea(tarea: Tarea){
    this._tareaService.terminarTarea(tarea).subscribe(resp => {
      let eventData: any =this._filtradoService.eventDataCurrent;
      this.alertasTareas("terminar");
      this.recogerArrays(eventData);
      this.hayModal = false;
    }, (error) => {
      console.log(error);
    });
  }

  terminarTodasTareas(){
    this._tareaService.terminarTareas(this.tareasDone).subscribe(resp => {
      this.recogerArrays({id_categoria: 0, id_importancia: 0});
    }, (error) => { 
      console.log(error);
    });
  }


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

  cerrarModal(){
    this.hayModal = false;
    this.confirmarTareaRealizada = false;
    console.log("salir");
  }

  obtenerColorImportancia(importancia: String) {
    return this._tareaService.obtenerColorImportancia(importancia);
  }

  detenerPropagacion(event: Event) {
    // Detiene la propagación del evento para evitar que llegue al fondo oscuro
    event.stopPropagation();
  }

  cambiarOrdenToDo(texto:string, id?:number){
    if (texto === 'mayor' && id === 1) {
      this.aplicarOrdenATareas(this.tareasToDo, texto, id);
    } else if (texto === 'menor' && id === 1) {
      this.aplicarOrdenATareas(this.tareasToDo, texto, id);
    } else {
      this.tareasToDo = [...this.tareasToDoDuplicado];
      // Resto de la lógica...
    }

    
  }

  cambiarOrdenDoing(texto:string, id?:number){
    if (texto === 'mayor' && id === 2) {
      this.aplicarOrdenATareas(this.tareasDoing, texto, id);
    } else if (texto === 'menor' && id === 2) {
      this.aplicarOrdenATareas(this.tareasDoing, texto, id);
    } else {
      this.tareasDoing = [...this.tareasDoingDuplicado];
      // Resto de la lógica...
    }
  }

  cambiarOrdenDone(texto:string, id?:number){
    if (texto === 'mayor' && id === 3) {
      this.aplicarOrdenATareas(this.tareasDoing, texto, id);
    } else if (texto === 'menor' && id === 3) {
      this.aplicarOrdenATareas(this.tareasDoing, texto, id);
    } else {
      this.tareasDoing = [...this.tareasDoingDuplicado];
      // Resto de la lógica...
    }
  }

  aplicarOrdenATareas(tareas: Tarea[], texto: string, id: number): void {
    tareas.sort((a, b) => {
      const idA = a.importancia?.id?.valueOf() ?? 0;
      const idB = b.importancia?.id?.valueOf() ?? 0;
  
      return texto === 'mayor' ? this.compararNumeros(idB, idA) : this.compararNumeros(idA, idB);
    });
  }

  compararNumeros(a: number, b: number): number {
    return a - b;
  }
}
