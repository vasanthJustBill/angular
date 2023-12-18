import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { PartiesService } from "../parties.service";
import { SharedService } from "../../shared.service";

@Component({
  selector: "app-party-form",
  templateUrl: "./party-form.component.html",
  styleUrl: "./party-form.component.scss",
})
export class PartyFormComponent {
  title: string = "";
  newForm: boolean = true;
  buttonPlaceholder: string = "Create";
  partyForm: FormGroup = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    gstType: [null, Validators.required],
    gstin: [null, Validators.required],
    primaryContact: [null, this.shared.validateContact],
    alternateContact: [null, this.shared.validateContact],
    primaryEmail: [null, Validators.email],
    alternateEmail: [null, Validators.email],
    shippingAddress: [null],
    billingAddress: [null],
    companyId: [null],
    sameAsShipping: [null],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private httpService: PartiesService,
    private shared: SharedService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (_.has(params, "params.id")) {
        this.newForm = false;
        this.buttonPlaceholder = "Update";
        this.getParty(_.toInteger(_.get(params, "params.id")));
      }
      this.title = `${this.newForm ? "Create" : "Edit"} Party`;
    });
    this.shared.companyId.subscribe((id) => {
      this.partyForm.patchValue({
        companyId: id,
      });
    });
    this.partyForm.valueChanges.subscribe((newValues) => {
      const { sameAsShipping, shippingAddress } = newValues;
      if (sameAsShipping) {
        this.partyForm.get("billingAddress")?.disable();
        this.partyForm.get("billingAddress")?.setValue(shippingAddress);
      } else {
        this.partyForm.get("billingAddress")?.enable();
      }
    });
  }

  getParty(id: number) {
    this.httpService.getPartyById(id).subscribe((data) => {
      this.partyForm.patchValue(data.party);
      const { sameAsShipping } = this.partyForm.getRawValue();
      if (sameAsShipping) {
        this.partyForm.get("billingAddress")?.disable();
      }
    });
  }

  shippingCheckbox() {
    const { shippingAddress, sameAsShipping } = this.partyForm.getRawValue();
    if (sameAsShipping) {
      this.partyForm.get("billingAddress")?.disable();
      this.partyForm.patchValue({ billingAddress: shippingAddress });
    } else {
      this.partyForm.get("billingAddress")?.enable();
    }
  }

  createParty() {
    const party = this.shared.getRawValuesWithNull(
      this.partyForm.getRawValue()
    );
    this.httpService.createParty(party).subscribe(
      (data) => {
        this.shared.showMessage("Party created successfully.", "success");
        this.router.navigateByUrl(`/accounts/parties`);
      },
      (error) => {
        this.shared.showMessage(error.error.error, "error");
      }
    );
  }

  updateParty() {
    const party = this.shared.getRawValuesWithNull(
      this.partyForm.getRawValue()
    );
    this.httpService
      .updateParty(_.get(this.partyForm.getRawValue(), "id"), party)
      .subscribe(
        (data) => {
          this.shared.showMessage("Party updated successfully.", "success");
          this.router.navigateByUrl(`/accounts/parties`);
        },
        (error) => {
          this.shared.showMessage(error.error.error, "error");
        }
      );
  }

  onSubmit() {
    if (this.partyForm.valid) {
      if (this.newForm) {
        this.createParty();
      } else {
        this.updateParty();
      }
    } else {
      this.shared.showMessage("Please fill all the required fields.", "error");
    }
  }

  onCancel() {
    this.router.navigateByUrl(`/accounts/parties`);
  }
}
