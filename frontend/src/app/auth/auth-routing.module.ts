import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { PageComponent } from './page/page.component';
import { ListadoTareaComponent } from './page/tareas/listado-tarea/listado-tarea.component';
import { CrearTareaComponent } from './page/tareas/crear-tarea/crear-tarea.component';
import { VerUsuarioComponent } from './page/user/ver-usuario/ver-usuario.component';
import { NuevaPasswordComponent } from './page/user/nueva-password/nueva-password.component';
import { CrearCategoriaComponent } from './page/categoria/crear-categoria/crear-categoria.component';
import { ActualizarCategoriaComponent } from './page/categoria/actualizar-categoria/actualizar-categoria.component';
import { ActualizarImportanciaComponent } from './page/importancia/actualizar-importancia/actualizar-importancia.component';
import { CrearImportanciaComponent } from './page/importancia/crear-importancia/crear-importancia.component';

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
        path: 'crear-categoria',
        component: CrearCategoriaComponent
      },
      {
        path: 'actualizar-categoria/:id',
        component: ActualizarCategoriaComponent

      },
      {
        path: 'crear-importancia',
        component: CrearImportanciaComponent
      },
      {
        path: 'actualizar-importancia/:id',
        component: ActualizarImportanciaComponent

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
