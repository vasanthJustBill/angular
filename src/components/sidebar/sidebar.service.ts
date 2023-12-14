import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  private _loader = new BehaviorSubject(false);
  constructor(private toastr: ToastrService) {}

  getIsLoading(): Observable<boolean> {
    return this._loader.asObservable();
  }

  setLoader(value: boolean) {
    this._loader.next(value);
  }

  showMessage(message: string, action: string, duration?: number): void {
    if (action === "success") {
      this.toastr.success(message);
    } else if (action === "error") {
      this.toastr.error(message);
    } else {
      this.toastr.warning(message);
    }
  }
}
