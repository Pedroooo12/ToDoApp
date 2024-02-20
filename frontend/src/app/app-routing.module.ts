import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'auth',
    canActivate: [canActivateGuard], //Anclamos la función del canActive
    canMatch: [canMatchGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
      path: '**',
      redirectTo: 'register'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
