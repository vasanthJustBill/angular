import { Component } from "@angular/core";
import { SidebarService } from "./sidebar.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  isSidenavOpen: boolean = true;
  pageTitle: string = "";
  showAccounts = true;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.isSidenavOpen = window.innerWidth > 768;
    this.sidebarService.pageTitle$.subscribe((title) => {
      this.pageTitle = title;
    });
  }

  toggleAccounts() {
    this.showAccounts = !this.showAccounts;
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
