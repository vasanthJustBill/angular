import { Component, signal } from "@angular/core";
import { SidebarService } from "./sidebar.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  isSidenavOpen: boolean = true;
  loading: boolean = false;
  companyId: number | undefined;
  companyName: string | undefined;

  constructor(private httpService: SidebarService) {}

  ngOnInit() {
    this.isSidenavOpen = window.innerWidth > 900;
    this.fetchCompany();
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onMenuClick() {
    if (window.innerWidth <= 900) this.isSidenavOpen = false;
  }

  fetchCompany() {
    this.httpService.getCompany().subscribe((data) => {
      if (data && data.company) {
        const { id, name } = data.company;
        this.companyId = id;
        this.companyName = name;
      }
    });
  }
}
