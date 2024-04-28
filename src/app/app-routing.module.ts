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
import { environment } from "@environments/environment";
// import { DefaultLayout, AuthLayout } from "@core/layouts";

const routes: Routes = [
  {
    path: "",
    component: HomeLayoutComponent,
    loadChildren: () =>
      import("./modules/home/home.module").then(
        (m) => m.HomeModule
      ),
  },
//   {
//     path: environment.routes.policiesView.baseURL,
//     component: DefaultLayout,
//     loadChildren: () =>
//       import("./views/policies-view/policies-view.module").then((m) => m.PoliciesViewModule),
//   },
//   {
//     path: environment.routes.supportView.baseURL,
//     component: DefaultLayout,
//     loadChildren: () =>
//       import("./views/support-view/support-view.module").then((m) => m.SupportViewModule),
//   },
  // {
  //   path: environment.routes.authView.baseURL,
  //   component: AuthLayout,
  //   loadChildren: () =>
  //     import("./views/auth-view/auth-view.module").then((m) => m.AuthViewModule),
  // },
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
