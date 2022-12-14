import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRootComponent } from './auth-root/auth-root.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [{
  path: '', component: AuthRootComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: '', redirectTo: 'login' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
