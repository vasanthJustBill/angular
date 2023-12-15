import { Component, EventEmitter, Output } from "@angular/core";
import * as _ from "lodash";
import { SidebarService } from "../sidebar.service";

interface Menu {
  id: number;
  title: string;
  sequence: number;
  link?: string;
  isShowing?: boolean;
  subMenus?: Menu[];
}

@Component({
  selector: "menus",
  templateUrl: "./menus.component.html",
  styleUrl: "./menus.component.scss",
})
export class MenusComponent {
  @Output() menuClicked = new EventEmitter(false);
  menusList: Menu[] | undefined;

  constructor(private httpService: SidebarService) {}

  ngOnInit() {
    this.httpService.getMenuss().subscribe((data) => {
      data.forEach((element: Menu) => {
        if (element.subMenus?.length) {
          element.subMenus = _.orderBy(element.subMenus, "sequence");
        }
      });
      this.menusList = data;
    });
  }

  toggleMenus(menu: Menu) {
    menu.isShowing = !menu.isShowing;
  }

  onMenuClick() {
    this.menuClicked.emit(true);
  }
}
