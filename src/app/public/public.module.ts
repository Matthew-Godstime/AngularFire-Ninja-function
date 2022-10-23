import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRootComponent } from './home-root/home-root.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    HomeRootComponent,
    HomePageComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
