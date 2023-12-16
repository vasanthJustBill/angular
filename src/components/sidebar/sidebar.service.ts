import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  constructor(private toastr: ToastrService, private http: HttpService) {}

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

  getCompany(): Observable<any> {
    return this.http.get("companies").pipe(
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
