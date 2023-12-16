import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ColDef } from "ag-grid-community";
import * as _ from "lodash";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrl: "./grid.component.scss",
})
export class GridComponent {
  @Input() columnDefs: ColDef[] = [];
  @Input() rowData: any[] = [];
  @Input() config: any = {};

  @Output() gridReady = new EventEmitter<any>();
  @Output() addButtonFn = new EventEmitter<any>();
  @Output() editButtonFn = new EventEmitter<any>();
  @Output() deleteButtonFn = new EventEmitter<any>();
  @Output() rowDoubleClickedFn = new EventEmitter<any>();

  gridApi: any;
  gridColumnApi: any;
  defaultColDef: ColDef<any, any> = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    editable: false,
    sortable: true,
    minWidth: 150,
  };
  colDefs: ColDef[] = [];
  addDisabled: boolean = false;
  editDisabled: boolean = true;
  deleteDisabled: boolean = true;

  constructor() {}

  ngOnInit() {
    if (this.config.checkboxSelection) {
      this.columnDefs.unshift({
        headerName: "",
        field: "checkbox-selection",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        sortable: false,
        editable: false,
        filter: false,
        floatingFilter: false,
        width: 70,
        maxWidth: 70,
        pinned: "left",
      });
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();

    this.gridReady.emit(params);
  }

  onRowSelected(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    this.addDisabled = !_.isEmpty(selectedRows);
    this.editDisabled = _.size(selectedRows) !== 1;
    this.deleteDisabled = _.size(selectedRows) !== 1;
  }

  onRowDoubleClicked(event: any) {
    this.rowDoubleClickedFn.emit(event.data);
  }

  addRow() {
    this.addButtonFn.emit();
  }

  editRow() {
    const selectedRows = _.first(this.gridApi.getSelectedRows());
    this.editButtonFn.emit(selectedRows);
  }

  deleteRow() {
    const selectedRows = _.first(this.gridApi.getSelectedRows());
    this.deleteButtonFn.emit(selectedRows);
  }

  exportGrid() {
    const visibleColumns = this.gridColumnApi.getAllDisplayedColumns();
    const excludedColumns = ["checkbox-selection"];

    const filteredColumns = visibleColumns.filter(
      (column: { colId: string }) => !excludedColumns.includes(column.colId)
    );

    const exportParams = {
      columnKeys: filteredColumns.map((column: { colId: any }) => column.colId),
    };

    this.gridApi.exportDataAsCsv(exportParams);
  }
}
