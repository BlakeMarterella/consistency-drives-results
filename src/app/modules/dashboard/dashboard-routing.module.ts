import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { HabitsComponent } from "./pages/habits/habits.component";
import { EntriesComponent } from "./pages/entries/entries.component";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "entries",
        component: EntriesComponent
    },
    {
        path: "habits",
        component: HabitsComponent
    },
    {
        path: "profile",
        component: ProfileComponent
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
export class DashboardRoutingModule { }