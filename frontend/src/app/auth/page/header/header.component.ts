
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Menu } from '../../interfaces/menu';

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
      route: 'inicio'
    },
    {
      title: 'Listado Rutina',
      route: 'auth/listado-rutina'
    },
    {
      title: 'Crear Rutina',
      route: 'auth/crear-rutina'
    }
  ];

  constructor(private route: Router, private service: AuthService){
    this.devolverUsuario();
  }

  logOut(){
    this.service.logOut().subscribe(resp => {
      localStorage.clear();
      this.route.navigate(['/register']);
    }, (error) => {

    });
   
  }

  devolverUsuario(){
    this.user = this.service.currentUser;
  }
  
}
