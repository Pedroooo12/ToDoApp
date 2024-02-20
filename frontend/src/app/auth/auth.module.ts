import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HeaderComponent } from './page/header/header.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    InicioComponent,
    PageComponent
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
    PageComponent
  ]
})
export class AuthModule { }
