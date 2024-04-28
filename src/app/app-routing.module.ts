import { Injectable, NgModule } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
  Routes,
  RouterModule,
  TitleStrategy,
  RouterStateSnapshot,
} from "@angular/router";
import { PageNotFoundComponent } from "@core/components";
import { HomeLayoutComponent, AuthLayoutComponent } from "@core/layouts";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";

import { environment } from "@environments/environment";

const routes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    loadChildren: () =>
      import("./modules/home/home.module").then(
        (m) => m.HomeModule
      ),
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./modules/auth/auth.module").then(
        (m) => m.HomeModule
      ),
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  { path: "", pathMatch: "full", redirectTo: "/" },
  { path: "**", title: "404", component: PageNotFoundComponent },
];

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Consistency | ${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top"})],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }],
})
export class AppRoutingModule {}
