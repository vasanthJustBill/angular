import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarModule } from "../components/sidebar/sidebar.module";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, SidebarModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {}
