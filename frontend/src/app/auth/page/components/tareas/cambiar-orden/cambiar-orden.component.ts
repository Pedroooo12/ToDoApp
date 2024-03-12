import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from 'src/app/auth/interfaces/tarea';

@Component({
  selector: 'app-cambiar-orden',
  templateUrl: './cambiar-orden.component.html',
  styleUrls: ['./cambiar-orden.component.css']
})
export class CambiarOrdenComponent {
  @Output() ordenar =  new EventEmitter<any>();
  @Input() id!: number ; 
  @Input() arrayTareasDuplicado!: Tarea[];
  @Input() arrayTareas!: Tarea[];

  cambiarOrden(texto: string){
    console.log(this.id);
    console.log(this.arrayTareasDuplicado);
    this.ordenar.emit(texto);

    if (texto === 'mayor' && this.id === 1) {
      this.aplicarOrdenATareas(this.arrayTareas, texto, this.id);
    } else if (texto === 'menor' && this.id === 1) {
      this.aplicarOrdenATareas(this.arrayTareas, texto, this.id);
    }

    if (texto === 'mayor' && this.id === 2) {
      this.aplicarOrdenATareas(this.arrayTareas, texto, this.id);
    } else if (texto === 'menor' && this.id === 2) {
      this.aplicarOrdenATareas(this.arrayTareas, texto, this.id);
    }

    if (texto === 'mayor' && this.id === 3) {
      this.aplicarOrdenATareas(this.arrayTareas, texto, this.id);
    } else if (texto === 'menor' && this.id === 3) {
      this.aplicarOrdenATareas(this.arrayTareas, texto, this.id);
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
