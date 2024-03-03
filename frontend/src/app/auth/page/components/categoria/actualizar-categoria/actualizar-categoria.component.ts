import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Categoria } from 'src/app/auth/interfaces/categoria';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css']
})
export class ActualizarCategoriaComponent implements OnInit {
  public listadoCategorias: Categoria[] = [];

  public miFormulario: FormGroup;

  formularioEnviado = false;

  categoria_id!: Number;


  private user!: User;

  private categoria: Categoria = {
    categoria: "",
    color: "",
    user: this.user
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private _authService: AuthService, private _categoriaService: CategoriaService) { 

    this.miFormulario = this.fb.group({
      categoria: [this.categoria.categoria, [Validators.required]],
      color: [this.categoria.color, [Validators.required]],
      user:[this.categoria.user]
    })
    
  }

  ngOnInit(): void {
    // Obtener el ID del parámetro de la ruta
    this.route.paramMap.subscribe(params => {
      this.categoria_id = Number(params.get('id')); // Convierte el parámetro a número
    });
    this._categoriaService.obtenerCategoriaPorID(this.categoria_id).subscribe(resp => {
      this.categoria = resp;
      console.log(this.categoria);
      this.miFormulario.patchValue(this.categoria);
    }, (error) => {
      console.log(error);
    });

    
    
  }


  validacion(arg:string){
    return this.miFormulario.controls[`${arg}`].hasError('required') && this.miFormulario.controls[`${arg}`].touched;
  }

  enviar(){
    //archivo.ts
    this.formularioEnviado = true;
    if(this.miFormulario.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormulario.markAllAsTouched();
      return;

    }
    console.log(this.miFormulario.value);
    //Si es correcto el formulario
    this._categoriaService.actualizarCategoria(this.categoria_id,this.miFormulario.value).subscribe(resp => {
      this.router.navigate(["/auth/crear-categoria"]);
    }, (error) => {
      console.log(error);
    });
    
  }
}
