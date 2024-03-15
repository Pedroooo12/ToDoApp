import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-nueva-password',
  templateUrl: './nueva-password.component.html',
  styleUrls: ['./nueva-password.component.css']
})
export class NuevaPasswordComponent {
  public miFormulario: FormGroup;

  formularioEnviado = false;

  private user_id!: number;

  private user!: User;

  //injectamos en el constructor 
  constructor(private fb: FormBuilder, private route: Router, private _authService: AuthService) { 

    if(typeof this._authService.currentUser == "object"){
      this.user = this._authService.currentUser;
      if(typeof this.user?.id == "number"){
        this.user_id = this.user.id;
      }
    }

    this.miFormulario = this.fb.group({
      password1: ["", [Validators.required]],
      password2: ["", [Validators.required]],
    })
  }

  confirmarPassword(arg: string): { [key: string]: boolean } | null {
    const control = this.miFormulario.controls[arg];
  
    if (!control.value || !control.touched) {
      return null; // Manejar el caso en que el valor es null
    }
  
    const password1 = this.miFormulario.controls['password1']!.value;
    const password2 = control.value;
  
    if (password1 !== password2 && password1.length > 0) {
      return { 'passwordMismatch': true };
    }

  
    return null;
  }

  longitudPassword1(): number {
    return this.miFormulario.get('password1')!.value.length;
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
    console.log("true");
    //Si es correcto el formulario
    this.user.password = this.miFormulario.get('password1')!.value;
    this._authService.cambiarPassword(this.user_id,this.user).subscribe(user => {
      console.log(user);
      this.route.navigate(['/login']);
      //redirigir al inicio
    }, (error) => {
      console.log(error);
    })
  }
}
