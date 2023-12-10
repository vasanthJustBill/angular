import { Component } from "@angular/core";
import _ from "lodash";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SharedService } from "../shared.service";

@Component({
  selector: "app-parties",
  templateUrl: "./parties.component.html",
  styleUrl: "./parties.component.scss",
})
export class PartiesComponent {
  columnDefs = [
    {
      headerName: "Party Name",
      field: "name",
    },
    {
      headerName: "GST Type",
      field: "gstType",
    },
    {
      headerName: "GSTIN",
      field: "gstin",
      cellDataType: "number",
    },
    {
      headerName: "Phone Number",
      field: "contact",
      type: "number",
      cellDataType: "number",
    },
    {
      headerName: "Email ID",
      field: "email",
    },
    {
      headerName: "Address",
      field: "address",
    },
    {
      headerName: "State",
      field: "state",
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
      fileName: "Parties",
    },
  };

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sharedService: SharedService
  ) {}

  getRowData() {
    const rowData: any[] = [];
    for (const i of _.range(1, 1000)) {
      rowData.push({
        id: i,
        name: `Party ${i}`,
        gstType: "Regular",
        gstin: 123456789012345,
        contact: 1234567890,
        email: `party${i}@test.com`,
        address: `Address ${i}`,
        state: "State",
      });
    }
    this.rowData = rowData;
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
    this.sharedService.setSelectedParty(selectedRow);
    this.router.navigateByUrl(`/accounts/parties/edit/${id}`);
  }

  deleteButtonFn(selectedRow: any) {
    alert("Delete Button Clicked");
  }

  rowDoubleClickedFn(selectedRow: any) {
    const { id } = selectedRow;
    this.sharedService.setSelectedParty(selectedRow);
    this.router.navigateByUrl(`/accounts/parties/${id}`);
  }
}
