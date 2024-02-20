import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { PageComponent } from './page/page.component';

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
