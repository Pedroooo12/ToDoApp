import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Importancia } from 'src/app/auth/interfaces/importancia';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImportanciaService } from 'src/app/auth/services/importancia.service';

@Component({
  selector: 'app-listado-importancia',
  templateUrl: './listado-importancia.component.html',
  styleUrls: ['./listado-importancia.component.css']
})
export class ListadoImportanciaComponent {
  @Input() listadoImportancias: Importancia[] = [];

  user_id!: Number;

  constructor(private _importanciaService: ImportanciaService, private _authService: AuthService, private cdRef: ChangeDetectorRef){
    if(typeof this._authService.currentUser!.id == "number"){
      this.user_id = this._authService.currentUser!.id;
    }
    this.buscarCategorias();
  }

  buscarCategorias(){
    this._importanciaService.buscarImportanciasPorUser(this.user_id).subscribe(resp => {
      this.listadoImportancias = resp;
      this.cdRef.detectChanges();
    }, (error) => {
      console.log(error);
    });
  }

  eliminar(id:Number){
    this._importanciaService.eliminarImportancia(id).subscribe(resp => {
      this.buscarCategorias();
    }, (error) =>{

    });
  }
}
