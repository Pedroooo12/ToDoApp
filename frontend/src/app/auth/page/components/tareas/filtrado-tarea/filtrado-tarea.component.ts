import { Component, EventEmitter, Output } from '@angular/core';
import { Categoria } from 'src/app/auth/interfaces/categoria';
import { Importancia } from 'src/app/auth/interfaces/importancia';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { ImportanciaService } from 'src/app/auth/services/importancia.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-filtrado-tarea',
  templateUrl: './filtrado-tarea.component.html',
  styleUrls: ['./filtrado-tarea.component.css']
})
export class FiltradoTareaComponent {
  listadoCategorias: Categoria[] = [];
  
  listadoImportancias: Importancia[] = [];

  @Output() eventoRecargaTareas = new EventEmitter<any>();
  user!: User;
  constructor(private _categoriaService: CategoriaService, private _importanciaService: ImportanciaService, private _authService: AuthService) {
    this.user =this._authService.currentUser!;
    this._categoriaService.buscarCategoriasPorUser(this.user.id!).subscribe(resp => {
      this.listadoCategorias = resp;
    }, (error) => {
      console.log(error);
    });    

    this._importanciaService.buscarImportancias().subscribe(resp => {
      this.listadoImportancias = resp;
    }, (error) => {
      console.log(error);
    });
  }


  cambioCategorias(event: any){
    console.log(event.target.value);
    this.eventoRecargaTareas.emit(event.target.value);
  }
}
