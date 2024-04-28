import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';
import { LoadingIconComponent } from './components/loading-icon/loading-icon.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    LoadingIconComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AngularFireDatabaseModule
  ],
  exports: [
    FontAwesomeModule,
    CommonModule,
    LoadingIconComponent
  ],
  providers: [
    AuthService
  ]
})
export class SharedModule { }
