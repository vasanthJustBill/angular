import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { SharedService } from "../shared.service";

@Component({
  selector: "app-party-form",
  templateUrl: "./party-form.component.html",
  styleUrl: "./party-form.component.scss",
})
export class PartyFormComponent {
  title: string = "";
  newForm: boolean | undefined;
  editMode: boolean | undefined;
  saveButtonMessage: string = "Create";
  partyForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    gstType: [""],
    gstin: [""],
    contact: [""],
    email: ["", Validators.email],
    address: [""],
    state: [""],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((url) => {
      const path = _.map(url, "path");
      this.newForm = _.includes(path, "new");
      this.editMode = _.includes(path, "edit");

      if (this.newForm) {
        this.saveButtonMessage = "Create";
        this.title = "Create Party";
      } else if (this.editMode) {
        this.saveButtonMessage = "Save";
        this.title = "Edit Party";
      } else {
        this.partyForm.disable();
        this.saveButtonMessage = "Edit";
        this.title = "Show Party";
      }
    });
    this.sharedService.getSelectedParty().subscribe((party) => {
      this.partyForm.patchValue(party);
    });
  }

  onCancel() {
    this.router.navigateByUrl("/accounts/parties");
  }

  onSubmit() {
    if (this.newForm) {
      console.log("Create new party");
    } else if (this.editMode) {
      console.log("Save party");
    } else {
      this.partyForm.enable();
      this.editMode = true;
      this.saveButtonMessage = "Save";
      this.title = "Edit Party";
    }
  }
}
