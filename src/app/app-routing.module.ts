import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { GaurdService } from './service/gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [GaurdService], component: DashboardComponent },
  { path: 'login', canActivate: [GaurdService], component: LoginComponent  },
  { path: 'register' , canActivate: [GaurdService], component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  RegisterComponent,
  DashboardComponent,
  LoginComponent,
];
