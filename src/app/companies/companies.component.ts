import { Component } from "@angular/core";
import { CompaniesService } from "./companies.service";
import { HttpModule } from "../../components/http/http.module";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TitleBarComponent } from "../../components/title-bar/title-bar.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCheckboxModule} from '@angular/material/checkbox';

// Custom validator function for a valid contact number
function validateContact(
  control: AbstractControl
): { [key: string]: any } | null {
  const isValid = /^\d{10}$/.test(control.value);
  return isValid ? null : { invalidContact: { value: control.value } };
}

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [
    HttpModule,
    TitleBarComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCheckboxModule,
  ],
  providers: [CompaniesService],
  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.scss",
})
export class CompaniesComponent {
  companyForm: FormGroup = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    description: [""],
    shippingAddress: [""],
    billingAddress: [""],
    primaryContact: ["", [Validators.required, validateContact]],
    alternateContact: ["", validateContact],
    primaryEmail: ["", [Validators.required, Validators.email]],
    alternateEmail: ["", Validators.email],
    businessType: ["", Validators.required],
    website: [""],
    gstType: ["", Validators.required],
    gstin: ["", Validators.required],
  });

  constructor(private httpService: CompaniesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.httpService.getCompany().subscribe((data) => {
      if (data) this.companyForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      this.httpService
        .createCompany(this.companyForm.getRawValue())
        .subscribe((data) => {
          this.fetchCompanies();
        });
    }
  }
}
