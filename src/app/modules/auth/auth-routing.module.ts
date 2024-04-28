import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";

const routes: Routes = [
    {
        path: "register",
        component: SignUpComponent
    },
    {
        path: "sign-in",
        component: SignUpComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthViewRoutingModule { }