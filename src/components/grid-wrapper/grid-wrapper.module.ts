import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridModule } from "ag-grid-angular";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { GridComponent } from "./grid/grid.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    AgGridModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [GridComponent],
})
export class GridWrapperModule {}
