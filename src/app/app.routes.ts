import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "../components/page-not-found/page-not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CompaniesComponent } from "./companies/companies.component";

export const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "companies",
    component: CompaniesComponent,
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
