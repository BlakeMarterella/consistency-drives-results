import { NgModule } from '@angular/core';
import { HomeViewRoutingModule } from './home-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    HomeViewRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
