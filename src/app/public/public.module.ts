import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRootComponent } from './home-root/home-root.component';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../components/modal/modal.component';
import { ToggleDirective } from './toggle.directive';


@NgModule({
  declarations: [
    HomeRootComponent,
    HomePageComponent,
    CardComponent,
    ModalComponent,
    ToggleDirective,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
