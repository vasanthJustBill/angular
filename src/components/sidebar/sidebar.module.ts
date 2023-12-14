import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./sidebar.component";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { MenusComponent } from "./menus/menus.component";
import { TitleBarComponent } from "../title-bar/title-bar.component";
import { NgxLoadingModule } from "ngx-loading";
import { SidebarService } from "./sidebar.service";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [SidebarComponent, MenusComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    MatMenuModule,
    MatListModule,
    RouterModule,
    TitleBarComponent,
    NgxLoadingModule.forRoot({}),
    ToastrModule.forRoot(),
  ],
  providers: [SidebarService],
  exports: [SidebarComponent],
})
export class SidebarModule {}
