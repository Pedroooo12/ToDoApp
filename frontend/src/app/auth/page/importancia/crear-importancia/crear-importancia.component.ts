import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Importancia } from 'src/app/auth/interfaces/importancia';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImportanciaService } from 'src/app/auth/services/importancia.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-crear-importancia',
  templateUrl: './crear-importancia.component.html',
  styleUrls: ['./crear-importancia.component.css']
})
export class CrearImportanciaComponent {
  public listadoImportancias: Importancia[] = [];

  public miFormulario: FormGroup;

  formularioEnviado = false;

  private user_id!: number;

  private user!: User;

  private importancia: Importancia = {
    importancia: "",
    user: this.user
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private route: Router, private _authService: AuthService, private _importanciaService: ImportanciaService) { 

    if(typeof this._authService.currentUser == "object"){
      this.user = this._authService.currentUser;
      this.importancia.user = this.user;
      if(typeof this.user?.id == "number"){
        this.user_id = this.user.id;
      }
    }

    this.miFormulario = this.fb.group({
      importancia: [this.importancia.importancia, [Validators.required]],
      user:[this.importancia.user]
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
    this._importanciaService.crearImportancia(this.miFormulario.value).subscribe(resp => {

      this._importanciaService.buscarImportanciasPorUser(this.user_id).subscribe(resp => {
        this.listadoImportancias= resp;
        this.miFormulario.get('importancia')!.setValue(null);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
    
  }
}
