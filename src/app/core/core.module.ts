// Angular imports
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { environment } from "@environments/environment";

// Guards
import { EnsureModuleLoadedOnceGuard } from "./guards/ensure-module-loaded-once.guard";

// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from "@angular/fire/compat/analytics";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAnalyticsModule,
    RouterModule,
  ],
  exports: [
    AngularFireAnalyticsModule
  ],
  providers: [
    ScreenTrackingService, 
    UserTrackingService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Use the EnsureModuleLoadedOnceGuard constructor to check that the core module was not imported outside of root
    super(parentModule);
  }
}