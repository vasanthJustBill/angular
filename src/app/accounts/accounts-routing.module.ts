import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartiesComponent } from './parties/parties.component';
import { PartyFormComponent } from './party-form/party-form.component';

const routes: Routes = [
  {
    path: "parties",
    component: PartiesComponent,
  },
  {
    path: "parties/new",
    component: PartyFormComponent,
  },
  {
    path: "parties/:id",
    component: PartyFormComponent,
  },
  {
    path: "parties/edit/:id",
    component: PartyFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
