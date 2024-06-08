import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RegisterSuccessComponent } from './shared/components/register-success/register-success.component';

const routes: Routes = [
  {path: "", component: RegisterComponent},
  {path: "register", component: RegisterComponent}, 
  {path: "register-success", component: RegisterSuccessComponent}, 
  {path: "**", component: NotFoundComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:  PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
