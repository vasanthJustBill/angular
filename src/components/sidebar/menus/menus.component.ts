import { Component, EventEmitter, Output } from "@angular/core";
import * as _ from "lodash";

interface Menu {
  id: number;
  title: string;
  link?: string;
  isShowing?: boolean;
  sub_menus?: Menu[];
}

@Component({
  selector: "menus",
  templateUrl: "./menus.component.html",
  styleUrl: "./menus.component.scss",
})
export class MenusComponent {
  @Output() menuClicked = new EventEmitter(false);
  menusList: Menu[] = [
    {
      id: 1,
      title: "Dashboard",
      link: "/",
    },
    {
      id: 2,
      title: "Administration",
      isShowing: false,
      sub_menus: [
        {
          id: 3,
          title: "Mapping",
          link: "mapping",
        },
        {
          id: 4,
          title: "Bulk Uploads",
          link: "uploads",
        },
        {
          id: 5,
          title: "Custom Fields",
          link: "custom_fields",
        },
      ],
    },
    {
      id: 6,
      title: "Parties",
      link: "/accounts/parties",
    },
    {
      id: 7,
      title: "Suppliers",
      link: "accounts/suppliers",
    },
    {
      id: 8,
      title: "Invoices",
      link: "invoices",
    },
    {
      id: 9,
      title: "Products",
      link: "products",
    },
    {
      id: 10,
      title: "Settings",
      link: "settings",
    },
  ];

  toggleMenus(menu: Menu) {
    menu.isShowing = !menu.isShowing;
  }

  onMenuClick() {
    this.menuClicked.emit(true);
  }
}
