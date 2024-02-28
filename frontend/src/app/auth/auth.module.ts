import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';
import { HeaderComponent } from './page/shared/header/header.component';
import { ActualizarCategoriaComponent } from './page/components/categoria/actualizar-categoria/actualizar-categoria.component';
import { CrearCategoriaComponent } from './page/components/categoria/crear-categoria/crear-categoria.component';
import { ListadoCategoriaComponent } from './page/components/categoria/listado-categoria/listado-categoria.component';
import { ActualizarImportanciaComponent } from './page/components/importancia/actualizar-importancia/actualizar-importancia.component';
import { CrearImportanciaComponent } from './page/components/importancia/crear-importancia/crear-importancia.component';
import { ListadoImportanciaComponent } from './page/components/importancia/listado-importancia/listado-importancia.component';
import { InicioComponent } from './page/components/inicio/inicio.component';
import { CardTareaComponent } from './page/components/tareas/card-tarea/card-tarea.component';
import { CrearTareaComponent } from './page/components/tareas/crear-tarea/crear-tarea.component';
import { ListadoTareaComponent } from './page/components/tareas/listado-tarea/listado-tarea.component';
import { NuevaPasswordComponent } from './page/components/user/nueva-password/nueva-password.component';
import { VerUsuarioComponent } from './page/components/user/ver-usuario/ver-usuario.component';



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
    ActualizarCategoriaComponent,
    CrearImportanciaComponent,
    ListadoImportanciaComponent,
    ActualizarImportanciaComponent,
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
