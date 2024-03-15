import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRegister } from 'src/app/interfaces/userRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public miFormulario: FormGroup;

  public userRegistrado: boolean = false;

  public correoUsado: boolean = false;

  formularioEnviado = false;

  private user: UserRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private route: Router, private service: AuthService) { 
    this.miFormulario = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    })
  }


  validacion(arg:string){
    return this.miFormulario.controls[`${arg}`].hasError('required') && this.miFormulario.controls[`${arg}`].touched;
  }

  enviar(){
    //archivo.ts
    this.formularioEnviado = true;
    console.log("Enviar");
    if(this.miFormulario.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormulario.markAllAsTouched();
      return;

    }

    //Si es correcto el formulario
    this.service.registrarse(this.miFormulario.value).subscribe(resp => {
      console.log(resp);
      this.userRegistrado = true;
        setTimeout(() => {
          this.userRegistrado = false;
        }, 2000);
        this.miFormulario.reset();
    }, (error) => {
      console.log(error);

      if(error.status == 409){
        this.correoUsado = true;
        setTimeout(() => {
          this.correoUsado = false;
        }, 2000);
        this.miFormulario.patchValue({
          email: ""
        });
      }
    })

    console.log(this.miFormulario.value);
  }
}
