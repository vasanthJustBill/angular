import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { SidebarModule } from "../components/sidebar/sidebar.module";
import { HttpService } from "../components/http/http.service";
import { HttpModule } from "../components/http/http.module";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarModule, HttpModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "juzBill";

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.get("companies").subscribe(data => {

    }, error => {

    })
  }
}
