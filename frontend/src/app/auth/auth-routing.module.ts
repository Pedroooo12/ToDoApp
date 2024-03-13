import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/components/inicio/inicio.component';
import { PageComponent } from './page/page.component';
import { ListadoTareaComponent } from './page/components/tareas/listado-tarea/listado-tarea.component';
import { VerUsuarioComponent } from './page/components/user/ver-usuario/ver-usuario.component';
import { NuevaPasswordComponent } from './page/components/user/nueva-password/nueva-password.component';
import { ActualizarCategoriaComponent } from './page/components/categoria/actualizar-categoria/actualizar-categoria.component';

import { CrearTareaComponent } from './page/components/tareas/crear-tarea/crear-tarea.component';
import { ActualizarTareaComponent } from './page/components/tareas/actualizar-tarea/actualizar-tarea.component';
import { CrearCategoriaComponent } from './page/components/categoria/crear-categoria/crear-categoria.component';
import { ListadoEstadisticasComponent } from './page/components/estadisticas/listado-estadisticas/listado-estadisticas.component';
import { CalendarioComponent } from './page/components/calendario/calendario/calendario.component';



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
        path: 'calendario',
        component: CalendarioComponent
      },
      {
        path: 'crear-tarea/:id_estado',
        component: CrearTareaComponent
      },
      {
        path: 'actualizar-tarea/:id',
        component: ActualizarTareaComponent
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
        path: 'actualizar-categoria/:id',
        component: ActualizarCategoriaComponent

      },
      {
        path: 'crear-categoria',
        component: CrearCategoriaComponent
      },
      {
        path: 'listado-estadisticas',
        component: ListadoEstadisticasComponent
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
