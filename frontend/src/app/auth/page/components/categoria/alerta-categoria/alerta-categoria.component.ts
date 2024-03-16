import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertaCategoriasService } from 'src/app/auth/services/alertaCategorias.service';

@Component({
  selector: 'app-alerta-categoria',
  templateUrl: './alerta-categoria.component.html',
  styleUrls: ['./alerta-categoria.component.css']
})
export class AlertaCategoriaComponent implements OnInit, OnDestroy{
  public modificar: boolean = false;
  public crear: boolean = false;
  public eliminar: boolean = false;

  private alertasSubscription!: Subscription;

  constructor(private _alertaCategorias: AlertaCategoriasService){

  }

  ngOnInit(): void {
    this.alertasSubscription = this._alertaCategorias.alertasData$.subscribe(data => {
      if(data == "eliminar"){
        this.eliminar = true;
        setTimeout(() => {
          this.eliminar = false;
        }, 2000);
      }

      if(data == "modificar"){
        this.modificar = true;
        setTimeout(() => {
          this.modificar = false;
        }, 2000);
      }

      if(data == "crear"){
        this.crear = true;
        setTimeout(() => {
          this.crear = false;
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
