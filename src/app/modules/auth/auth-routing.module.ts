import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";

const routes: Routes = [
    {
        path: "sign-in",
        component: SignInComponent 
    },
    {
        path: "register",
        component: SignUpComponent
    },
    { path: "", pathMatch: "full", redirectTo: "sign-in" },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthViewRoutingModule { }