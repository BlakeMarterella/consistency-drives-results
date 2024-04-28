import { NgModule } from '@angular/core';
import { AuthViewRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    AuthViewRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
