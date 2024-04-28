import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(analytics: AngularFireAnalytics) {
    analytics.logEvent('app_open', {"component": "AppComponent"});
  }
}
