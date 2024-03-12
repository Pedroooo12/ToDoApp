import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cambiar-orden',
  templateUrl: './cambiar-orden.component.html',
  styleUrls: ['./cambiar-orden.component.css']
})
export class CambiarOrdenComponent {
  @Output() ordenar =  new EventEmitter<any>();
  cambiarOrden(texto: string){
    this.ordenar.emit(texto);
  }
}
