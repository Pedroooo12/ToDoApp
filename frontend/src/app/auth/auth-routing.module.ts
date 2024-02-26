import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { PageComponent } from './page/page.component';
import { ListadoTareaComponent } from './page/tareas/listado-tarea/listado-tarea.component';
import { CrearTareaComponent } from './page/tareas/crear-tarea/crear-tarea.component';
import { VerUsuarioComponent } from './page/user/ver-usuario/ver-usuario.component';
import { NuevaPasswordComponent } from './page/user/nueva-password/nueva-password.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {

        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'crear-tarea',
        component: CrearTareaComponent
      },
      {
        path: 'listado-tareas',
        component: ListadoTareaComponent
      },
      {
        path: 'ver-usuario',
        component: VerUsuarioComponent
      },
      {
        path: 'cambiar-contraseña',
        component: NuevaPasswordComponent
      },
      {
        path: '**',
        redirectTo: 'inicio'
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
