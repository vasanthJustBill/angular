import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { PartiesService } from "../parties.service";
import { SidebarService } from "../../../components/sidebar/sidebar.service";

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
    id: [""],
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
    private httpService: PartiesService,
    private sidebar: SidebarService
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
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.getParty(id);
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl("/accounts/parties");
  }

  getParty(id: number) {
    this.httpService.getPartyById(id).subscribe((data) => {
      this.partyForm.patchValue(data.party);
    });
  }

  createParty() {
    this.sidebar.setLoader(true);
    const party = this.partyForm.getRawValue();
    this.httpService.createParty(party).subscribe(
      (data) => {
        this.sidebar.setLoader(false);
        const { id } = data.party;
        this.router.navigateByUrl(`/accounts/parties/${id}`);
      },
      (error) => {
        this.sidebar.setLoader(false);
        this.sidebar.showMessage(error.error.error, "error");
      }
    );
  }

  updateParty() {
    const party = this.partyForm.getRawValue();
    this.httpService.updateParty(party.id, party).subscribe((data) => {
      this.editMode = false;
      this.partyForm.disable();
    });
  }

  onSubmit() {
    if (this.newForm) {
      this.createParty();
    } else if (this.editMode) {
      this.updateParty();
    } else {
      this.partyForm.enable();
      this.editMode = true;
      this.saveButtonMessage = "Save";
      this.title = "Edit Party";
    }
  }
}
