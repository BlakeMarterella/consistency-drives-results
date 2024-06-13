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
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from "@angular/fire/compat/analytics";

// Layouts
import { AuthLayoutComponent, HomeLayoutComponent } from "./layouts";

// Components
import { PageNotFoundComponent, FooterComponent, NavbarControllerComponent, MobileNavbarComponent, DesktopNavbarComponent } from './components';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    HomeLayoutComponent,
    FooterComponent,
    NavbarControllerComponent,
    MobileNavbarComponent,
    DesktopNavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    RouterModule,
  ],
  exports: [
    AngularFireAnalyticsModule,
    HomeLayoutComponent,
    AuthLayoutComponent
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