import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { AccountsRoutingModule } from "./accounts-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PartyFormComponent } from "./party-form/party-form.component";
import { PartiesComponent } from "./parties/parties.component";
import { GridWrapperModule } from "../../components/grid-wrapper/grid-wrapper.module";
import { TitleBarComponent } from "../../components/title-bar/title-bar.component";
import { PartiesService } from "./parties.service";
import { HttpModule } from "../../components/http/http.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";

@NgModule({
  declarations: [PartyFormComponent, PartiesComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    GridWrapperModule,
    TitleBarComponent,
    HttpModule,
    SidebarModule,
  ],
  providers: [PartiesService],
})
export class AccountsModule {}
