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


@NgModule({
  declarations: [
    HeaderComponent,
    InicioComponent,
    PageComponent,
    CardTareaComponent,
    ListadoTareaComponent,
    CrearTareaComponent,
    VerUsuarioComponent,
    NuevaPasswordComponent
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
