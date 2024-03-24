import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/auth/interfaces/categoria';
import { Importancia } from 'src/app/auth/interfaces/importancia';
import { Tarea } from 'src/app/auth/interfaces/tarea';
import { AlertaTareasService } from 'src/app/auth/services/alertaTareas.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CategoriaService } from 'src/app/auth/services/categoria.service';
import { ImportanciaService } from 'src/app/auth/services/importancia.service';
import { TareaService } from 'src/app/auth/services/tarea.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-actualizar-tarea',
  templateUrl: './actualizar-tarea.component.html',
  styleUrls: ['./actualizar-tarea.component.css']
})
export class ActualizarTareaComponent implements OnInit{
  public listadoImportancias: Importancia[] = [];

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

  private importancia: Importancia = {
    importancia: "",
    user: this.user
  }

  private tarea_id!: Number;

  public tarea: Tarea = {
    nombre: '',
    descripcion: '',
    categoria: this.categoria,
    importancia: this.importancia,
    estado: {
      id: 1
    },
    user: this.user
  }

  //injectamos en el constructor 
  constructor(
      private fb: FormBuilder, 
      private route: Router, 
      private router: ActivatedRoute, 
      private _authService: AuthService, 
      private _importanciaService: ImportanciaService, 
      private _categoriaService: CategoriaService, 
      private _tareaService: TareaService,
      private _alertaTareas: AlertaTareasService) { 

    if(typeof this._authService.currentUser == "object"){
      this.user = this._authService.currentUser;
      this.importancia.user = this.user;
      if(typeof this.user?.id == "number"){
        this.user_id = this.user.id;
      }
    }

    //cogemos todas las categorias e importancias
    this._importanciaService.buscarImportancias().subscribe(resp => {
      this.listadoImportancias = resp;
      
    }, (error) => {
      console.log(error)
    });

    this._categoriaService.buscarCategoriasPorUser(this.user.id!).subscribe(resp => {
      this.listadoCategorias = resp;
    }, (error) => {
      console.log(error)
    });

    this.miFormulario = this.fb.group({
      id: [this.tarea.id],
          nombre: [this.tarea.nombre, [Validators.required]],
          descripcion: [this.tarea.descripcion, [Validators.required]],
          created: [this.tarea.created],
          updated: [this.tarea.updated],
          importancia: [null, [Validators.required]],
          categoria: [null, [Validators.required]],
          estado: [this.tarea.estado],
          user:[this.importancia.user]

    });
  }

  ngOnInit() {
    // Obtener el ID del parámetro de la ruta
    this.router.paramMap.subscribe(params => {
      this.tarea_id = Number(params.get("id")); // Convierte el parámetro a número

      this._tareaService.obtenerTareaPorID(this.tarea_id).subscribe(resp => {
        this.tarea = resp;
        console.log("Categoria id:" +this.tarea.categoria.categoria);
        console.log("Categoriaa fronted: " + this.categoria.categoria);
        this.miFormulario.setValue(this.tarea);
        console.log(this.miFormulario);
      }, (error) => {
        console.log(error);
      });
    });
    
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

    if(typeof this.miFormulario.get("categoria")!.value == "object" && typeof this.miFormulario.get("importancia")!.value == "object"){
      let importancia = this.miFormulario.get("importancia")!.value;
        let categoria = this.miFormulario.get("categoria")!.value;

        this.miFormulario.patchValue({
          categoria:  categoria,
          importancia: importancia
        });
    }

    if(typeof this.miFormulario.get("categoria")!.value == "string" && typeof this.miFormulario.get("importancia")!.value == "object"){
      let importancia = this.miFormulario.get("importancia")!.value;
      let categoria = Number(this.miFormulario.get("categoria")!.value);

      this.miFormulario.patchValue({
        categoria: this.listadoCategorias[categoria],
        importancia: importancia
      });
    }

    if(typeof this.miFormulario.get("categoria")!.value == "object" && typeof this.miFormulario.get("importancia")!.value == "string"){
      let importancia = Number(this.miFormulario.get("importancia")!.value);
      let categoria = this.miFormulario.get("categoria")!.value;

      this.miFormulario.patchValue({
        categoria: categoria,
        importancia: this.listadoImportancias[importancia]
      });
    }


    if(typeof this.miFormulario.get("categoria")!.value == "string" && typeof this.miFormulario.get("importancia")!.value == "string"){
      let importancia = Number(this.miFormulario.get("importancia")!.value);
      let categoria = Number(this.miFormulario.get("categoria")!.value);
      this.miFormulario.patchValue({
        categoria: this.listadoCategorias[categoria],
        importancia: this.listadoImportancias[importancia]
      });
    }

    

    this._tareaService.actualizarTarea(this.tarea_id,this.miFormulario.value).subscribe(resp => {
      this.route.navigate(["auth/listado-tareas"]);
      this._alertaTareas.setAlertasData("modificar");
    }, (error) => {
      console.log(error);
    });
    
  }

  obtenerColorImportancia(importancia: String) {
    return this._tareaService.obtenerColorImportancia(importancia);
  }
}
