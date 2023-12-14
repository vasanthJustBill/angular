import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpService } from "../../components/http/http.service"

@Injectable({
  providedIn: "root",
})
export class PartiesService {
  constructor(private http: HttpService) {}

  getAllParties(): Observable<any> {
    return this.http.get("parties").pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  createParty(partyData: any): Observable<any> {
    return this.http.post("parties", partyData).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  getPartyById(partyId: number): Observable<any> {
    const url = `parties/${partyId}`;

    return this.http.get(url).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  updateParty(partyId: number, partyData: any): Observable<any> {
    const url = `parties/${partyId}`;

    return this.http.patch(url, partyData).pipe(
      map((response) => response),
      catchError((error) => this.handleError(error))
    );
  }

  // Example function to delete a party
  deleteParty(partyId: number): Observable<any> {
    const url = `parties/${partyId}`;

    return this.http.delete(url).pipe(
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
