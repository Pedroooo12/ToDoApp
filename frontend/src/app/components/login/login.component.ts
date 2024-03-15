import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public miFormulario: FormGroup;

  formularioEnviado = false;

  public usuarioNoExiste: boolean = false;

  public usuarioErroneo: boolean = false;

  private user: User = {
    name: '',
    email: '',
    password: ''
  }

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private route: Router, private service: AuthService) { 
    this.miFormulario = this.fb.group({
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
    if(this.miFormulario.invalid){
      //va campo por campo y toca todo el formulario
      this.miFormulario.markAllAsTouched();
      return;

    }

    //Si es correcto el formulario
    this.service.logearse(this.miFormulario.value).subscribe(user => {
      console.log(user)
      localStorage.setItem('token', user.id!.toString());
      this.route.navigate(['auth/inicio']);
      //redirigir al inicio
    }, (error) => {

      if(error.status == 404){
        this.usuarioNoExiste = true;
        setTimeout(() => {
          this.usuarioNoExiste = false;
        }, 2000);
        this.miFormulario.reset();
      }

      if(error.status == 409){
        this.usuarioErroneo = true;
        setTimeout(() => {
          this.usuarioErroneo = false;
        }, 2000);
        this.miFormulario.patchValue({
          password: ""
        });
      }

      if(error.status != 409){
        console.log(error);
      }
      
    })
  }
}
