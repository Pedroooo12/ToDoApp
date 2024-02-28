import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent {
  user!: User | undefined;

  user_id!: Number;
  constructor(private _authService: AuthService, private route: Router){
    this.user = this._authService.currentUser;

    if(typeof this.user?.id == "number"){
      this.user_id = this.user?.id;
    }
  }

  eliminarUser(){
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar el usuario?');
    if(confirmar){
      this._authService.eliminarUsuario(this.user_id).subscribe(user => {
        localStorage.clear();
        this.route.navigate(['/login']);
      }, (error) => {

      })

    }
  }
}
