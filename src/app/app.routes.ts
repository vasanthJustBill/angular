import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "accounts",
    loadChildren: () =>
      import("./accounts/accounts.module").then((m) => m.AccountsModule),
  },
];
