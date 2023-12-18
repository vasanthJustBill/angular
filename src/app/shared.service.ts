import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import * as _ from "lodash";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(private toastr: ToastrService) {}
  private _companyName: BehaviorSubject<string> = new BehaviorSubject<string>(
    ""
  );
  private _companyId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get companyName(): Observable<string> {
    return this._companyName.asObservable();
  }

  set companyName(companyName: string) {
    this._companyName.next(companyName);
  }

  get companyId(): Observable<number> {
    return this._companyId.asObservable();
  }

  set companyId(companyId: number) {
    this._companyId.next(companyId);
  }

  get loader(): Observable<boolean> {
    return this._loader.asObservable();
  }

  set loader(loader: boolean) {
    this._loader.next(loader);
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

  getRawValuesWithNull(rawValues: object): object {
    return _.mapValues(rawValues, (value) => {
      return _.isString(value) && _.isEmpty(value) ? null : value;
    });
  }

  validateContact(control: AbstractControl): { [key: string]: any } | null {
    const isValid = /^\d{10}$/.test(control.value);
    return isValid ? null : { invalidContact: { value: control.value } };
  }
}
