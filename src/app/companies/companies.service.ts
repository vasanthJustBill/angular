import { Injectable } from "@angular/core";
import { HttpService } from "../../components/http/http.service";
import { Observable, catchError, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CompaniesService {
  constructor(private http: HttpService) {}

  getCompany(): Observable<any> {
    return this.http.get("companies").pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  createCompany(companyData: any): Observable<any> {
    return this.http.post("companies", companyData).pipe(
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
