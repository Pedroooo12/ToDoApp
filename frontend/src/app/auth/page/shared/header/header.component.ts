
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/auth/interfaces/menu';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public user!: User | undefined;
  public menu: Menu[] = [
    {
      title: 'Inicio',
      route: 'auth/inicio'
    },
    {
      title: 'Crear Tarea',
      route: 'auth/crear-tarea'
    },
    {
      title: 'Listado Tareas',
      route: 'auth/listado-tareas'
    }
  ];

  constructor(private route: Router, private service: AuthService){
    this.devolverUsuario();
  }

  logOut(){
    localStorage.clear();
    this.route.navigate(['/register']);
   
  }

  clickCrear(){
    const ul = document.getElementById("ul_crear");
    ul?.classList.toggle("invisible");
  }
  devolverUsuario(){
    this.user = this.service.currentUser;
  }
  
  mostrar(){
    const ul = document.getElementById("ul_crear");
    ul?.classList.toggle("invisible");
  }

}
