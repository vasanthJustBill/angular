import { Component } from "@angular/core";
import _ from "lodash";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { PartiesService } from "../parties.service";

@Component({
  selector: "app-parties",
  templateUrl: "./parties.component.html",
  styleUrl: "./parties.component.scss",
})
export class PartiesComponent {
  title: string = "Parties";
  columnDefs = [
    {
      headerName: "Party Name",
      field: "name",
    },
    {
      headerName: "GST Type",
      field: "gstType",
      cellRenderer: this.gstTypeRenderer,
    },
    {
      headerName: "GSTIN",
      field: "gstin",
      cellDataType: "number",
    },
    {
      headerName: "Phone Number",
      field: "primaryContact",
      type: "number",
      cellDataType: "number",
    },
    {
      headerName: "Alternate Number",
      field: "alternateContact",
      type: "number",
      cellDataType: "number",
    },
    {
      headerName: "Email ID",
      field: "primaryEmail",
    },
    {
      headerName: "Alternate Email ID",
      field: "alternateEmail",
    },
    {
      headerName: "Shipping Address",
      field: "shippingAddress",
    },
    {
      headerName: "Billing Address",
      field: "billingAddress",
    },
  ];
  rowData: any[] = [];
  gridApi: any;
  config: any = {
    topBar: true,
    addButton: true,
    editButton: true,
    deleteButton: true,
    exportButton: true,
    checkboxSelection: true,
    pagination: true,
    defaultCsvExportParams: {
      fileName: "parties",
    },
  };

  gstTypeRenderer(params: { value: "one" | "two" }) {
    const dropdown = {
      one: "Regular",
      two: "Business",
    };

    return dropdown[params.value];
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private httpService: PartiesService
  ) {}

  getRowData() {
    this.httpService.getAllParties().subscribe((data) => {
      this.rowData = data.parties;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();

    this.getRowData();
  }

  addButtonFn() {
    this.router.navigateByUrl("/accounts/parties/new");
  }

  editButtonFn(selectedRow: any) {
    const { id } = selectedRow;
    this.router.navigateByUrl(`/accounts/parties/edit/${id}`);
  }

  deleteButtonFn(selectedRow: any) {
    alert("Delete Button Clicked");
  }

  rowDoubleClickedFn(selectedRow: any) {
    const { id } = selectedRow;
    this.router.navigateByUrl(`/accounts/parties/${id}`);
  }
}
