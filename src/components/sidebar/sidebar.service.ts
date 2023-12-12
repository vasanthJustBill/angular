import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  constructor() {}

  private _pageTitle = new BehaviorSubject("");

  get pageTitle$(): Observable<string> {
    return this._pageTitle.asObservable();
  }

  setPageTitle(value: string) {
    this._pageTitle.next(value);
  }
}
