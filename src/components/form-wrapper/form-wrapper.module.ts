import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormWrapperComponent } from "./form-wrapper/form-wrapper.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [FormWrapperComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports: [FormWrapperComponent],
})
export class FormWrapperModule {}
