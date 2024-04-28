import { NgModule } from '@angular/core';
import { HomeViewRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeViewRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
