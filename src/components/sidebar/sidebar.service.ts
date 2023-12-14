import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  private _loader = new BehaviorSubject(false);
  constructor() {}

  getIsLoading(): Observable<boolean> {
    return this._loader.asObservable();
  }

  setLoader(value: boolean) {
    this._loader.next(value);
  }

  showMessage(
    message: string,
    action?: string,
    duration?: number
  ): void {
  }
}
