import { Estado } from './../../../../interfaces/estado';
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
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit{
  public listadoImportancias: Importancia[] = [];

  public listadoCategorias: Categoria[] = [];
  
  public miFormulario: FormGroup;

  formularioEnviado = false;

  private user_id!: number;

  private id_estado?: Number;

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

  private tarea: Tarea = {
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
  constructor(private fb: FormBuilder, private route: Router, private _authService: AuthService, 
    private _importanciaService: ImportanciaService, 
    private _categoriaService: CategoriaService, 
    private _tareaService: TareaService,
    private router: ActivatedRoute,
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
      nombre: [this.tarea.nombre, [Validators.required]],
      descripcion: [this.tarea.descripcion, [Validators.required]],
      importancia: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      estado: [this.tarea.estado],
      user:[this.importancia.user]
    })
  }

  ngOnInit(): void {

      // Suscribirse a los cambios en los parámetros de la ruta
      this.router.paramMap.subscribe(params => {
        // Obtener el valor del parámetro id_estado
        this.id_estado = Number(params.get('id_estado'));
  
        // Realizar acciones basadas en si el parámetro está presente o no
        if (this.id_estado) {
          // El parámetro id_estado está presente
          this.miFormulario.patchValue({
            estado: {id: this.id_estado}
          });
        } else {
          // El parámetro id_estado no está presente
          console.log('No se proporcionó ningún id_estado.');
        }
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
    //Si es correcto el formulario
    console.log(this.miFormulario.get("importancia")!.value);
    let importancia_id = Number(this.miFormulario.get("importancia")!.value);
    let categoria_id = Number(this.miFormulario.get("categoria")!.value);

    this.miFormulario.patchValue({
      categoria: this.listadoCategorias[categoria_id],
      importancia: this.listadoImportancias[importancia_id]
    });
    this._tareaService.crearTarea(this.miFormulario.value).subscribe(resp => {
      this.route.navigate(["auth/listado-tareas"]);
      this._alertaTareas.setAlertasData("crear");
    }, (error) => {
      console.warn(error);
    });
    
  }
}
