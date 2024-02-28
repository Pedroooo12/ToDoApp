import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Importancia } from 'src/app/auth/interfaces/importancia';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImportanciaService } from 'src/app/auth/services/importancia.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-actualizar-importancia',
  templateUrl: './actualizar-importancia.component.html',
  styleUrls: ['./actualizar-importancia.component.css']
})
export class ActualizarImportanciaComponent {
  public listadoImportancias: Importancia[] = [];

  public miFormulario: FormGroup;

  formularioEnviado = false;

  importancia_id!: Number;


  private user!: User;

  private importancia: Importancia = {
    importancia: "",
    user: this.user
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private _authService: AuthService,
     private _importanciaService: ImportanciaService) { 

    this.miFormulario = this.fb.group({
      importancia: [this.importancia.importancia, [Validators.required]],
      user:[this.importancia.user]
    })
    
  }

  ngOnInit(): void {
    // Obtener el ID del parámetro de la ruta
    this.route.paramMap.subscribe(params => {
      this.importancia_id = Number(params.get('id')); // Convierte el parámetro a número
    });
    this._importanciaService.obtenerImportanciaPorID(this.importancia_id).subscribe(resp => {
      this.importancia = resp;
      console.log(this.importancia);
      this.miFormulario.patchValue(this.importancia);
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
    this._importanciaService.actualizarImportancia(this.importancia_id,this.miFormulario.value).subscribe(resp => {
      this.router.navigate(["/auth/crear-importancia"]);
    }, (error) => {
      console.log(error);
    });
    
  }
}
