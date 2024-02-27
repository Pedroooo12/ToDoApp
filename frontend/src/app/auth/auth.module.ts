import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HeaderComponent } from './page/header/header.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { CardTareaComponent } from './page/tareas/card-tarea/card-tarea.component';
import { ListadoTareaComponent } from './page/tareas/listado-tarea/listado-tarea.component';
import { CrearTareaComponent } from './page/tareas/crear-tarea/crear-tarea.component';
import { VerUsuarioComponent } from './page/user/ver-usuario/ver-usuario.component';
import { NuevaPasswordComponent } from './page/user/nueva-password/nueva-password.component';
import { CrearCategoriaComponent } from './page/categoria/crear-categoria/crear-categoria.component';
import { ListadoCategoriaComponent } from './page/categoria/listado-categoria/listado-categoria.component';
import { ActualizarCategoriaComponent } from './page/categoria/actualizar-categoria/actualizar-categoria.component';


@NgModule({
  declarations: [
    HeaderComponent,
    InicioComponent,
    PageComponent,
    CardTareaComponent,
    ListadoTareaComponent,
    CrearTareaComponent,
    VerUsuarioComponent,
    NuevaPasswordComponent,
    CrearCategoriaComponent,
    ListadoCategoriaComponent,
    ActualizarCategoriaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    InicioComponent,
    PageComponent,
    ListadoTareaComponent
  ]
})
export class AuthModule { }
