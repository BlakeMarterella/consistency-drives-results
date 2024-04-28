import { NgModule } from '@angular/core';
import { AuthViewRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    AuthViewRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
