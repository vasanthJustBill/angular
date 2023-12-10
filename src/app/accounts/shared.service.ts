import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  selectedParty = new BehaviorSubject<any>(null);

  getSelectedParty() {
    return this.selectedParty.asObservable();
  }

  setSelectedParty(party: any) {
    this.selectedParty.next(party);
  }
}
