import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/auth/interfaces/categoria';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
  public listadoCategorias: Categoria[] = [];

  public miFormulario: FormGroup;

  formularioEnviado = false;

  private user_id!: number;

  private user!: User;

  private categoria: Categoria = {
    categoria: "",
    color: "",
    user: this.user
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private route: Router, private _authService: AuthService, private _categoriaService: CategoriaService) { 

    if(typeof this._authService.currentUser == "object"){
      this.user = this._authService.currentUser;
      this.categoria.user = this.user;
      if(typeof this.user?.id == "number"){
        this.user_id = this.user.id;
      }
    }

    this.miFormulario = this.fb.group({
      categoria: [this.categoria.categoria, [Validators.required]],
      color: [this.categoria.color, [Validators.required]],
      user:[this.categoria.user]
    })
  }


  validacion(arg:string){
    return this.miFormulario.controls[`${arg}`].hasError('required') && this.miFormulario.controls[`${arg}`].touched && this.miFormulario.controls[`${arg}`].value != null;
  }

  enviar(){
    //archivo.ts
    this.formularioEnviado = true;
    if(this.miFormulario.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormulario.markAllAsTouched();
      return;

    }
    //Si es correcto el formulario
    this._categoriaService.crearCategoria(this.miFormulario.value).subscribe(resp => {

      this._categoriaService.buscarCategoriasPorUser(this.user_id).subscribe(resp => {
        this.listadoCategorias= resp;
        this.miFormulario.get('categoria')!.setValue(null);
        this.miFormulario.get('color')!.setValue(null);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
    
  }
}
