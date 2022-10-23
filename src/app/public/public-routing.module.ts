import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRootComponent } from './home-root/home-root.component';

const routes: Routes = [
  {
    path: '', component: HomeRootComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomePageComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
