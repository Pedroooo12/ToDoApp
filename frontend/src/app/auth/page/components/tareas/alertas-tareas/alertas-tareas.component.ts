import { Component, Input,OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertaTareasService } from 'src/app/auth/services/alertaTareas.service';

@Component({
  selector: 'app-alertas-tareas',
  templateUrl: './alertas-tareas.component.html',
  styleUrls: ['./alertas-tareas.component.css']
})
export class AlertasTareasComponent implements OnInit, OnDestroy{
  @Input() confirmarTareaRealizada!: boolean;
  @Input() confirmarAlertaTareas!: boolean;
  @Input() noHayTareas!:boolean;
  @Input() NoHayTareasSinFiltro!: boolean;

  private alertasSubscription!: Subscription;

  //acciones
  crear = false;
  modificar = false;
  eliminar = false;
  terminar = false;
  terminarTodas = false;

  constructor(private _alertaTareas: AlertaTareasService){
   
  }

  ngOnInit(): void {
    this.alertasSubscription = this._alertaTareas.alertasData$.subscribe(data => {
      if(data == "crear"){
        this.crear = true;
        setTimeout(() => {
          this.crear = false;
        }, 2000);
      }

      if(data == "modificar"){
        this.modificar = true;
        setTimeout(() => {
          this.modificar = false;
        }, 2000);
      }

      if(data == "eliminar"){
        this.eliminar = true;
        setTimeout(() => {
          this.eliminar = false;
        }, 2000);
      }

      if(data == "terminar"){
        this.terminar = true;
        setTimeout(() => {
          this.terminar = false;
        }, 2000);
      }

      if(data == "terminarTodas"){
        this.terminar = true;
        setTimeout(() => {
          this.terminar = false;
        }, 2000);
      }
    });
  }


  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    if (this.alertasSubscription) {
      this.alertasSubscription.unsubscribe();
    }
  }

}
