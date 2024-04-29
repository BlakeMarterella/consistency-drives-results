import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';
import { LoadingIconComponent } from './components/loading-icon/loading-icon.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    LoadingIconComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AngularFireDatabaseModule
  ],
  exports: [
    FontAwesomeModule,
    CommonModule,
    LoadingIconComponent,
    ModalComponent
  ],
  providers: [
    AuthService,
    ModalService
  ]
})
export class SharedModule { }
