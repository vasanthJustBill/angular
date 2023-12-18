import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as _ from "lodash";

interface RowField {
  key: string;
  label: string;
  type: "string" | "text" | "checkbox" | "blank" | "number" | "email";
}

@Component({
  selector: "form-wrapper",
  templateUrl: "./form-wrapper.component.html",
  styleUrl: "./form-wrapper.component.scss",
})
export class FormWrapperComponent {
  @Input() formGroup!: FormGroup;

  rowFields: RowField[][] = [
    [
      {
        key: "name",
        label: "Name",
        type: "string",
      },
    ],
    [
      {
        key: "gstType",
        label: "GST Type",
        type: "string",
      },
      {
        key: "gstin",
        label: "GSTIN",
        type: "string",
      },
    ],
    [
      {
        key: "shippingAddress",
        label: "Shipping Address",
        type: "text",
      },
      {
        key: "billingAddress",
        label: "Billing Address",
        type: "text",
      },
    ],
    [
      {
        type: "blank",
        key: "",
        label: "",
      },
      {
        key: "sameAsShipping",
        label: "Same as shipping address",
        type: "checkbox",
      },
    ],
    [
      {
        key: "primaryContact",
        label: "Contact",
        type: "number",
      },
      {
        key: "alternateContact",
        label: "Alternate Contact",
        type: "number",
      },
    ],
    [
      {
        key: "primaryEmail",
        label: "Email",
        type: "email",
      },
      {
        key: "alternateEmail",
        label: "Alternate Email",
        type: "email",
      },
    ],
  ];
}
