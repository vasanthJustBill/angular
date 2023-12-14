import { Component } from "@angular/core";
import { SidebarService } from "./sidebar.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  isSidenavOpen: boolean = true;
  loading: boolean = false;

  constructor(private httpService: SidebarService) {}

  ngOnInit() {
    this.isSidenavOpen = window.innerWidth > 768;
    this.httpService.getIsLoading().subscribe(data => {
      this.loading = data;
    })
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onMenuClick() {
    if (window.innerWidth <= 768) this.isSidenavOpen = false;
    this.httpService.setLoader(false);
  }
}
