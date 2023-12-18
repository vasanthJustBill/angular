import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  constructor(private http: HttpService) {}

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
