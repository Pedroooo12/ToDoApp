import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent {
  @Output() hayModal = new EventEmitter<any>();

  @Output() terminarTareas =  new EventEmitter<any>();
  detenerPropagacion(event: Event) {
    // Detiene la propagación del evento para evitar que llegue al fondo oscuro
    event.stopPropagation();
  }

  cerrarModal(event: Event){
    this.hayModal.emit("false");
    console.log("salir");
  }

  terminarTodasTareas(){
    this.terminarTareas.emit();
  }
}
