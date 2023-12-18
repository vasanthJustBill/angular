import { Component } from "@angular/core";
import { SidebarService } from "./sidebar.service";
import { SharedService } from "../../app/shared.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  isSidenavOpen: boolean = true;
  loading: boolean = false;
  companyName: string = "JuzBill";

  constructor(
    private httpService: SidebarService,
    private shared: SharedService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isSidenavOpen = window.innerWidth > 900;
    this.fetchCompany();
    this.shared.companyName.subscribe((name) => {
      if (name) this.companyName = name;
    });
    this.shared.loader.subscribe((value) => {
      this.loading = value;
    });
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  onMenuClick() {
    if (window.innerWidth <= 900) this.isSidenavOpen = false;
  }

  fetchCompany() {
    this.httpService.getCompany().subscribe(
      (data) => {
        if (data && data.company) {
          const { id, name } = data.company;
          this.companyName = name;
          this.shared.companyId = id;
        }
      },
      (error) => {
        this.shared.showMessage("Create Company Details first", "warning");
        this.router.navigateByUrl("/companies");
      }
    );
  }
}
