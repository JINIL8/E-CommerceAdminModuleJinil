import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { GaurdService } from './service/gaurd.service';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { AlbumListComponent } from './company/album-list/album-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [GaurdService], component: DashboardComponent },
  { path: 'edit-product/:id', canActivate: [GaurdService], component: AddProductComponent },
  { path: 'login', component: LoginComponent  },
  { path: 'register' , component: RegisterComponent},
  { path: 'add-product' , component: AddProductComponent},
  { path: 'product-list' , component: ProductListComponent},
  { path: 'company-form' , component: CompanyFormComponent},
  { path: 'edit-company-form/:id', canActivate: [GaurdService], component: CompanyFormComponent},
  { path: 'album-list' , component: AlbumListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  RegisterComponent,
  DashboardComponent,
  CompanyFormComponent,
  LoginComponent,
];
