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
import { ListadoEstadisticasComponent } from './page/components/estadisticas/listado-estadisticas/listado-estadisticas.component';
import { PorEstadoComponent } from './page/components/estadisticas/por-estado/por-estado.component';
import { PorFinalizadasComponent } from './page/components/estadisticas/por-finalizadas/por-finalizadas.component';
import { BuscadorTareaComponent } from './page/components/tareas/buscador-tarea/buscador-tarea.component';
import { ModalTareaComponent } from './page/components/tareas/modal-tarea/modal-tarea.component';
import { PorFechaComponent } from './page/components/estadisticas/por-fecha/por-fecha.component';
import { ModalConfirmacionComponent } from './page/components/tareas/modal-confirmacion/modal-confirmacion.component';
import { CambiarOrdenComponent } from './page/components/tareas/cambiar-orden/cambiar-orden.component';
import { AlertasTareasComponent } from './page/components/tareas/alertas-tareas/alertas-tareas.component';
import { CalendarioComponent } from './page/components/calendario/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AlertaCategoriaComponent } from './page/components/categoria/alerta-categoria/alerta-categoria.component';




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
    PorFinalizadasComponent,
    BuscadorTareaComponent,
    ModalTareaComponent,
    PorFechaComponent,
    ModalConfirmacionComponent,
    CambiarOrdenComponent,
    AlertasTareasComponent,
    CalendarioComponent,
    AlertaCategoriaComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    FullCalendarModule
  ],
  exports: [
    HeaderComponent,
    InicioComponent,
    PageComponent,
    ListadoTareaComponent
  ]
})
export class AuthModule { }
