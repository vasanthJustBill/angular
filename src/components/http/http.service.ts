// http.service.ts

import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private baseUrl = "http://localhost:8888/api/v1";
  private defaultHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  constructor(private http: HttpClient) {}

  private getRequestOptions(params?: HttpParams): any {
    return {
      headers: this.defaultHeaders,
      params: params || new HttpParams(),
    };
  }

  get<T>(url: string, params?: HttpParams): Observable<HttpEvent<T>> {
    const options = this.getRequestOptions(params);
    return this.http.get<T>(`${this.baseUrl}/${url}`, options);
  }

  post<T>(url: string, data: any): Observable<HttpEvent<T>> {
    const options = this.getRequestOptions();
    return this.http.post<T>(`${this.baseUrl}/${url}`, data, options);
  }

  patch<T>(url: string, data: any): Observable<HttpEvent<T>> {
    const options = this.getRequestOptions();
    return this.http.patch<T>(`${this.baseUrl}/${url}`, data, options);
  }

  delete<T>(url: string): Observable<HttpEvent<T>> {
    const options = this.getRequestOptions();
    return this.http.delete<T>(`${this.baseUrl}/${url}`, options);
  }
}
