import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    // {
    //     path: environment.routes.homeView.pricingPage,
    //     loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule)
    // }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeViewRoutingModule { }