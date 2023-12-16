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
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { SidebarService } from "../../components/sidebar/sidebar.service";
import * as _ from "lodash";

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
    MatCheckboxModule,
    SidebarModule,
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
    sameAsShipping: [""],
  });
  buttonPlaceHolder: string = "Create";
  editMode: boolean = false;

  constructor(
    private httpService: CompaniesService,
    private fb: FormBuilder,
    private sidebar: SidebarService
  ) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.httpService.getCompany().subscribe(
      (data) => {
        if (data && data.company) {
          this.companyForm.patchValue(data.company);
          this.buttonPlaceHolder = "Update";
          const { sameAsShipping } = this.companyForm.getRawValue();
          if (sameAsShipping) {
            this.companyForm.get("billingAddress")?.disable();
          }
        }
      },
      (_error) => {}
    );
  }

  onReset() {
    this.fetchCompanies();
  }

  onSubmit() {
    const { billingAddress, shippingAddress } = this.companyForm.getRawValue();
    if (_.isEqual(billingAddress, shippingAddress)) {
      this.companyForm.patchValue({ sameAsShipping: true });
    }
    this.httpService.createCompany(this.companyForm.getRawValue()).subscribe(
      (_data) => {
        this.fetchCompanies();
        this.sidebar.showMessage(
          `Company ${_.lowerCase(this.buttonPlaceHolder)}d successfully.`,
          "success"
        );
      },
      (error) => {}
    );
  }

  shippingCheckbox() {
    const { shippingAddress, sameAsShipping } = this.companyForm.getRawValue();
    if (sameAsShipping) {
      this.companyForm.get("billingAddress")?.disable();
      this.companyForm.patchValue({ billingAddress: shippingAddress });
    } else {
      this.companyForm.get("billingAddress")?.enable();
    }
  }
}
