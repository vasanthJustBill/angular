import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  private _loader = new BehaviorSubject(false);
  constructor(private toastr: ToastrService, private http: HttpService) {}

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

  getMenuss(): Observable<any> {
    return this.http.get("menus").pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  // Generic error handler
  private handleError(error: any): Observable<never> {
    console.error("An error occurred:", error);
    throw error;
  }
}
