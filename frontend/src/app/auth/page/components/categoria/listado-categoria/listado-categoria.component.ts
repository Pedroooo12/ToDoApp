import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Categoria } from 'src/app/auth/interfaces/categoria';
import { AlertaCategoriasService } from 'src/app/auth/services/alertaCategorias.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CategoriaService } from 'src/app/auth/services/categoria.service';

@Component({
  selector: 'app-listado-categoria',
  templateUrl: './listado-categoria.component.html',
  styleUrls: ['./listado-categoria.component.css']
})
export class ListadoCategoriaComponent {


  @Input() listadoCategorias: Categoria[] = [];

  user_id!: Number;

  constructor(private _categoriaService: CategoriaService, 
    private _authService: AuthService, 
    private cdRef: ChangeDetectorRef,
    private _alertaCategorias: AlertaCategoriasService){
    if(typeof this._authService.currentUser!.id == "number"){
      this.user_id = this._authService.currentUser!.id;
    }
    this.buscarCategorias();
  }

  buscarCategorias(){
    this._categoriaService.buscarCategoriasPorUser(this.user_id).subscribe(resp => {
      this.listadoCategorias = resp;
      this.cdRef.detectChanges();
    }, (error) => {
      console.log(error);
    });
  }

  eliminar(id:Number){
    this._categoriaService.eliminarCategoria(id).subscribe(resp => {
      this.buscarCategorias();
      this._alertaCategorias.setAlertasData("eliminar");
      
    }, (error) =>{

    });
  }
}
