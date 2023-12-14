import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "accounts",
    loadChildren: () =>
      import("./accounts/accounts.module").then((m) => m.AccountsModule),
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];
