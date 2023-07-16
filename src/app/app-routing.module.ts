import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import("./pages/main/main.module").then(m => m.MainModule), canActivate: [AuthGuard()] },
  { path: 'signin', loadChildren: () => import("./pages/signin/signin.module").then(m => m.SigninModule) },
  { path: 'signup', loadChildren: () => import("./pages/signup/signup.module").then(m => m.SignupModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }