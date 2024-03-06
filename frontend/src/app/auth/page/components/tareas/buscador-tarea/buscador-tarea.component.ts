import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BuscadorService } from 'src/app/auth/services/buscador.service';

@Component({
  selector: 'app-buscador-tarea',
  templateUrl: './buscador-tarea.component.html',
  styleUrls: ['./buscador-tarea.component.css']
})
export class BuscadorTareaComponent implements OnInit{

  private debouncer: Subject<String> = new Subject<String>();

  public listadoTareas: Tarea[] = [];

  @Output() ponerModal = new EventEmitter<any>();

  id_user!: Number;
  texto: String = "";

  constructor(private _authService: AuthService, private _buscadorService: BuscadorService){
    if(this._authService.currentUser){
      this.id_user = this._authService.currentUser.id!;
    }
  }

  ngOnInit(): void {
    this.debouncer.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this._buscadorService.buscadorPorNombre(value,this.id_user).subscribe(resp => {
        this.listadoTareas = resp.filter(tarea => tarea.estado.estado !== "finalizada");
      }, (error) => {
        console.warn(error);
      });
    });
  }

  onKeyPress(textoRecogido: String){
    this.debouncer.next(textoRecogido);
  }

  obtenerId(id:Number){
    this.ponerModal.emit(id);
  }
}
