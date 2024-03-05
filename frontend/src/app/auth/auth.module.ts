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
import { InicioComponent } from './page/components/inicio/inicio.component';
import { CardTareaComponent } from './page/components/tareas/card-tarea/card-tarea.component';
import { CrearTareaComponent } from './page/components/tareas/crear-tarea/crear-tarea.component';
import { ListadoTareaComponent } from './page/components/tareas/listado-tarea/listado-tarea.component';
import { NuevaPasswordComponent } from './page/components/user/nueva-password/nueva-password.component';
import { VerUsuarioComponent } from './page/components/user/ver-usuario/ver-usuario.component';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { ActualizarTareaComponent } from './page/components/tareas/actualizar-tarea/actualizar-tarea.component';
import { FiltradoTareaComponent } from './page/components/tareas/filtrado-tarea/filtrado-tarea.component';
import { ListadoEstadisticasComponent } from './page/estadisticas/listado-estadisticas/listado-estadisticas.component';
import { PorEstadoComponent } from './page/estadisticas/por-estado/por-estado.component';



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
    ActualizarTareaComponent,
    FiltradoTareaComponent,
    ListadoEstadisticasComponent,
    PorEstadoComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag
  ],
  exports: [
    HeaderComponent,
    InicioComponent,
    PageComponent,
    ListadoTareaComponent
  ]
})
export class AuthModule { }
